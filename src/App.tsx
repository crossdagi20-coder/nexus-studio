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
