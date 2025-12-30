import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { useAuth } from "@/contexts/AuthContext";

export type TimeEntry = Tables<"time_entries">;
export type TimeEntryInsert = TablesInsert<"time_entries">;
export type TimeEntryUpdate = TablesUpdate<"time_entries">;

export function useTimeEntries() {
  return useQuery({
    queryKey: ["time_entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("time_entries")
        .select("*, projects(name)")
        .order("start_time", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useRunningTimer() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["time_entries", "running"],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("time_entries")
        .select("*, projects(name)")
        .eq("user_id", user.id)
        .eq("is_running", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useStartTimer() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (entry: Omit<TimeEntryInsert, "user_id">) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("time_entries")
        .insert({
          ...entry,
          user_id: user.id,
          is_running: true,
          start_time: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as TimeEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time_entries"] });
    },
  });
}

export function useStopTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const endTime = new Date();
      const { data: entry } = await supabase
        .from("time_entries")
        .select("start_time")
        .eq("id", id)
        .single();

      const startTime = new Date(entry?.start_time || "");
      const durationMinutes = Math.round(
        (endTime.getTime() - startTime.getTime()) / 60000
      );

      const { data, error } = await supabase
        .from("time_entries")
        .update({
          is_running: false,
          end_time: endTime.toISOString(),
          duration_minutes: durationMinutes,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as TimeEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time_entries"] });
    },
  });
}

export function useDeleteTimeEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("time_entries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time_entries"] });
    },
  });
}
