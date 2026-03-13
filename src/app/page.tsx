"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile, getBlogPosts, getProjects, Profile, Project, BlogPost } from "@/lib/supabase";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Calendar, Clock, Code2, Briefcase, BookOpen, Send } from "lucide-react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

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
  const [scrolled, setScrolled] = useState(false);

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

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-105">
                {profileData.initials}
              </div>
            </a>
            <div className="flex items-center gap-1">
              <a href="#about" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-muted/50">About</a>
              <a href="#projects" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-muted/50">Projects</a>
              <a href="#blog" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-muted/50">Blog</a>
              <a href="#contact" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-muted/50">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 pt-20 pb-28">
          <div className="flex flex-col gap-6 max-w-3xl">
            {profileData.is_available_for_work && (
              <Badge variant="secondary" className="w-fit gap-1.5 px-3 py-1 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for work
              </Badge>
            )}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text">
                {profileData.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {profileData.tagline}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button size="lg" asChild className="gap-2">
                <a href="#projects">
                  <Briefcase className="w-4 h-4" />
                  View Projects
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <a href="#contact">
                  <Send className="w-4 h-4" />
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 text-primary mb-3">
                <Code2 className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">About Me</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Building digital experiences
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {profileData.about_text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Projects</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-10">Things I&apos;ve built</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.map((project: Project) => (
                <Card key={project.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="relative">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs font-normal">{tag}</Badge>
                      ))}
                    </div>
                    {(project.url || project.github_url) && (
                      <div className="flex gap-2">
                        {project.url && (
                          <Button size="sm" variant="default" asChild className="gap-1.5 h-8 text-xs">
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button size="sm" variant="outline" asChild className="gap-1.5 h-8 text-xs">
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground col-span-full">No projects to display yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24">
          <div className="flex items-center gap-2 text-primary mb-3">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Blog</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-10">Latest posts</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.length > 0 ? (
              blogPosts.map((post: BlogPost) => (
                <a key={post.id} href={`/blog/${post.slug}/`} className="block group">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
                    <CardHeader className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.published_at ? formatDate(post.published_at) : 'Draft'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.read_time} min
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{post.description}</CardDescription>
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </CardHeader>
                  </Card>
                </a>
              ))
            ) : (
              <p className="text-muted-foreground col-span-full">No blog posts yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-3">
              <Send className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Contact</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Let&apos;s work together</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Have a question or want to collaborate? Feel free to reach out through any of these platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {profileData.github_url && (
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <a href={profileData.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {profileData.linkedin_url && (
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
              )}
              {profileData.email && (
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <a href={`mailto:${profileData.email}`}>
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {profileData.initials}
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {profileData.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {profileData.github_url && (
                <a href={profileData.github_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profileData.linkedin_url && (
                <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profileData.email && (
                <a href={`mailto:${profileData.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
