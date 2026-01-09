"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProfile, getBlogPosts, getProjects, Profile, Project, BlogPost } from "@/lib/supabase";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Default fallback values
const defaultProfile: Profile = {
  id: '',
  name: 'Karthick Sakkaravarthi',
  initials: 'KS',
  tagline: 'Software Developer passionate about building products that make a difference.',
  about_text: 'Welcome to my corner of the internet!',
  is_available_for_work: true,
  github_url: 'https://github.com/karthicksakkaravarti',
  linkedin_url: 'https://linkedin.com/in/karthicksakkaravarthi',
  email: 'karthicksakkaravarthi@gmail.com',
  created_at: '',
  updated_at: ''
};

export default function Home() {
  const [profileData, setProfileData] = useState<Profile>(defaultProfile);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profile, projectsData, postsData] = await Promise.all([
          getProfile(),
          getProjects(),
          getBlogPosts()
        ]);

        if (profile) setProfileData(profile);
        setProjects(projectsData);
        setBlogPosts(postsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-lg font-semibold tracking-tight hover:text-primary transition-colors">{profileData.initials}</a>
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
          {profileData.is_available_for_work && (
            <Badge variant="secondary" className="w-fit">Available for work</Badge>
          )}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I&apos;m {profileData.name}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {profileData.tagline}
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
            {profileData.about_text}
          </p>
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Projects Section */}
      <section id="projects" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.length > 0 ? (
            projects.map((project: Project) => (
              <Card key={project.id} className="transition-all hover:shadow-md hover:border-foreground/20">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  {(project.url || project.github_url) && (
                    <div className="flex gap-3 mt-4">
                      {project.url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground col-span-2">No projects to display yet.</p>
          )}
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Blog Section */}
      <section id="blog" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Latest Posts</h2>
        <div className="flex flex-col gap-6">
          {blogPosts.length > 0 ? (
            blogPosts.map((post: BlogPost) => (
              <a key={post.id} href={`/blog/${post.slug}`} className="block group">
                <Card className="transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{post.published_at ? formatDate(post.published_at) : 'Draft'}</span>
                      <span>•</span>
                      <span>{post.read_time} min read</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                    <div className="pt-3">
                      <span className="text-sm text-primary font-medium group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              </a>
            ))
          ) : (
            <p className="text-muted-foreground">No blog posts yet.</p>
          )}
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
          {profileData.github_url && (
            <Button variant="outline" asChild>
              <a href={profileData.github_url} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
          {profileData.linkedin_url && (
            <Button variant="outline" asChild>
              <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          )}
          {profileData.email && (
            <Button variant="outline" asChild>
              <a href={`mailto:${profileData.email}`}>
                Email
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {profileData.name}. All rights reserved.
            </p>

          </div>
        </div>
      </footer>
    </div>
  );
}
