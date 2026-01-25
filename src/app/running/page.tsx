import { getRunning } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { PageHero } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { RaceMap } from "@/components/maps";
import { StravaIcon } from "@/components/icons";
import { StatsCard, RaceCard } from "@/components/running";
import { FadeInOnScroll } from "@/components/animations";

export default function RunningPage() {
  const running = getRunning();

  return (
    <>
      <StrikingBackground />
      
      <PageHero
        label="Ultra Running"
        title={<>
          {running.headline.split('.')[0]}<span className="text-accent">.</span>
          <br />
          <span className="text-foreground/20">{running.headline.split('.').slice(1).join('.')}</span>
        </>}
        description={running.philosophy}
      />

      {/* Stats Grid */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {running.stats.map((stat, i) => (
              <StatsCard key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Routes with Maps */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll className="mb-12">
            <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
              Featured Routes
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4">
              The courses<span className="text-accent">.</span>
            </h2>
          </FadeInOnScroll>

          <div className="grid lg:grid-cols-3 gap-6">
            {running.featuredRoutes.map((route, i) => (
              <FadeInOnScroll key={route.id} delay={i * 0.1}>
                <div className="edge-card overflow-hidden group">
                  <RaceMap
                    routeUrl={route.routeUrl}
                    name={route.name}
                    className="h-64"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {route.name}
                      </h3>
                      <span className="tag">
                        {route.result}
                      </span>
                    </div>
                    {(route.distance || route.elevation) && (
                      <div className="flex gap-4 text-sm font-mono text-foreground/40">
                        {route.distance && <span>{route.distance}</span>}
                        {route.elevation && <span>{route.elevation}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Races */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll className="mb-12">
            <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
              Race Results
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4">
              Recent finishes<span className="text-accent">.</span>
            </h2>
          </FadeInOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {running.races.filter(r => r.featured).map((race, i) => (
              <RaceCard key={race.id} race={race} index={i} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* All Races */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
              All races<span className="text-accent">.</span>
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {running.races.map((race, i) => (
              <RaceCard key={race.id} race={race} index={i} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Strava CTA */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Follow the journey<span className="text-accent">.</span>
            </h2>
            <p className="text-foreground/40 mb-8 max-w-xl mx-auto">
              Track my training and adventures on Strava.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#FC4C02] text-white font-semibold hover:bg-[#FC4C02]/90 rounded-none px-8"
              >
                <a
                  href={running.links.strava}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <StravaIcon className="w-5 h-5" />
                  Follow on Strava
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary hover:border-border rounded-none px-8"
              >
                <a
                  href={running.links.ultrasignup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">🏃</span>
                  UltraSignup Results
                </a>
              </Button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
