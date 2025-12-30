import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type TableName = 
  | "projects"
  | "tasks"
  | "clients"
  | "time_entries"
  | "invoices"
  | "expenses"
  | "tickets"
  | "team_members";

interface UseRealtimeSubscriptionOptions {
  tables: TableName[];
  queryKeys?: string[][];
}

/**
 * Hook to subscribe to real-time database changes and invalidate React Query cache
 */
export function useRealtimeSubscription({ tables, queryKeys }: UseRealtimeSubscriptionOptions) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase.channel("dashboard-realtime");

    tables.forEach((table) => {
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          console.log(`Realtime update on ${table}:`, payload.eventType);

          // Invalidate the table's query cache
          queryClient.invalidateQueries({ queryKey: [table] });

          // Also invalidate dashboard stats when relevant data changes
          if (["projects", "clients", "invoices", "tasks"].includes(table)) {
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            queryClient.invalidateQueries({ queryKey: ["recent-projects"] });
            queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
          }

          // Invalidate any additional query keys provided
          if (queryKeys) {
            queryKeys.forEach((key) => {
              queryClient.invalidateQueries({ queryKey: key });
            });
          }
        }
      );
    });

    channel.subscribe((status) => {
      console.log("Realtime subscription status:", status);
    });

    return () => {
      console.log("Unsubscribing from realtime channel");
      supabase.removeChannel(channel);
    };
  }, [queryClient, tables.join(",")]);
}

/**
 * Pre-configured hook for dashboard real-time updates
 */
export function useDashboardRealtime() {
  useRealtimeSubscription({
    tables: ["projects", "tasks", "clients", "time_entries", "invoices", "expenses", "tickets"],
  });
}

/**
 * Hook for projects page real-time updates
 */
export function useProjectsRealtime() {
  useRealtimeSubscription({
    tables: ["projects", "tasks"],
    queryKeys: [["projects"], ["tasks"]],
  });
}

/**
 * Hook for clients page real-time updates
 */
export function useClientsRealtime() {
  useRealtimeSubscription({
    tables: ["clients"],
  });
}

/**
 * Hook for tasks page real-time updates
 */
export function useTasksRealtime() {
  useRealtimeSubscription({
    tables: ["tasks"],
    queryKeys: [["tasks"], ["tasks", "by-status"]],
  });
}

/**
 * Hook for time tracking real-time updates
 */
export function useTimeTrackingRealtime() {
  useRealtimeSubscription({
    tables: ["time_entries"],
    queryKeys: [["time_entries"], ["time_entries", "running"]],
  });
}

/**
 * Hook for invoices page real-time updates
 */
export function useInvoicesRealtime() {
  useRealtimeSubscription({
    tables: ["invoices"],
  });
}

/**
 * Hook for expenses page real-time updates
 */
export function useExpensesRealtime() {
  useRealtimeSubscription({
    tables: ["expenses"],
  });
}

/**
 * Hook for tickets page real-time updates
 */
export function useTicketsRealtime() {
  useRealtimeSubscription({
    tables: ["tickets"],
  });
}
