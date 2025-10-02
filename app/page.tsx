// app/page.tsx
import About from "@/components/About";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import SectionDivider from "@/components/SectionDivider";
import Experience from "@/components/Experience";
import Projects from "@/components/Project";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileDivider from "@/components/MobileDivider";

const DIVIDER_COMMANDS: Record<string, string[]> = {
  hero_about: [
    "ls -la src/components",
    "cat README.md | head -n 3",
    'echo "→ About — who I am"',
  ],
  about_skills: [
    "git status --porcelain",
    'git add . && git commit -m "ship about copy"',
    'echo "→ Skills — check the toolbox"',
  ],
  skills_experience: [
    "cd ../experience",
    "node migrate.js",
    'echo "→ Experience — timeline below"',
  ],
  experience_projects: [
    "cd ..\\experience; dir",
    "git checkout projects; pnpm build --silent",
    "node .\\scripts\\generate-thumbnails.js",
    'Write-Output "→ Projects — demos & code samples"',
  ],
  projects_contact: [
    "pnpm build --silent",
    "pnpm start",
    'echo "→ Projects & Contact — let\'s connect"',
  ],
};

export default function Page() {
  return (
    <>
      <section className="section">
        <Hero />
      </section>
      <SectionDivider
        commands={DIVIDER_COMMANDS.hero_about}
        shell="bash"
        interval={2800}
        className="hidden md:block"
      />
      <MobileDivider caption={`'echo "→ About — who I am"'`} />
      <About />
      <SectionDivider
        commands={DIVIDER_COMMANDS.about_skills}
        shell="bash"
        interval={2800}
        className="hidden md:block"
      />
      <MobileDivider caption={`'echo "→ Skills — check the toolbox"'`} />
      <Skills />
      <SectionDivider
        commands={DIVIDER_COMMANDS.skills_experience}
        shell="bash"
        interval={2800}
        className="hidden md:block"
      />
      <MobileDivider caption={`'echo "→ Experience — timeline below"'`} />
      <Experience />
      <SectionDivider
        commands={DIVIDER_COMMANDS.experience_projects}
        shell="bash"
        interval={2800}
        className="hidden md:block"
      />
      <MobileDivider
        caption={`'Write-Output "→ Projects — demos & code samples"'`}
      />
      <Projects />
      <SectionDivider
        commands={DIVIDER_COMMANDS.projects_contact}
        shell="bash"
        interval={2800}
        className="hidden md:block"
      />
      <MobileDivider
        caption={`'echo "→ Projects & Contact — let's connect"'`}
      />
      <Contact />
      <Footer />
    </>
  );
}
