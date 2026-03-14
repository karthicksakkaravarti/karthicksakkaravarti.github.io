"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile, getBlogPosts, getProjects, Profile, Project, BlogPost } from "@/lib/supabase";
import { ArrowRight, Calendar, Clock, Github, Linkedin, Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import XIcon from "@/components/x-icon";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const defaultProfile: Profile = {
  id: "",
  name: "Karthick Sakkaravarthi",
  initials: "KS",
  tagline: "Software Developer passionate about building products that make a difference.",
  about_text: "Welcome to my corner of the internet!",
  is_available_for_work: true,
  github_url: "https://github.com/karthicksakkaravarti",
  linkedin_url: "https://linkedin.com/in/karthicksakkaravarthi",
  email: "karthicksakkaravarthi@gmail.com",
  created_at: "",
  updated_at: "",
};

export default function Home() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [p, proj, posts] = await Promise.all([getProfile(), getProjects(), getBlogPosts()]);
        if (p) setProfile(p);
        setProjects(proj);
        setBlogPosts(posts);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const featuredProjects = projects.slice(0, 4);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar initials={profile.initials} />

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/[0.07] to-purple-500/[0.07] blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-500/[0.05] to-cyan-500/[0.05] blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-8">
              {profile.is_available_for_work && (
                <div className="mb-8">
                  <Badge variant="outline" className="gap-2 px-4 py-1.5 text-xs border-green-500/30 text-green-400 bg-green-500/[0.08]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    Open to opportunities
                  </Badge>
                </div>
              )}

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-6">
                <span className="block text-foreground">{profile.name.split(' ')[0]}</span>
                <span className="block bg-gradient-to-r from-foreground/90 via-foreground/50 to-foreground/30 bg-clip-text text-transparent">
                  {profile.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10">
                {profile.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" asChild className="h-12 px-7 rounded-full gap-2 text-sm font-medium">
                  <a href="/projects/">
                    View my work
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 px-7 rounded-full gap-2 text-sm font-medium">
                  <a href="/blog/">
                    Read blog
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Social + Quick Info */}
            <div className="lg:col-span-4 flex lg:flex-col items-start lg:items-end gap-4">
              <div className="flex lg:flex-col gap-3">
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-foreground/20 hover:bg-card transition-all"
                  >
                    <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden lg:inline">GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50 hidden lg:inline" />
                  </a>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-foreground/20 hover:bg-card transition-all"
                  >
                    <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden lg:inline">LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50 hidden lg:inline" />
                  </a>
                )}
                <a
                  href="https://x.com/karthicksakkara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-foreground/20 hover:bg-card transition-all"
                >
                  <XIcon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden lg:inline">X / Twitter</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50 hidden lg:inline" />
                </a>
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-foreground/20 hover:bg-card transition-all"
                  >
                    <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden lg:inline">Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50 hidden lg:inline" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section className="relative border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 block">// about</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Building software that
                <span className="text-muted-foreground"> solves real problems</span>
              </h2>
            </div>
            <div>
              <p className="text-lg text-muted-foreground leading-[1.8]">
                {profile.about_text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PROJECTS ===================== */}
      {!isLoading && featuredProjects.length > 0 && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 block">// projects</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Featured work</h2>
              </div>
              <a href="/projects/" className="group hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                All projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative rounded-2xl border border-border/50 bg-card/30 p-6 sm:p-8 hover:border-foreground/15 hover:bg-card/60 transition-all duration-300 ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 shrink-0 ml-4">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild className="gap-1 rounded-full">
                <a href="/projects/">
                  All projects <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ===================== LATEST POSTS ===================== */}
      {!isLoading && latestPosts.length > 0 && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 block">// blog</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Latest writing</h2>
              </div>
              <a href="/blog/" className="group hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                All posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="space-y-1">
              {latestPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}/`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5 px-4 -mx-4 rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0 sm:w-48">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {post.published_at ? formatDate(post.published_at) : "Draft"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {post.read_time} min
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-base group-hover:text-primary transition-colors truncate">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">{post.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
                </a>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild className="gap-1 rounded-full">
                <a href="/blog/">
                  All posts <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ===================== CONTACT CTA ===================== */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-32">
          <div className="relative rounded-3xl border border-border/50 bg-card/30 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-primary/[0.06] to-transparent blur-2xl pointer-events-none" />

            <div className="relative px-8 sm:px-16 py-16 sm:py-20 text-center">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 block">// contact</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Let&apos;s build something
                <span className="text-muted-foreground"> together</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
                Got a project in mind? I&apos;d love to hear about it.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {profile.email && (
                  <Button size="lg" asChild className="h-12 px-8 rounded-full gap-2">
                    <a href={`mailto:${profile.email}`}>
                      <Mail className="w-4 h-4" />
                      Send an email
                    </a>
                  </Button>
                )}
                {profile.linkedin_url && (
                  <Button size="lg" variant="outline" asChild className="h-12 px-8 rounded-full gap-2">
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                <Button size="lg" variant="outline" asChild className="h-12 px-8 rounded-full gap-2">
                  <a href="https://x.com/karthicksakkara" target="_blank" rel="noopener noreferrer">
                    <XIcon className="w-4 h-4" />
                    X
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer profile={profile} />
    </div>
  );
}
