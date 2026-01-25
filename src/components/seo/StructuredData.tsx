export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chris St Jean",
    jobTitle: "Freelance Full-Stack Developer",
    description:
      "AI-powered full-stack developer specializing in outdoor and fitness technology",
    url: "https://csj.dev",
    sameAs: [
      "https://github.com/christopherstj",
      "https://www.linkedin.com/in/christopherrstjean/",
      "https://www.strava.com/athletes/22686051",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "Python",
      "AI Development",
      "Strava API",
      "GPS Tracking",
      "Geospatial Applications",
      "Fitness App Development",
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
    name: "Chris St Jean - Freelance Development",
    description:
      "Freelance full-stack development specializing in AI-powered apps, fitness technology, and outdoor tech",
    url: "https://csj.dev",
    serviceType: [
      "Full-Stack Development",
      "Mobile App Development",
      "AI Integration",
      "Fitness App Development",
      "Outdoor Tech Development",
      "Strava API Integration",
      "GPS Tracking Systems",
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
    name: "Chris St Jean | AI-Powered Full-Stack Developer",
    url: "https://csj.dev",
    description:
      "Portfolio of Chris St Jean - freelance full-stack developer specializing in AI-powered development, fitness apps, and outdoor tech.",
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

