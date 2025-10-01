// app/api/contact/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Simple in-memory rate limiter (per IP) — resets when server restarts (suitable for small portfolios)
const LIMIT = 6; // requests
const WINDOW_MS = 1000 * 60 * 15; // 15 minutes
const store = new Map<string, { count: number; first: number }>();

type Payload = { name?: string; email?: string; subject?: string; message?: string; hp?: string };

function ipFromReq(req: NextRequest) {
  // Next dev server will be localhost; in production on Vercel you can use x-forwarded-for header
  const forwarded = req.headers.get('x-forwarded-for') || '';
  if (forwarded) return forwarded.split(',')[0].trim();
  try {
    // req.ip is not available on NextRequest; use connection info if possible, else fallback
    // In Vercel/Next.js, use x-forwarded-for header, else fallback to 'unknown'
    return req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  } catch {
    return 'unknown';
  }
}

async function sendViaSendGrid({ fromEmail, subject, text }: { fromEmail: string; subject: string; text: string }) {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) throw new Error('SENDGRID_API_KEY not set');
  const body = {
    personalizations: [{ to: [{ email: process.env.CONTACT_TO || 'iwadhwani029@gmail.com' }] }],
    from: { email: fromEmail || process.env.CONTACT_FROM || 'no-reply@example.com' },
    subject,
    content: [{ type: 'text/plain', value: text }]
  };
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SendGrid error: ${res.status} ${err}`);
  }
  return true;
}

async function sendViaSMTP({ fromEmail, subject, text }: { fromEmail: string; subject: string; text: string }) {
  // Lazy require nodemailer to avoid adding if not needed
  const nodemailer = (await import('nodemailer')).default;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) throw new Error('SMTP credentials not set');

  const transporter = nodemailer.createTransport({
    host, port, secure: port === 465, auth: { user, pass }
  });

  await transporter.sendMail({
    from: fromEmail || process.env.CONTACT_FROM || user,
    to: process.env.CONTACT_TO || 'iwadhwani029@gmail.com',
    subject,
    text
  });
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = ipFromReq(req);
    // rate limiting
    const now = Date.now();
    const entry = store.get(ip);
    if (!entry) {
      store.set(ip, { count: 1, first: now });
    } else {
      if (now - entry.first > WINDOW_MS) {
        store.set(ip, { count: 1, first: now });
      } else {
        if (entry.count >= LIMIT) {
          return NextResponse.json({ message: 'Too many requests — try again later.' }, { status: 429 });
        }
        entry.count += 1;
        store.set(ip, entry);
      }
    }

    const body = await req.json() as Payload;

    // honeypot
    if (body.hp && body.hp.trim()) {
      return NextResponse.json({ message: 'Spam detected.' }, { status: 400 });
    }

    // basic validation
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const subject = (body.subject || '').trim() || 'Portfolio message';
    const message = (body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Name, email and message are required.' }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const text = `Contact form submission\n\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nIP: ${ip}\nTime: ${new Date().toISOString()}`;

    // Try SendGrid first if configured; else nodemailer SMTP; else fallback to 501
    if (process.env.SENDGRID_API_KEY) {
      await sendViaSendGrid({ fromEmail: email, subject: `[Portfolio] ${subject}`, text });
      return NextResponse.json({ message: 'Message sent (via SendGrid) — thank you!' }, { status: 200 });
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendViaSMTP({ fromEmail: email, subject: `[Portfolio] ${subject}`, text });
      return NextResponse.json({ message: 'Message sent (via SMTP) — thank you!' }, { status: 200 });
    } else {
      // Provide a friendly message so the user running locally knows how to enable sending
      return NextResponse.json({
        message: 'No email backend configured. Please set SENDGRID_API_KEY or SMTP_* env vars. Using mailto fallback is recommended in the UI.'
      }, { status: 501 });
    }
  } catch (err: any) {
    console.error('contact error', err);
    return NextResponse.json({ message: `Server error: ${err?.message || 'unknown'}` }, { status: 500 });
  }
}
