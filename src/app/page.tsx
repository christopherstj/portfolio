import type { Metadata } from "next";
import { getSiteConfig, getProjects } from "@/lib/content";
import { HomeHero, FeaturedWork, WhatIDo, CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Enterprise AI Engineer | Chris St Jean",
  description:
    "I build AI agents and workflows that power multi-million dollar business decisions. Custom MCP servers, intelligent data pipelines, and enterprise-grade systems—shipped at startup speed.",
  alternates: {
    canonical: "https://csj.dev",
  },
};

export default function HomePage() {
  const site = getSiteConfig();
  const projects = getProjects();

  return (
    <>
      <HomeHero site={site} />
      
      <FeaturedWork projects={projects.featured} />
      
      <WhatIDo />
      
      <CTASection
        title={<>Let&apos;s build something<br /><span className="text-accent">together</span><span className="text-foreground">.</span></>}
        description="I'm currently available for projects. Whether you need AI agents, data pipelines, full-stack applications, or technical guidance."
        buttonText="Start a Conversation"
        buttonHref="/contact"
      />
    </>
  );
}
