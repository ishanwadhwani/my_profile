export default function Footer() {
  return (
    <footer className="bg-bg/5 text-muted py-6 mb-8">
      <div className="content-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-muted">
          © {new Date().getFullYear()} Ishan Wadhwani — built with Next.js &
          Tailwind
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/IshanWadhwani_Resume.pdf"
            className="text-xs text-muted underline"
          >
            Resume
          </a>
          <a
            href="https://github.com/ishanwadhwani"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
