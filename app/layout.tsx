import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Ishan Wadhwani — Portfolio",
  description: "Full-stack engineer",
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
