import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, ClipboardList, Users, BarChart3, Timer, Share2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "CricScore — Cricket Scoreboard App",
  description:
    "CricScore lets you track every run, wicket, and over in real time. The simplest way to keep score at your local cricket match.",
};

const features = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Live Scorekeeping",
    description:
      "Track runs, wickets, wides, no-balls, and extras ball by ball. Your digital scorebook for every match.",
  },
  {
    number: "02",
    icon: Timer,
    title: "Over-by-Over Tracking",
    description:
      "See exactly how each over went. Complete history of every delivery so nothing gets missed.",
  },
  {
    number: "03",
    icon: Users,
    title: "Player Stats",
    description:
      "Batting and bowling scorecards built automatically as you score. Runs, averages, wickets — all calculated for you.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Match Summary",
    description:
      "Full scorecard at the end of every match. Review, share, and revisit any game you've scored.",
  },
  {
    number: "05",
    icon: Share2,
    title: "Share Scorecards",
    description:
      "Send the scorecard to your teammates instantly. Everyone sees how the match went.",
  },
  {
    number: "06",
    icon: Smartphone,
    title: "Works Offline",
    description:
      "No internet at the ground? No problem. Score your match offline and sync when you're back.",
  },
];

export default function CricScorePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar initials="KS" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A7EA4]/[0.12] via-[#0A7EA4]/[0.04] to-transparent pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#0A7EA4]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#0A7EA4]/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 pt-20 pb-24 text-center">
          {/* App icon + badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#0A7EA4]/15 border border-[#0A7EA4]/30 flex items-center justify-center text-3xl shadow-lg">
              🏏
            </div>
          </div>

          <Badge
            variant="outline"
            className="text-xs border-amber-500/50 text-amber-400 bg-amber-500/10 mb-6 px-3 py-1"
          >
            Now in Beta
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Your cricket match.
            <br />
            <span className="text-[#0A7EA4]">Scored perfectly.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Stop arguing over the score. CricScore is the fastest way to keep an accurate
            scoreboard for your local cricket match — ball by ball, over by over.
          </p>

          {/* Download CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-3 bg-[#0A7EA4] hover:bg-[#0A7EA4]/90 text-white border-0 h-14 px-8 text-base font-semibold rounded-xl"
              disabled
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-3 h-14 px-8 text-base font-semibold rounded-xl border-2"
              disabled
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.2l.11-.04 11.24-11.23-2.7-2.7L3.18 23.76zM20.47 10.7L17.6 9.08l-3.02 3.02 3.03 3.02 2.87-1.62c.82-.46.82-1.74-.01-2.2v.4zM2.4.24L13.82 11.7l-2.7 2.7L2.52 5.18C2.2 4.56 2 3.84 2 3.1c0-.98.15-1.9.4-2.86zM4.18 0c.35-.04.7.03.99.2l11.55 6.49-2.71 2.7L4.28.2 4.18 0z" />
              </svg>
              Get it on Google Play
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            iOS &amp; Android — coming soon. Beta available on request.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-border/40 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16 text-center">
            {[
              { value: "Beta", label: "Current stage" },
              { value: "iOS + Android", label: "Platforms" },
              { value: "Free", label: "Always free" },
              { value: "Offline", label: "Works without internet" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-[#0A7EA4]">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0A7EA4] mb-3">
              Features
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Everything you need
              <br />
              to score a match
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Built for local cricket clubs, backyard matches, and tournament organisers. Simple
              enough to use mid-game, powerful enough to capture every detail.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border/50 bg-card p-7 hover:border-[#0A7EA4]/40 hover:shadow-lg hover:shadow-[#0A7EA4]/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#0A7EA4]/10 border border-[#0A7EA4]/20 flex items-center justify-center group-hover:bg-[#0A7EA4]/15 transition-colors">
                      <Icon className="w-5 h-5 text-[#0A7EA4]" />
                    </div>
                    <span className="text-3xl font-black text-border/60 group-hover:text-[#0A7EA4]/20 transition-colors">
                      {feature.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border/40 bg-[#0A7EA4]/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A7EA4]/[0.08] via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-24 text-center">
          <div className="text-4xl mb-6">🏏</div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Ready to score your next match?
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-10">
            CricScore is coming soon to the App Store and Google Play. Be the first to know when it
            launches.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-3 bg-[#0A7EA4] hover:bg-[#0A7EA4]/90 text-white border-0 h-14 px-8 text-base font-semibold rounded-xl"
              disabled
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store — Coming Soon
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-3 h-14 px-8 text-base font-semibold rounded-xl border-2"
              disabled
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.2l.11-.04 11.24-11.23-2.7-2.7L3.18 23.76zM20.47 10.7L17.6 9.08l-3.02 3.02 3.03 3.02 2.87-1.62c.82-.46.82-1.74-.01-2.2v.4zM2.4.24L13.82 11.7l-2.7 2.7L2.52 5.18C2.2 4.56 2 3.84 2 3.1c0-.98.15-1.9.4-2.86zM4.18 0c.35-.04.7.03.99.2l11.55 6.49-2.71 2.7L4.28.2 4.18 0z" />
              </svg>
              Google Play — Coming Soon
            </Button>
          </div>
        </div>
      </section>

      {/* Legal */}
      <div className="border-t border-border/40 bg-muted/20 py-6">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="/products/cricscore/privacy-policy/" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <span className="text-border">·</span>
          <a href="/products/cricscore/terms/" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
        </div>
      </div>

      <Footer profile={null} />
    </div>
  );
}
