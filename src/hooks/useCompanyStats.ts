import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CompanyStat {
  id: string;
  label: string;
  value: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function useCompanyStats() {
  return useQuery({
    queryKey: ["company-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_stats")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as CompanyStat[];
    },
  });
}

export function useUpdateCompanyStat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (stat: Partial<CompanyStat> & { id: string }) => {
      const { data, error } = await supabase
        .from("company_stats")
        .update(stat)
        .eq("id", stat.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-stats"] });
    },
  });
}

export function useCreateCompanyStat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (stat: Omit<CompanyStat, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("company_stats")
        .insert(stat)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-stats"] });
    },
  });
}

export function useDeleteCompanyStat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("company_stats").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-stats"] });
    },
  });
}
