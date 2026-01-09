import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Profile {
    id: string;
    name: string;
    initials: string;
    tagline: string;
    about_text: string;
    is_available_for_work: boolean;
    github_url: string | null;
    linkedin_url: string | null;
    email: string | null;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    url: string | null;
    github_url: string | null;
    image_url: string | null;
    display_order: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    read_time: number;
    published_at: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

// Data fetching functions
export async function getProfile(): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
    return data;
}

export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
    return data || [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
    return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
    return data;
}

// ============================================
// Authentication Functions
// ============================================

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
}

export function onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return supabase.auth.onAuthStateChange(callback);
}

// ============================================
// Admin Functions (for authenticated users)
// ============================================

// Get ALL projects (including hidden ones) for admin
export async function getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching all projects:', error);
        return [];
    }
    return data || [];
}

// Get ALL blog posts (including unpublished) for admin
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all blog posts:', error);
        return [];
    }
    return data || [];
}

// ============================================
// CRUD for Projects
// ============================================

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();

    return { data, error };
}

export async function updateProject(id: string, project: Partial<Project>) {
    const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .single();

    return { data, error };
}

export async function deleteProject(id: string) {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    return { error };
}

// ============================================
// CRUD for Blog Posts
// ============================================

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();

    return { data, error };
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>) {
    const { data, error } = await supabase
        .from('blog_posts')
        .update(post)
        .eq('id', id)
        .select()
        .single();

    return { data, error };
}

export async function deleteBlogPost(id: string) {
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

    return { error };
}

// ============================================
// Update Profile
// ============================================

export async function updateProfile(id: string, profile: Partial<Profile>) {
    const { data, error } = await supabase
        .from('profile')
        .update(profile)
        .eq('id', id)
        .select()
        .single();

    return { data, error };
}
