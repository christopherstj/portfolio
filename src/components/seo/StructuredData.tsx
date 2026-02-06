export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chris St Jean",
    jobTitle: "Enterprise AI Engineer",
    description:
      "I build AI agents and workflows that power multi-million dollar business decisions. Custom MCP servers, intelligent data pipelines, and enterprise-grade AI systems.",
    url: "https://csj.dev",
    sameAs: [
      "https://github.com/christopherstj",
      "https://www.linkedin.com/in/christopherrstjean/",
      "https://www.strava.com/athletes/22686051",
    ],
    knowsAbout: [
      "AI Agents",
      "MCP Servers",
      "Claude API",
      "LLM Integration",
      "RAG Pipelines",
      "Workflow Orchestration",
      "Data Pipelines",
      "ETL Systems",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Node.js",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Barbara",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Chris St Jean - AI Engineering & Development",
    description:
      "Enterprise AI engineering specializing in custom AI agents, MCP servers, intelligent workflows, and data pipelines that drive business decisions",
    url: "https://csj.dev",
    serviceType: [
      "AI Agent Development",
      "MCP Server Development",
      "AI Workflow Automation",
      "Data Pipeline Engineering",
      "LLM Integration",
      "RAG System Development",
      "Full-Stack Development",
      "Technical Consulting",
    ],
    areaServed: "Worldwide",
    provider: {
      "@type": "Person",
      name: "Chris St Jean",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chris St Jean | AI Agents, MCP Servers & Enterprise Workflows",
    url: "https://csj.dev",
    description:
      "Portfolio of Chris St Jean - Enterprise AI engineer building custom AI agents, MCP servers, and intelligent workflows that power multi-million dollar business decisions.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

