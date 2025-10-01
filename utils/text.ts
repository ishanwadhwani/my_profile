type Project = {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  demo?: string;
  repo?: string;
  screenshots?: string[];
  snippet?: string;
  wip?: boolean;
};

const Project: Project[] = [
  {
    id: "depense",
    title: "Depense",
    desc: "Expense & group management app.",
    tech: ["Next.js", "TypeScript"],
    demo: "#",
    repo: "#",
    screenshots: ["/screens/placeholder.png", "/screens/placeholder.png"],
    snippet: `total(spends) => spends.reduce((s,x)=>s+x.amount,0)`,
    wip: true,
  },
  {
    id: "invoice-gen",
    title: "Invoice Generator",
    desc: "Live preview + PDF export.",
    tech: ["React", "Canvas"],
    demo: "https://invoice-generator-ishanwadhwanis-projects.vercel.app/",
    repo: "#",
    screenshots: ["/screens/placeholder.png", "/screens/placeholder.png"],
    snippet: `print(invoice)`,
    wip: false,
  },
  {
    id: "pulsecheck",
    title: "Pulsecheck",
    desc: "Monitor the uptime of your websites and APIs.",
    tech: ["Next.js", "Express", "PostgreSql"],
    demo: "#",
    repo: "https://github.com/ishanwadhwani/pulsecheck",
    screenshots: ["/screens/placeholder.png", "/screens/placeholder.png"],
    snippet: `fetch(url).then(r=>r.status)`,
    wip: false,
  },
  {
    id: "mmm",
    title: "Music In My Mind",
    desc: "Musical instruments on rental.",
    tech: ["React Native", "Expo"],
    demo: "#",
    repo: "https://github.com/ishanwadhwani/MusicinMyMind-MMM-",
    screenshots: ["/screens/placeholder.png", "/screens/placeholder.png"],
    snippet: `fetch('/instruments')`,
    wip: false,
  },
  {
    id: "digiindia",
    title: "DigiIndia Loans",
    desc: "Performance-focused marketing site (case study).",
    tech: ["Next.js", "SEO"],
    demo: "https://digiindialoan.com/",
    repo: undefined,
    screenshots: ["/screens/placeholder.png", "/screens/placeholder.png"],
    snippet: `getStaticProps() -> SEO-ready`,
    wip: false,
  },
  {
    id: "shatam",
    title: "Shatam Jeeva",
    desc: "Interactive SPA UI revamp.",
    tech: ["Next.js", "Animations"],
    demo: "https://www.shatamjeeva.life",
    repo: undefined,
    screenshots: ["/screens/placeholder.png", "/screens/placeholder.png"],
    snippet: `motion.div({ animate: { y: 0 } })`,
    wip: false,
  },
  {
    id: "sentimental_analysis",
    title: "Sentimental Analysis",
    desc: "Analyze the sentiment of text data.",
    tech: ["ML", "Jupyter Notebook"],
    demo: "#",
    repo: "https://github.com/ishanwadhwani/Sentimental_Analysis",
    screenshots: ["/screens/placeholder.png", "/screens/placeholder.png"],
    snippet: `model.predict(text)`,
    wip: false,
  },
  {
    id: "movie_recommender",
    title: "Movie Recommender",
    desc: "Suggest movies based on user preferences.",
    tech: ["ML", "Jupyter Notebook"],
    demo: "#",
    repo: "https://github.com/ishanwadhwani/Movie-Recommendation-System",
    screenshots: ["/screens/placeholder.png", "/screens/placeholder.png"],
    snippet: `recommend(user)`,
    wip: false,
  },
];

export default Project;
