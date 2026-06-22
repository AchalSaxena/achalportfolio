-- -------------------------------------------------------------
-- SQL SCHEMA FOR PORTFOLIO BACKEND (SUPABASE)
-- Run this in the Supabase SQL Editor to set up your tables.
-- -------------------------------------------------------------

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    tags TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    github_url TEXT,
    demo_url TEXT,
    category TEXT NOT NULL, -- e.g., 'Frontend', 'Full Stack', 'Cloud / DevOps'
    views BIGINT DEFAULT 0 NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access (Required for visitors to see projects)
CREATE POLICY "Allow public read access to projects" 
ON public.projects FOR SELECT 
TO anon 
USING (true);

-- Allow public update to project views (Required to increment views)
CREATE POLICY "Allow public views increment"
ON public.projects FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);


-- 2. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (Required for the contact form to work)
CREATE POLICY "Allow anonymous message submission" 
ON public.contact_messages FOR INSERT 
TO anon 
WITH CHECK (true);


-- 3. ANALYTICS TABLE (To track general page-wide metrics)
CREATE TABLE IF NOT EXISTS public.analytics (
    key TEXT PRIMARY KEY,
    value BIGINT DEFAULT 0 NOT NULL
);

-- Enable RLS
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read of analytics" 
ON public.analytics FOR SELECT 
TO anon 
USING (true);

-- Allow public update/increment
CREATE POLICY "Allow public update of analytics" 
ON public.analytics FOR UPDATE 
TO anon 
USING (true)
WITH CHECK (true);

-- Insert initial analytics counter
INSERT INTO public.analytics (key, value) 
VALUES ('page_views', 0) 
ON CONFLICT (key) DO NOTHING;


-- 4. SEED DATA (Default premium projects to display initially)
INSERT INTO public.projects (title, description, image_url, tags, github_url, demo_url, category)
VALUES 
(
    'Cloud-Scale Distributed Ledger', 
    'A high-throughput blockchain ledger utilizing consensus algorithms and gRPC streaming services. Handled 50k+ transactions per second in stress tests.',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    ARRAY['Go', 'gRPC', 'Docker', 'Kubernetes', 'Redis'],
    'https://github.com/example/ledger',
    'https://example.com/ledger',
    'Cloud / DevOps'
),
(
    'AI-Powered Code Analytics Dashboard', 
    'Real-time visualization engine for git repositories. Analyzes contribution speed, security vulnerability patterns, and code smells using fine-tuned model APIs.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    'https://github.com/example/code-analytics',
    'https://example.com/dashboard',
    'Full Stack'
),
(
    'Glassmorphic UI Component Library', 
    'An open-source React UI library built around glassmorphic layouts, high accessibility, and modular tailwind styles. 12k+ downloads on npm.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    ARRAY['React', 'Vite', 'TailwindCSS', 'Storybook', 'Framer Motion'],
    'https://github.com/example/glass-ui',
    'https://example.com/glass-ui',
    'Frontend'
)
ON CONFLICT DO NOTHING;
