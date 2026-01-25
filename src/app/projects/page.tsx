import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { StrikingBackground } from "@/components/effects";
import { PageHero } from "@/components/layout";
import { PathQuestIframe, ProjectCard } from "@/components/projects";
import { FadeInOnScroll } from "@/components/animations";

export const metadata: Metadata = {
  title: "Portfolio | Fitness Apps, Outdoor Tech & AI Projects",
  description:
    "Full-stack projects: PathQuest (peak bagging app with Strava integration), AI-powered data tools, and high-performance web apps. See what I can build for you.",
  alternates: {
    canonical: "https://csj.dev/projects",
  },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <StrikingBackground />
      
      <PageHero
        label="Projects"
        title={<>Things I&apos;ve<br /><span className="text-accent">built</span><span className="text-foreground/20">.</span></>}
      />

      {/* Featured Project - PathQuest with iframe */}
      <PathQuestIframe project={projects.featured} />

      {/* Other Projects / Work Experience */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll className="mb-12">
            <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
              Experience
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4">
              Other work<span className="text-accent">.</span>
            </h2>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.other.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Have a project in mind<span className="text-accent">?</span>
            </h2>
            <p className="text-foreground/40 mb-8 max-w-xl mx-auto">
              I&apos;m always excited to work on new challenges. Let&apos;s discuss how I can help.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none px-8"
            >
              <a href="/contact">Start a Conversation</a>
            </Button>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
