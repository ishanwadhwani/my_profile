// app/head.tsx
export default function Head() {
  const domain = "https://your-domain.com"; // replace after deploy
  const title = "Ishan Wadhwani — Full-stack engineer";
  const desc =
    "I build fast, accessible web apps — Next.js, React & TypeScript.";
  const og = `${domain}/og-default.png`; // optional

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="canonical" href={domain} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ishan Wadhwani" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={domain} />
      <meta property="og:image" content={og} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={og} />

      {/* basic SEO & robots */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#071028" />
      <link rel="icon" href="/favicon.ico" />

      {/* JSON-LD structured data (Organization / Person) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ishan Wadhwani",
            url: domain,
            sameAs: [
              "https://github.com/ishanwadhwani",
              "https://linkedin.com/in/ishan-wadhwani",
            ],
            jobTitle: "Full-stack engineer",
            worksFor: { "@type": "Organization", name: "Independent" },
          }),
        }}
      />
    </>
  );
}
