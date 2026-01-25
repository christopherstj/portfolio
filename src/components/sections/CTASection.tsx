"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations";

interface CTASectionProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function CTASection({ title, description, buttonText, buttonHref }: CTASectionProps) {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInOnScroll>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            {title}
          </h2>
          <p className="text-lg text-foreground/40 mb-10 max-w-2xl mx-auto">
            {description}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none px-12 py-6 text-lg"
          >
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

