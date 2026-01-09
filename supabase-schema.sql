-- ============================================
-- Supabase Database Schema for Portfolio Website
-- ============================================
-- Run these SQL commands in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/htpyqqdnnzpdlqbnimcf/sql/new

-- ============================================
-- 1. PROFILE TABLE (Single row for your info)
-- ============================================
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  tagline TEXT NOT NULL,
  about_text TEXT NOT NULL,
  is_available_for_work BOOLEAN DEFAULT true,
  github_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Public read policy (anyone can read your profile)
CREATE POLICY "Profile is publicly readable" 
  ON profile FOR SELECT 
  USING (true);

-- Only authenticated users can update (for admin)
CREATE POLICY "Authenticated users can update profile" 
  ON profile FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Insert initial profile data
INSERT INTO profile (name, initials, tagline, about_text, is_available_for_work, github_url, linkedin_url, email)
VALUES (
  'Karthick Sakkaravarthi',
  'KS',
  'Software Developer passionate about building products that make a difference. I write about technology, share my projects, and document my journey in tech.',
  'Welcome to my corner of the internet! I''m a software developer with a passion for creating elegant solutions to complex problems. When I''m not coding, you can find me exploring new technologies, writing about my experiences, or working on side projects.',
  true,
  'https://github.com/karthicksakkaravarti',
  'https://linkedin.com/in/karthicksakkaravarthi',
  'karthicksakkaravarthi@gmail.com'
);

-- ============================================
-- 2. PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  url TEXT,
  github_url TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Projects are publicly readable" 
  ON projects FOR SELECT 
  USING (is_visible = true);

-- Admin policies
CREATE POLICY "Authenticated users can insert projects" 
  ON projects FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" 
  ON projects FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" 
  ON projects FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Insert sample projects
INSERT INTO projects (title, description, tags, display_order, is_visible)
VALUES 
  ('Project One', 'A brief description of this amazing project and what it does.', ARRAY['React', 'TypeScript', 'Node.js'], 1, true),
  ('Project Two', 'Another cool project with interesting features.', ARRAY['Next.js', 'Tailwind', 'Prisma'], 2, true);

-- Allow authenticated users to read ALL projects (for admin)
CREATE POLICY "Authenticated users can read all projects" 
  ON projects FOR SELECT 
  USING (auth.role() = 'authenticated');

-- ============================================
-- 3. BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT DEFAULT '',
  read_time INTEGER DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read policy (only published posts)
CREATE POLICY "Published posts are publicly readable" 
  ON blog_posts FOR SELECT 
  USING (is_published = true);

-- Admin policies  
CREATE POLICY "Authenticated users can insert posts" 
  ON blog_posts FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update posts" 
  ON blog_posts FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete posts" 
  ON blog_posts FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, description, content, read_time, published_at, is_published)
VALUES 
  (
    'Getting Started with Next.js',
    'getting-started-with-nextjs',
    'A comprehensive guide to building modern web applications with Next.js.',
    '# Getting Started with Next.js\n\nNext.js is a powerful React framework...',
    5,
    '2026-01-09T00:00:00Z',
    true
  ),
  (
    'My Developer Journey',
    'my-developer-journey',
    'Reflecting on my path as a software developer and lessons learned along the way.',
    '# My Developer Journey\n\nAs I look back on my journey as a developer...',
    3,
    '2026-01-05T00:00:00Z',
    true
  );

-- Allow authenticated users to read ALL blog posts (for admin)
CREATE POLICY "Authenticated users can read all blog posts" 
  ON blog_posts FOR SELECT 
  USING (auth.role() = 'authenticated');

-- ============================================
-- 4. HELPER FUNCTION: Auto-update timestamps
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for auto-updating updated_at
CREATE TRIGGER update_profile_updated_at 
  BEFORE UPDATE ON profile 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
