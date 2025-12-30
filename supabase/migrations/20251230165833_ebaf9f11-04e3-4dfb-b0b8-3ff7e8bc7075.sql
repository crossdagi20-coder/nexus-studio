-- =============================================
-- CMS TABLES FOR PUBLIC WEBSITE CONTENT
-- =============================================

-- 1. Site Content - General page content (hero sections, text blocks, etc.)
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page, section, key)
);

-- 2. Company Stats - Stats shown on About page
CREATE TABLE public.company_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Team Members Public - Team shown on About page
CREATE TABLE public.team_members_public (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  expertise TEXT,
  bio TEXT,
  avatar_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Portfolio Items
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  icon TEXT DEFAULT 'Briefcase',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Services Content
CREATE TABLE public.services_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  icon TEXT DEFAULT 'Briefcase',
  color TEXT DEFAULT 'primary',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Job Postings
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT,
  requirements JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. Blog Posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  author_name TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  read_time TEXT DEFAULT '5 min read',
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members_public ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - Public SELECT, Admin-only write
-- =============================================

-- Site Content
CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Company Stats
CREATE POLICY "Anyone can view company stats" ON public.company_stats FOR SELECT USING (true);
CREATE POLICY "Admins can manage company stats" ON public.company_stats FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Team Members Public
CREATE POLICY "Anyone can view visible team members" ON public.team_members_public FOR SELECT USING (is_visible = true);
CREATE POLICY "Admins can view all team members" ON public.team_members_public FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage team members" ON public.team_members_public FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Portfolio Items
CREATE POLICY "Anyone can view visible portfolio items" ON public.portfolio_items FOR SELECT USING (is_visible = true);
CREATE POLICY "Admins can view all portfolio items" ON public.portfolio_items FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage portfolio items" ON public.portfolio_items FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Services Content
CREATE POLICY "Anyone can view visible services" ON public.services_content FOR SELECT USING (is_visible = true);
CREATE POLICY "Admins can view all services" ON public.services_content FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage services" ON public.services_content FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Job Postings
CREATE POLICY "Anyone can view active job postings" ON public.job_postings FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all job postings" ON public.job_postings FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage job postings" ON public.job_postings FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Blog Posts
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can view all blog posts" ON public.blog_posts FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- TRIGGERS FOR updated_at
-- =============================================
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_company_stats_updated_at BEFORE UPDATE ON public.company_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_members_public_updated_at BEFORE UPDATE ON public.team_members_public FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_content_updated_at BEFORE UPDATE ON public.services_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON public.job_postings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- SEED DEFAULT DATA
-- =============================================

-- Company Stats
INSERT INTO public.company_stats (label, value, display_order) VALUES
('Projects Delivered', '500+', 1),
('Happy Clients', '200+', 2),
('Team Members', '50+', 3),
('Years Experience', '10+', 4);

-- Team Members
INSERT INTO public.team_members_public (name, role, expertise, display_order) VALUES
('Alex Chen', 'CEO & Founder', 'Strategic Leadership', 1),
('Sarah Miller', 'Creative Director', 'Brand & Visual Design', 2),
('James Wilson', 'Tech Lead', 'Full-Stack Development', 3);

-- Portfolio Items
INSERT INTO public.portfolio_items (title, category, description, icon, display_order) VALUES
('Skyline Tower', 'Architecture', 'A 50-story mixed-use development featuring cutting-edge sustainable design', 'Building2', 1),
('E-Commerce Platform', 'Web Development', 'Full-stack solution handling 100K+ daily transactions', 'Globe', 2),
('Brand Identity Suite', 'Graphic Design', 'Complete visual identity for a Fortune 500 company', 'Palette', 3),
('Social Campaign', 'Social Media', 'Viral marketing campaign reaching 10M+ impressions', 'Users', 4),
('Urban Plaza', 'Architecture', 'Award-winning public space design', 'Building', 5),
('SaaS Dashboard', 'Web Development', 'Analytics platform for enterprise clients', 'BarChart3', 6);

-- Services
INSERT INTO public.services_content (service_type, title, subtitle, description, features, icon, display_order) VALUES
('architecture', 'Architecture & 3D', 'Bringing visions to life', 'We create stunning architectural visualizations and 3D renders that help you see your project before it is built.', '["3D Visualization", "Architectural Rendering", "Virtual Tours", "BIM Modeling"]', 'Building2', 1),
('web', 'Web Development', 'Digital solutions that scale', 'We build modern, responsive websites and web applications using the latest technologies.', '["React & Next.js", "E-commerce", "Custom CMS", "API Integration"]', 'Globe', 2),
('social', 'Social Media', 'Amplify your voice', 'Strategic social media management to grow your brand presence and engagement.', '["Content Strategy", "Community Management", "Paid Advertising", "Analytics"]', 'Users', 3),
('design', 'Graphic Design', 'Visual storytelling', 'Creating compelling visual identities and marketing materials that resonate.', '["Brand Identity", "Print Design", "UI/UX Design", "Motion Graphics"]', 'Palette', 4);

-- Job Postings
INSERT INTO public.job_postings (title, department, location, type, description) VALUES
('Senior 3D Artist', 'Creative', 'Remote', 'Full-time', 'Create stunning architectural visualizations and 3D renders for high-profile projects.'),
('Full Stack Developer', 'Engineering', 'Hybrid', 'Full-time', 'Build and maintain web applications using React, Node.js, and modern technologies.'),
('Social Media Manager', 'Marketing', 'On-site', 'Full-time', 'Develop and execute social media strategies for our diverse client portfolio.');

-- Blog Posts
INSERT INTO public.blog_posts (title, slug, excerpt, author_name, category, read_time, is_published, published_at) VALUES
('The Future of Architectural Visualization', 'future-of-architectural-visualization', 'Exploring how AI and real-time rendering are transforming the industry.', 'Alex Chen', 'Architecture', '5 min read', true, now()),
('Building Scalable Web Applications', 'building-scalable-web-applications', 'Best practices for creating applications that grow with your business.', 'James Wilson', 'Development', '8 min read', true, now()),
('Social Media Trends 2024', 'social-media-trends-2024', 'What is working now and what to expect in the coming months.', 'Sarah Miller', 'Marketing', '6 min read', true, now());