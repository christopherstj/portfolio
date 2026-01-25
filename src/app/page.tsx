import { getSiteConfig, getProjects, getRunning } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { HomeHero, FeaturedWork, WhatIDo, RunningHighlights, CTASection } from "@/components/sections";

export default function HomePage() {
  const site = getSiteConfig();
  const projects = getProjects();
  const running = getRunning();

  return (
    <>
      <StrikingBackground />
      
      <HomeHero site={site} />
      
      <FeaturedWork project={projects.featured} />
      
      <WhatIDo />
      
      <RunningHighlights running={running} />
      
      <CTASection
        title={<>Let&apos;s build something<br /><span className="text-accent">together</span><span className="text-foreground">.</span></>}
        description="I'm currently available for freelance projects. Whether you need a full-stack application, AI integration, or technical guidance."
        buttonText="Start a Conversation"
        buttonHref="/contact"
      />
    </>
  );
}
