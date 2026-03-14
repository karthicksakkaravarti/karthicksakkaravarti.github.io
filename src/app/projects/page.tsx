"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile, getProjects, Profile, Project } from "@/lib/supabase";
import { ExternalLink, Github } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ProjectsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [p, proj] = await Promise.all([getProfile(), getProjects()]);
        setProfile(p);
        setProjects(proj);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar initials={profile?.initials || "KS"} />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 pt-16 pb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Projects</h2>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Things I&apos;ve built</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of projects I&apos;ve worked on — from side projects to production applications.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="flex-1">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-xl border border-border/50 p-6 space-y-4">
                  <div className="h-5 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-4/5" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 w-14 bg-muted rounded-full" />
                    <div className="h-6 w-14 bg-muted rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="relative">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {(project.url || project.github_url) && (
                      <div className="flex gap-2">
                        {project.url && (
                          <Button size="sm" asChild className="gap-1.5 h-8 text-xs">
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" /> Live Demo
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button size="sm" variant="outline" asChild className="gap-1.5 h-8 text-xs">
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3" /> Code
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects to display yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer profile={profile} />
    </div>
  );
}
