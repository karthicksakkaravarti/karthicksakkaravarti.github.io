"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    signIn,
    signOut,
    getSession,
    onAuthStateChange,
    getAllProjects,
    getAllBlogPosts,
    createProject,
    updateProject,
    deleteProject,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    Project,
    BlogPost,
} from "@/lib/supabase";

type Tab = "projects" | "blogs";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("projects");

    // Data states
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    // Modal states
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

    useEffect(() => {
        // Check initial session
        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = onAuthStateChange((event, session) => {
            setIsAuthenticated(!!session);
            if (session) {
                fetchData();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function checkSession() {
        const { session } = await getSession();
        setIsAuthenticated(!!session);
        setIsLoading(false);
        if (session) {
            fetchData();
        }
    }

    async function fetchData() {
        const [projectsData, blogsData] = await Promise.all([
            getAllProjects(),
            getAllBlogPosts(),
        ]);
        setProjects(projectsData);
        setBlogPosts(blogsData);
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const { error } = await signIn(email, password);
        if (error) {
            setError(error.message);
        } else {
            setEmail("");
            setPassword("");
        }
    }

    async function handleLogout() {
        await signOut();
        setIsAuthenticated(false);
        setProjects([]);
        setBlogPosts([]);
    }

    async function handleDeleteProject(id: string) {
        if (confirm("Are you sure you want to delete this project?")) {
            const { error } = await deleteProject(id);
            if (!error) {
                setProjects(projects.filter(p => p.id !== id));
            }
        }
    }

    async function handleDeleteBlog(id: string) {
        if (confirm("Are you sure you want to delete this blog post?")) {
            const { error } = await deleteBlogPost(id);
            if (!error) {
                setBlogPosts(blogPosts.filter(b => b.id !== id));
            }
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Admin Login</CardTitle>
                        <CardDescription>Sign in to manage your portfolio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </form>
                        <div className="mt-4 text-center">
                            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                                ← Back to Home
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="mx-auto max-w-6xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <a href="/" className="text-lg font-semibold tracking-tight hover:text-primary transition-colors">
                            ← Back to Site
                        </a>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">Admin Dashboard</span>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-6xl px-6 py-8">
                <h1 className="text-3xl font-bold mb-8">Content Management</h1>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <Button
                        variant={activeTab === "projects" ? "default" : "outline"}
                        onClick={() => setActiveTab("projects")}
                    >
                        Projects ({projects.length})
                    </Button>
                    <Button
                        variant={activeTab === "blogs" ? "default" : "outline"}
                        onClick={() => setActiveTab("blogs")}
                    >
                        Blog Posts ({blogPosts.length})
                    </Button>
                </div>

                <Separator className="mb-6" />

                {/* Projects Tab */}
                {activeTab === "projects" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Projects</h2>
                            <Button onClick={() => { setEditingProject(null); setShowProjectModal(true); }}>
                                + Add Project
                            </Button>
                        </div>

                        <div className="grid gap-4">
                            {projects.map((project) => (
                                <Card key={project.id} className={!project.is_visible ? "opacity-60" : ""}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    {project.title}
                                                    {!project.is_visible && (
                                                        <Badge variant="secondary">Hidden</Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>{project.description}</CardDescription>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => { setEditingProject(project); setShowProjectModal(true); }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteProject(project.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, i) => (
                                                <Badge key={i} variant="outline">{tag}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {projects.length === 0 && (
                                <p className="text-muted-foreground text-center py-8">
                                    No projects yet. Click &quot;Add Project&quot; to create one.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Blog Posts Tab */}
                {activeTab === "blogs" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Blog Posts</h2>
                            <Button onClick={() => { setEditingBlog(null); setShowBlogModal(true); }}>
                                + Add Post
                            </Button>
                        </div>

                        <div className="grid gap-4">
                            {blogPosts.map((post) => (
                                <Card key={post.id} className={!post.is_published ? "opacity-60" : ""}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    {post.title}
                                                    {!post.is_published && (
                                                        <Badge variant="secondary">Draft</Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>{post.description}</CardDescription>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => { setEditingBlog(post); setShowBlogModal(true); }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteBlog(post.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm text-muted-foreground">
                                            <span>Slug: {post.slug}</span>
                                            <span className="mx-2">•</span>
                                            <span>{post.read_time} min read</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {blogPosts.length === 0 && (
                                <p className="text-muted-foreground text-center py-8">
                                    No blog posts yet. Click &quot;Add Post&quot; to create one.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Project Modal */}
            {showProjectModal && (
                <ProjectModal
                    project={editingProject}
                    onClose={() => setShowProjectModal(false)}
                    onSave={async (data) => {
                        if (editingProject) {
                            const { data: updated, error } = await updateProject(editingProject.id, data);
                            if (!error && updated) {
                                setProjects(projects.map(p => p.id === editingProject.id ? updated : p));
                            }
                        } else {
                            const { data: created, error } = await createProject(data as Omit<Project, 'id' | 'created_at' | 'updated_at'>);
                            if (!error && created) {
                                setProjects([...projects, created]);
                            }
                        }
                        setShowProjectModal(false);
                    }}
                />
            )}

            {/* Blog Modal */}
            {showBlogModal && (
                <BlogModal
                    post={editingBlog}
                    onClose={() => setShowBlogModal(false)}
                    onSave={async (data) => {
                        if (editingBlog) {
                            const { data: updated, error } = await updateBlogPost(editingBlog.id, data);
                            if (!error && updated) {
                                setBlogPosts(blogPosts.map(b => b.id === editingBlog.id ? updated : b));
                            }
                        } else {
                            const { data: created, error } = await createBlogPost(data as Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>);
                            if (!error && created) {
                                setBlogPosts([...blogPosts, created]);
                            }
                        }
                        setShowBlogModal(false);
                    }}
                />
            )}
        </div>
    );
}

// Project Modal Component
function ProjectModal({
    project,
    onClose,
    onSave,
}: {
    project: Project | null;
    onClose: () => void;
    onSave: (data: Partial<Project>) => void;
}) {
    const [title, setTitle] = useState(project?.title || "");
    const [description, setDescription] = useState(project?.description || "");
    const [tags, setTags] = useState(project?.tags.join(", ") || "");
    const [url, setUrl] = useState(project?.url || "");
    const [githubUrl, setGithubUrl] = useState(project?.github_url || "");
    const [displayOrder, setDisplayOrder] = useState(project?.display_order || 0);
    const [isVisible, setIsVisible] = useState(project?.is_visible ?? true);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave({
            title,
            description,
            tags: tags.split(",").map(t => t.trim()).filter(Boolean),
            url: url || null,
            github_url: githubUrl || null,
            display_order: displayOrder,
            is_visible: isVisible,
        });
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <CardHeader>
                    <CardTitle>{project ? "Edit Project" : "New Project"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description *</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-[80px]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tags (comma-separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                placeholder="React, TypeScript, Node.js"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Project URL</label>
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">GitHub URL</label>
                            <input
                                type="url"
                                value={githubUrl}
                                onChange={(e) => setGithubUrl(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Display Order</label>
                                <input
                                    type="number"
                                    value={displayOrder}
                                    onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Visibility</label>
                                <div className="flex items-center gap-2 py-2">
                                    <input
                                        type="checkbox"
                                        id="isVisible"
                                        checked={isVisible}
                                        onChange={(e) => setIsVisible(e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                    <label htmlFor="isVisible" className="text-sm">Visible on site</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <Button type="submit" className="flex-1">
                                {project ? "Update" : "Create"}
                            </Button>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

// Blog Modal Component
function BlogModal({
    post,
    onClose,
    onSave,
}: {
    post: BlogPost | null;
    onClose: () => void;
    onSave: (data: Partial<BlogPost>) => void;
}) {
    const [title, setTitle] = useState(post?.title || "");
    const [slug, setSlug] = useState(post?.slug || "");
    const [description, setDescription] = useState(post?.description || "");
    const [content, setContent] = useState(post?.content || "");
    const [readTime, setReadTime] = useState(post?.read_time || 5);
    const [isPublished, setIsPublished] = useState(post?.is_published ?? false);

    // Auto-generate slug from title
    useEffect(() => {
        if (!post) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            setSlug(generatedSlug);
        }
    }, [title, post]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave({
            title,
            slug,
            description,
            content,
            read_time: readTime,
            is_published: isPublished,
            published_at: isPublished ? new Date().toISOString() : null,
        });
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                    <CardTitle>{post ? "Edit Blog Post" : "New Blog Post"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug *</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description *</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-[60px]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Content (Markdown)</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-[200px] font-mono text-sm"
                                placeholder="# Your blog post content here..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Read Time (minutes)</label>
                                <input
                                    type="number"
                                    value={readTime}
                                    onChange={(e) => setReadTime(parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    min="1"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <div className="flex items-center gap-2 py-2">
                                    <input
                                        type="checkbox"
                                        id="isPublished"
                                        checked={isPublished}
                                        onChange={(e) => setIsPublished(e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                    <label htmlFor="isPublished" className="text-sm">Published</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <Button type="submit" className="flex-1">
                                {post ? "Update" : "Create"}
                            </Button>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
