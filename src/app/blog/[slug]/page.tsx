"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getBlogPostBySlug, BlogPost, getProfile, Profile } from "@/lib/supabase";
import { ArrowLeft, Calendar, Clock, Github, Linkedin, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import XIcon from "@/components/x-icon";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogReaderPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postData, profileData] = await Promise.all([
          getBlogPostBySlug(slug),
          getProfile(),
        ]);
        if (!postData) {
          setNotFound(true);
        } else {
          setPost(postData);
        }
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-20 flex-1">
          <div className="animate-pulse space-y-6">
            <div className="flex gap-3">
              <div className="h-6 w-28 bg-muted rounded-full" />
              <div className="h-6 w-20 bg-muted rounded-full" />
            </div>
            <div className="h-12 bg-muted rounded-lg w-3/4" />
            <div className="h-5 bg-muted rounded w-full" />
            <div className="h-5 bg-muted rounded w-2/3" />
            <div className="space-y-3 pt-8">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-muted-foreground">404</span>
            </div>
            <h1 className="text-3xl font-bold mb-3">Post Not Found</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button asChild className="gap-2">
              <a href="/blog/">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </a>
            </Button>
          </div>
        </div>
        <Footer profile={profile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar initials={profile?.initials || "KS"} />

      {/* Article Header */}
      <header className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 pt-12 pb-10">
          <div className="space-y-5">
            <a
              href="/blog/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all posts
            </a>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="gap-1.5 text-xs">
                <Calendar className="w-3 h-3" />
                {post.published_at ? formatDate(post.published_at) : "Draft"}
              </Badge>
              <Badge variant="outline" className="gap-1.5 text-xs">
                <Clock className="w-3 h-3" />
                {post.read_time} min read
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {post.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                {profile?.initials || "KS"}
              </div>
              <div>
                <p className="text-sm font-medium">{profile?.name || "Author"}</p>
                <p className="text-xs text-muted-foreground">Software Developer</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="flex-1">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
          <div className="max-w-none prose-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-14 mb-6 first:mt-0 tracking-tight">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50 tracking-tight">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-10 mb-3 tracking-tight">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-foreground/90 leading-[1.8] mb-6 text-[17px]">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-primary hover:underline underline-offset-4 font-medium" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted/50 border border-border rounded-xl p-5 overflow-x-auto my-8 text-sm leading-relaxed">{children}</pre>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono text-primary">{children}</code>
                  ) : (
                    <code className="font-mono text-sm">{children}</code>
                  );
                },
                ul: ({ children }) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-foreground/90 text-[17px] leading-[1.8]">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary/40 pl-6 my-8 italic text-muted-foreground bg-muted/30 py-4 pr-4 rounded-r-lg">{children}</blockquote>
                ),
                hr: () => <Separator className="my-10" />,
                img: ({ src, alt }) => (
                  <figure className="my-10">
                    <img src={src} alt={alt || ""} className="rounded-xl w-full border border-border/50" />
                    {alt && <figcaption className="text-center text-sm text-muted-foreground mt-3">{alt}</figcaption>}
                  </figure>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8 rounded-xl border border-border">
                    <table className="w-full border-collapse">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border-b border-border bg-muted/50 px-4 py-3 text-left font-semibold text-sm">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-border/50 px-4 py-3 text-sm">{children}</td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Author Card */}
      <div className="border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {profile?.initials || "KS"}
              </div>
              <div>
                <p className="font-semibold text-lg">{profile?.name || "Author"}</p>
                <p className="text-sm text-muted-foreground">{profile?.tagline?.slice(0, 80)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {profile?.github_url && (
                <Button variant="outline" size="sm" asChild className="gap-1.5">
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                </Button>
              )}
              {profile?.linkedin_url && (
                <Button variant="outline" size="sm" asChild className="gap-1.5">
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild className="gap-1.5">
                <a href="https://x.com/karthicksakkara" target="_blank" rel="noopener noreferrer">
                  <XIcon className="w-3.5 h-3.5" /> X
                </a>
              </Button>
            </div>
          </div>
          <Separator className="mb-10" />
          <div className="text-center">
            <Button size="lg" asChild className="gap-2">
              <a href="/blog/">
                <ArrowRight className="w-4 h-4" /> Read More Posts
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer profile={profile} />
    </div>
  );
}
