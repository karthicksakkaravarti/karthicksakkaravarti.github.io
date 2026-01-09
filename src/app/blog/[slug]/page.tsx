"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getBlogPostBySlug, BlogPost, getProfile, Profile } from "@/lib/supabase";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
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

        if (slug) {
            fetchData();
        }
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-3xl px-6 py-20">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-muted rounded w-1/4"></div>
                        <div className="h-12 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="space-y-3 pt-8">
                            <div className="h-4 bg-muted rounded"></div>
                            <div className="h-4 bg-muted rounded"></div>
                            <div className="h-4 bg-muted rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-3xl px-6 py-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <p className="text-muted-foreground mb-8">
                        The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Button asChild>
                        <a href="/#blog">← Back to Blog</a>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="mx-auto max-w-3xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <a
                            href="/"
                            className="text-lg font-semibold tracking-tight hover:text-primary transition-colors"
                        >
                            {profile?.initials || "KS"}
                        </a>
                        <div className="flex items-center gap-6">
                            <a
                                href="/#blog"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                ← All Posts
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Article Header */}
            <header className="mx-auto max-w-3xl px-6 pt-16 pb-8">
                <div className="space-y-6">
                    {/* Back link for mobile */}
                    <a
                        href="/#blog"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                        ← Back to all posts
                    </a>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                {profile?.initials || "KS"}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    {profile?.name || "Author"}
                                </p>
                                <p className="text-xs">
                                    {post.published_at ? formatDate(post.published_at) : "Draft"}
                                </p>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <Badge variant="secondary" className="text-xs">
                            {post.read_time} min read
                        </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {post.description}
                    </p>
                </div>
            </header>

            <Separator className="mx-auto max-w-3xl" />

            {/* Article Content */}
            <article className="mx-auto max-w-3xl px-6 py-12">
                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Custom heading styles
                            h1: ({ children }) => (
                                <h1 className="text-3xl font-bold mt-12 mb-6 first:mt-0">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b border-border/50">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>
                            ),
                            // Paragraph styling
                            p: ({ children }) => (
                                <p className="text-foreground/90 leading-relaxed mb-6 text-lg">
                                    {children}
                                </p>
                            ),
                            // Link styling
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    className="text-primary hover:underline font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {children}
                                </a>
                            ),
                            // Code block styling
                            pre: ({ children }) => (
                                <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto my-6 text-sm">
                                    {children}
                                </pre>
                            ),
                            code: ({ children, className }) => {
                                const isInline = !className;
                                return isInline ? (
                                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                                        {children}
                                    </code>
                                ) : (
                                    <code className="font-mono text-sm">{children}</code>
                                );
                            },
                            // List styling
                            ul: ({ children }) => (
                                <ul className="list-disc list-outside ml-6 mb-6 space-y-2">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-outside ml-6 mb-6 space-y-2">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="text-foreground/90 text-lg leading-relaxed">
                                    {children}
                                </li>
                            ),
                            // Blockquote styling
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-primary/50 pl-6 my-6 italic text-muted-foreground">
                                    {children}
                                </blockquote>
                            ),
                            // Horizontal rule
                            hr: () => <Separator className="my-8" />,
                            // Image styling
                            img: ({ src, alt }) => (
                                <figure className="my-8">
                                    <img
                                        src={src}
                                        alt={alt || ""}
                                        className="rounded-lg w-full"
                                    />
                                    {alt && (
                                        <figcaption className="text-center text-sm text-muted-foreground mt-2">
                                            {alt}
                                        </figcaption>
                                    )}
                                </figure>
                            ),
                            // Table styling
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-6">
                                    <table className="w-full border-collapse border border-border rounded-lg">
                                        {children}
                                    </table>
                                </div>
                            ),
                            th: ({ children }) => (
                                <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="border border-border px-4 py-2">{children}</td>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>

            {/* Article Footer */}
            <Separator className="mx-auto max-w-3xl" />

            <footer className="mx-auto max-w-3xl px-6 py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                            {profile?.initials || "KS"}
                        </div>
                        <div>
                            <p className="font-semibold text-lg">{profile?.name || "Author"}</p>
                            <p className="text-sm text-muted-foreground">
                                {profile?.tagline?.slice(0, 60)}...
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {profile?.github_url && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </Button>
                        )}
                        {profile?.linkedin_url && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/50 text-center">
                    <Button asChild>
                        <a href="/#blog">← Read More Posts</a>
                    </Button>
                </div>
            </footer>

            {/* Site Footer */}
            <div className="border-t border-border/40">
                <div className="mx-auto max-w-3xl px-6 py-8">
                    <p className="text-sm text-muted-foreground text-center">
                        © {new Date().getFullYear()} {profile?.name || "Karthick Sakkaravarthi"}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
