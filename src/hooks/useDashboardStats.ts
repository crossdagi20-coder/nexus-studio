import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [projectsRes, clientsRes, invoicesRes, tasksRes] = await Promise.all([
        supabase
          .from("projects")
          .select("id, status")
          .neq("status", "completed"),
        supabase.from("clients").select("id"),
        supabase
          .from("invoices")
          .select("total, status")
          .eq("status", "paid"),
        supabase
          .from("tasks")
          .select("id, status")
          .neq("status", "done"),
      ]);

      const activeProjects = projectsRes.data?.length || 0;
      const totalClients = clientsRes.data?.length || 0;
      const paidInvoices = invoicesRes.data || [];
      const pendingTasks = tasksRes.data?.length || 0;

      const monthlyRevenue = paidInvoices.reduce(
        (sum, inv) => sum + (inv.total || 0),
        0
      );

      return {
        activeProjects,
        totalClients,
        monthlyRevenue,
        pendingTasks,
      };
    },
  });
}

export function useRecentProjects() {
  return useQuery({
    queryKey: ["recent-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      return data;
    },
  });
}

export function useUpcomingTasks() {
  return useQuery({
    queryKey: ["upcoming-tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*, projects(name)")
        .neq("status", "done")
        .order("due_date", { ascending: true })
        .limit(4);

      if (error) throw error;
      return data;
    },
  });
}
