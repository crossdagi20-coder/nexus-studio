import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileText, Users, Briefcase, Palette, Building2, Newspaper, 
  ArrowRight, BarChart3
} from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useJobPostings } from "@/hooks/useJobPostings";
import { useTeamPublic } from "@/hooks/useTeamPublic";

const cmsModules = [
  { 
    title: "Portfolio", 
    description: "Manage portfolio projects and case studies",
    icon: Briefcase, 
    href: "/dashboard/cms/portfolio",
    color: "text-blue-500"
  },
  { 
    title: "Team", 
    description: "Manage public team members",
    icon: Users, 
    href: "/dashboard/cms/team",
    color: "text-green-500"
  },
  { 
    title: "Services", 
    description: "Edit service pages content",
    icon: Palette, 
    href: "/dashboard/cms/services",
    color: "text-purple-500"
  },
  { 
    title: "Careers", 
    description: "Manage job postings",
    icon: Building2, 
    href: "/dashboard/cms/careers",
    color: "text-orange-500"
  },
  { 
    title: "Blog", 
    description: "Create and manage blog posts",
    icon: Newspaper, 
    href: "/dashboard/cms/blog",
    color: "text-pink-500"
  },
  { 
    title: "Page Content", 
    description: "Edit hero sections and page text",
    icon: FileText, 
    href: "/dashboard/cms/pages",
    color: "text-cyan-500"
  },
];

export default function CMSOverview() {
  const { data: portfolio } = usePortfolio();
  const { data: blogPosts } = useBlogPosts();
  const { data: jobPostings } = useJobPostings();
  const { data: team } = useTeamPublic();

  const stats = [
    { label: "Portfolio Items", value: portfolio?.length || 0 },
    { label: "Blog Posts", value: blogPosts?.filter(p => p.is_published).length || 0 },
    { label: "Job Postings", value: jobPostings?.filter(j => j.is_active).length || 0 },
    { label: "Team Members", value: team?.filter(t => t.is_visible).length || 0 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Content Management</h1>
          <p className="text-muted-foreground mt-1">Manage your public website content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CMS Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cmsModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-secondary ${module.color}`}>
                      <module.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <CardTitle className="mt-4">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" className="w-full">
                    <Link to={module.href}>Manage {module.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
