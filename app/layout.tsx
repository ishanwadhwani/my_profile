import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://ishanwadhwani.vercel.app"),
  title: {
    default:
      "Ishan Wadhwani - Freelancer/Working professional/Developer",
    template: "%s | Ishan Wadhwani",
  },
  description:
    "Ishan builds production ready web apps and data pipelines — readable, performant, and user-friendly.",
  keywords: [
    "full stack developer",
    "freelancer",
    "developer",
    "fullstack developer",
    "nextjs developere",
    "frontend developer",
    "backend developer",
    "website maker",
    "data engineer",
    "ai developer",
    "ishan wadhwani",
    "ishan",
    "wadhwani",
    "working professional",
    "android apps",
    "websites",
    "wordpress developer",
    "ishanwadhwani",
    "developer india",
    "freelancing",
    "experience developer",
    "python developer"
  ],
  authors: [{ name: "Ishan wadhwani", url: "https://ishanwadhwani.vercel.app" }],
  creator: "Ishan wadhwani",
  publisher: "Ishan wadhwani",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ishanwadhwani.vercel.app",
    title:
      "Ishan Wadhwani - Freelancer/Working professional/Developer",
    description:
      "Ishan builds production ready web apps and data pipelines — readable, performant, and user-friendly.",
    siteName: "Ishan Wadhwani",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg text-muted overflow-hidden">
        <Navbar />
        {/* <div className="scroll-progress hidden md:block fixed right-4 top-4 h-[calc(100vh-32px)]">
          <i />
        </div>
        <ScrollProgress /> */}
        <main className="main-scroll">
          <section id="top" className="h-[1px] w-full" aria-hidden />
          {children}
        </main>
      </body>
    </html>
  );
}
