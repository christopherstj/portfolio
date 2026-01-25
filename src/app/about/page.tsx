import type { Metadata } from "next";
import { getJourney, getSkills } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { PageHero } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { FadeInOnScroll } from "@/components/animations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Chris St Jean | Developer & Ultrarunner",
  description:
    "Full-stack developer and elite ultrarunner building the next generation of outdoor tech. 6+ years shipping software, 30,000+ miles run. Based in Santa Barbara, CA.",
  alternates: {
    canonical: "https://csj.dev/about",
  },
};

export default function AboutPage() {
  const journey = getJourney();
  const skills = getSkills();

  return (
    <>
      <StrikingBackground />
      
      <PageHero
        label="About"
        title={<>The<br /><span className="text-accent">journey</span><span className="text-foreground/20">.</span></>}
        description={journey.intro}
      />

      {/* Timeline with Van - Full page takeover */}
      <section className="relative border-t border-border">
        <JourneyTimeline timeline={journey.timeline} />
      </section>

      {/* Skills */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll className="mb-12">
            <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
              Skills
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4">
              What I work with<span className="text-accent">.</span>
            </h2>
          </FadeInOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.categories.map((category, i) => (
              <FadeInOnScroll key={category.name} delay={i * 0.1}>
                <div className="edge-card p-6 group">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* AI Approach */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="edge-card p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">
                    My Approach
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-6">
                    {skills.approach.title}<span className="text-accent">.</span>
                  </h2>
                  <p className="text-foreground/50 leading-relaxed">
                    {skills.approach.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {skills.tools.slice(0, 4).map((tool, i) => (
                    <FadeInOnScroll key={tool.name} delay={i * 0.1} scale={0.9}>
                      <div className="edge-card p-4 text-center">
                        <div className="font-[family-name:var(--font-display)] font-bold text-foreground">
                          {tool.name}
                        </div>
                        <div className="text-xs font-mono text-foreground/30">
                          {tool.category}
                        </div>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Want to work together<span className="text-accent">?</span>
            </h2>
            <p className="text-foreground/40 mb-8 max-w-xl mx-auto">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none px-8"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
