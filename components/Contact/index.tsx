"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMail } from "react-icons/io5";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Hello from portfolio");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(
    null
  );

  // honeypot
  const [hp, setHp] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({
        ok: false,
        msg: "Bad Request — please provide name, email, and a message.",
      });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ ok: false, msg: "Please provide a valid email." });
      return;
    }
    if (hp.trim()) {
      setStatus({ ok: false, msg: "Spam detected." });
      return;
    }

    setSending(true);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("subject", subject);
      fd.append("message", message);

      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: fd,
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = { ok: false, message: "Invalid response" };
      }

      if (res.ok && data.ok) {
        setStatus({ ok: true, msg: "Thanks — message received!" });
        setName("");
        setEmail("");
        setSubject("Hello from portfolio");
        setMessage("");
      } else {
        setStatus({ ok: false, msg: data.message || "Submission failed." });
      }
    } catch (err: any) {
      setStatus({ ok: false, msg: "Network error — please try again." });
    } finally {
      setSending(false);
    }
  }

  const mailto = `mailto:iwadhwani029@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  )}`;

  return (
    <section id="contact" className="section">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface section-surface rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-text mb-2">
              Contact
            </h2>
            <p className="text-muted text-sm mb-4">
              Drop a note — I read real messages.
            </p>

            <form onSubmit={onSubmit} className="space-y-3" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col">
                  <span className="text-xs text-muted mb-1">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.02)] text-text"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-xs text-muted mb-1">Email</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.02)] text-text"
                  />
                </label>
              </div>

              <label className="flex flex-col">
                <span className="text-xs text-muted mb-1">Subject</span>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.02)] text-text"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-muted mb-1">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.02)] text-text"
                />
              </label>

              <label className="sr-only" aria-hidden>
                Leave this empty
                <input
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  name="hp_field"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className={
                    sending
                      ? "px-4 py-2 rounded-md bg-[rgba(255,255,255,0.03)] text-muted"
                      : "text-muted text-sm shadow-lg px-4 py-2 rounded-lg bg-[var(--color-primary)] text-on-primary font-medium hover:bg-[var(--color-primary)]/80 duration-500 ease-in-out"
                  }
                >
                  {sending ? "Sending…" : "Send message"}
                </button>

                <Link
                  href={mailto}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm shadow-lg border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 duration-500 ease-in-out"
                >
                  <IoMail /> <span className="mb-0.5">Email</span>
                </Link>
              </div>

              {status && (
                <div
                  className={`mt-2 text-sm ${
                    status.ok ? "text-[var(--color-primary)]" : "text-[var(--color-accent)]/90"
                  }`}
                >
                  {status.msg}
                </div>
              )}
            </form>
          </div>

          <div className="bg-bg/6 section-surface rounded-xl p-6 md:p-8 font-mono text-sm text-text">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <div className="text-xs text-muted">Contact quick commands</div>
                <div className="mt-2 text-text font-medium">
                  PS C:\Ishan_Portfolio &gt; Hello World
                </div>
              </div>

              <div className="text-xs text-muted">fast shortcuts</div>
            </div>

            <div className="space-y-2">
              <div className="px-3 py-2 rounded bg-[rgba(255,255,255,0.02)]">
                <code className="block">
                  open github: github.com/ishanwadhwani
                </code>
                <Link
                  className="text-xs text-primary font-mono underline mt-1 inline-block"
                  href="https://github.com/ishanwadhwani"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open GitHub
                </Link>
              </div>

              <div className="px-3 py-2 rounded bg-[rgba(255,255,255,0.02)]">
                <code className="block">
                  open linkedin: linkedin.com/in/ishan-wadhwani
                </code>
                <Link
                  className="text-xs text-primary font-mono underline mt-1 inline-block"
                  href="https://linkedin.com/in/ishan-wadhwani"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open LinkedIn
                </Link>
              </div>

              <div className="px-3 py-2 rounded bg-[rgba(255,255,255,0.02)]">
                <code className="block">
                  open blog: https://medium.com/@ishanwadhwani
                </code>
                <Link
                  className="text-xs text-primary font-mono underline mt-1 inline-block"
                  href="https://medium.com/@ishanwadhwani"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Medium
                </Link>
              </div>
            </div>

            <div className="mt-6 text-xs text-muted">
              Tip: hover terminal dividers to pause auto-rotate.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
