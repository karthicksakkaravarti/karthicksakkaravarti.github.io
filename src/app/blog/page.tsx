"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile, getBlogPosts, Profile, BlogPost } from "@/lib/supabase";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogListPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [p, postsData] = await Promise.all([getProfile(), getBlogPosts()]);
        setProfile(p);
        setPosts(postsData);
      } catch (e) {
        console.error("Error:", e);
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
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Blog</h2>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Posts & Articles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Thoughts on software development, technology, and things I&apos;ve learned along the way.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="flex-1">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-xl border border-border/50 p-6 space-y-3">
                  <div className="flex gap-3">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-4 w-16 bg-muted rounded" />
                  </div>
                  <div className="h-6 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <a key={post.id} href={`/blog/${post.slug}/`} className="block group">
                  <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Badge variant="secondary" className="gap-1.5 text-xs font-normal">
                          <Calendar className="w-3 h-3" />
                          {post.published_at ? formatDate(post.published_at) : "Draft"}
                        </Badge>
                        <Badge variant="outline" className="gap-1.5 text-xs font-normal">
                          <Clock className="w-3 h-3" />
                          {post.read_time} min read
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-base line-clamp-2">{post.description}</CardDescription>
                      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium pt-2 group-hover:gap-2 transition-all">
                        Read article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </CardHeader>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No blog posts yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer profile={profile} />
    </div>
  );
}
