import type { Metadata } from "next";
import { getSiteConfig, getProjects, getRunning } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { HomeHero, FeaturedWork, WhatIDo, RunningHighlights, CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Freelance Full-Stack Developer | AI & Outdoor Tech",
  description:
    "Freelance developer shipping full-stack web and mobile apps at startup speed. Specializing in AI-powered development, fitness apps, and outdoor tech. React, Next.js, React Native.",
  alternates: {
    canonical: "https://csj.dev",
  },
};

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
