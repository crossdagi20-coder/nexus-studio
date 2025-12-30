import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Task = Tables<"tasks">;
export type TaskInsert = TablesInsert<"tasks">;
export type TaskUpdate = TablesUpdate<"tasks">;

export function useTasks(projectId?: string) {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      let query = supabase
        .from("tasks")
        .select("*")
        .order("position", { ascending: true });

      if (projectId) {
        query = query.eq("project_id", projectId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Task[];
    },
  });
}

export function useTasksByStatus() {
  return useQuery({
    queryKey: ["tasks", "by-status"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("position", { ascending: true });

      if (error) throw error;

      const grouped = {
        todo: (data as Task[]).filter((t) => t.status === "todo"),
        in_progress: (data as Task[]).filter((t) => t.status === "in_progress"),
        review: (data as Task[]).filter((t) => t.status === "review"),
        done: (data as Task[]).filter((t) => t.status === "done"),
      };

      return grouped;
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: TaskInsert) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert(task)
        .select()
        .single();

      if (error) throw error;
      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: TaskUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
