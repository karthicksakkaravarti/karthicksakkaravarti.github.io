import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Products — Karthick Sakkaravarthi",
  description: "Mobile apps and products built by Karthick Sakkaravarthi.",
};

const cricscoreTags = ["Expo", "React Native", "Firebase", "TypeScript", "iOS", "Android"];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar initials="KS" />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 pt-16 pb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Products</h2>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Things I&apos;ve shipped</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Mobile apps and tools I&apos;ve built and published for real users.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="flex-1">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* CricScore Card */}
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-12 h-12 rounded-xl mb-3 bg-[#0A7EA4]/10 border border-[#0A7EA4]/20 flex items-center justify-center text-2xl">
                  🏏
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    CricScore
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="text-xs shrink-0 border-amber-500/40 text-amber-400 bg-amber-500/[0.08]"
                  >
                    Beta
                  </Badge>
                </div>
                <CardDescription className="line-clamp-3">
                  A mobile app for cricket enthusiasts — phone OTP login, live scores, and match info.
                  Built with Expo &amp; React Native for iOS, Android, and Web.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cricscoreTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" asChild className="gap-1.5 h-8 text-xs bg-[#0A7EA4] hover:bg-[#0A7EA4]/90 text-white border-0">
                    <a href="/products/cricscore/">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild className="gap-1.5 h-8 text-xs">
                    <a href="/products/cricscore/privacy-policy/">Privacy Policy</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer profile={null} />
    </div>
  );
}
