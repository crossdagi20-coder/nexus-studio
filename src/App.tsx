import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import Clients from "./pages/dashboard/Clients";
import TaskBoard from "./pages/dashboard/TaskBoard";
import Timeline from "./pages/dashboard/Timeline";
import TimeTracking from "./pages/dashboard/TimeTracking";
import Invoices from "./pages/dashboard/Invoices";
import Expenses from "./pages/dashboard/Expenses";
import Revenue from "./pages/dashboard/Revenue";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import Team from "./pages/dashboard/Team";
import Assets from "./pages/dashboard/Assets";
import SocialHub from "./pages/dashboard/SocialHub";
import Tickets from "./pages/dashboard/Tickets";
import ClientPortal from "./pages/portal/ClientPortal";

// CMS Pages
import CMSOverview from "./pages/dashboard/cms/index";
import PortfolioManagement from "./pages/dashboard/cms/PortfolioManagement";
import TeamManagement from "./pages/dashboard/cms/TeamManagement";
import ServicesManagement from "./pages/dashboard/cms/ServicesManagement";
import CareersManagement from "./pages/dashboard/cms/CareersManagement";
import BlogManagement from "./pages/dashboard/cms/BlogManagement";
import PageContent from "./pages/dashboard/cms/PageContent";

// Service Pages
import Services from "./pages/services/Services";
import Architecture from "./pages/services/Architecture";
import WebDevelopment from "./pages/services/WebDevelopment";
import SocialMedia from "./pages/services/SocialMedia";
import GraphicDesign from "./pages/services/GraphicDesign";

// Company Pages
import About from "./pages/company/About";
import Portfolio from "./pages/company/Portfolio";
import Careers from "./pages/company/Careers";
import Blog from "./pages/company/Blog";
import Contact from "./pages/company/Contact";

// Legal Pages
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Cookies from "./pages/legal/Cookies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Service Pages */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/architecture" element={<Architecture />} />
            <Route path="/services/web" element={<WebDevelopment />} />
            <Route path="/services/social" element={<SocialMedia />} />
            <Route path="/services/design" element={<GraphicDesign />} />
            
            {/* Company Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<Projects />} />
            <Route path="/dashboard/clients" element={<Clients />} />
            <Route path="/dashboard/tasks" element={<TaskBoard />} />
            <Route path="/dashboard/timeline" element={<Timeline />} />
            <Route path="/dashboard/time" element={<TimeTracking />} />
            <Route path="/dashboard/invoices" element={<Invoices />} />
            <Route path="/dashboard/expenses" element={<Expenses />} />
            <Route path="/dashboard/revenue" element={<Revenue />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/team" element={<Team />} />
            <Route path="/dashboard/assets" element={<Assets />} />
            <Route path="/dashboard/social" element={<SocialHub />} />
            <Route path="/dashboard/tickets" element={<Tickets />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            
            {/* CMS Routes */}
            <Route path="/dashboard/cms" element={<CMSOverview />} />
            <Route path="/dashboard/cms/portfolio" element={<PortfolioManagement />} />
            <Route path="/dashboard/cms/team" element={<TeamManagement />} />
            <Route path="/dashboard/cms/services" element={<ServicesManagement />} />
            <Route path="/dashboard/cms/careers" element={<CareersManagement />} />
            <Route path="/dashboard/cms/blog" element={<BlogManagement />} />
            <Route path="/dashboard/cms/pages" element={<PageContent />} />
            
            {/* Client Portal */}
            <Route path="/portal" element={<ClientPortal />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
