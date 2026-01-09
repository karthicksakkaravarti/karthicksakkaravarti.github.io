import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight">KS</span>
            <div className="flex items-center gap-6">
              <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</a>
              <a href="#projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Projects</a>
              <a href="#blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Blog</a>
              <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit">Available for work</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I&apos;m Karthick Sakkaravarthi
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Software Developer passionate about building products that make a difference.
            I write about technology, share my projects, and document my journey in tech.
          </p>
          <div className="flex gap-4 pt-2">
            <Button asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* About Section */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">About Me</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Welcome to my corner of the internet! I&apos;m a software developer with a passion
            for creating elegant solutions to complex problems. When I&apos;m not coding,
            you can find me exploring new technologies, writing about my experiences,
            or working on side projects.
          </p>
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Projects Section */}
      <section id="projects" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="transition-all hover:shadow-md hover:border-foreground/20">
            <CardHeader>
              <CardTitle className="text-lg">Project One</CardTitle>
              <CardDescription>A brief description of this amazing project and what it does.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Node.js</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md hover:border-foreground/20">
            <CardHeader>
              <CardTitle className="text-lg">Project Two</CardTitle>
              <CardDescription>Another cool project with interesting features.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">Tailwind</Badge>
                <Badge variant="outline">Prisma</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Blog Section */}
      <section id="blog" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Latest Posts</h2>
        <div className="flex flex-col gap-6">
          <Card className="transition-all hover:shadow-md hover:border-foreground/20">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>January 9, 2026</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
              <CardTitle className="text-lg">Getting Started with Next.js</CardTitle>
              <CardDescription>A comprehensive guide to building modern web applications with Next.js.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all hover:shadow-md hover:border-foreground/20">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>January 5, 2026</span>
                <span>•</span>
                <span>3 min read</span>
              </div>
              <CardTitle className="text-lg">My Developer Journey</CardTitle>
              <CardDescription>Reflecting on my path as a software developer and lessons learned along the way.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Get in Touch</h2>
        <p className="text-muted-foreground mb-8 max-w-xl">
          Have a question or want to work together? Feel free to reach out through any of these platforms.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" asChild>
            <a href="https://github.com/karthicksakkaravarti" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://linkedin.com/in/karthicksakkaravarti" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:hello@sakkaravarthi.com">
              Email
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Karthick Sakkaravarthi. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with Next.js & shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
