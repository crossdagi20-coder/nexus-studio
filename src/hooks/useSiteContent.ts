import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export function useSiteContent(page?: string) {
  return useQuery({
    queryKey: ["site-content", page],
    queryFn: async () => {
      let query = supabase.from("site_content").select("*");
      if (page) query = query.eq("page", page);
      const { data, error } = await query.order("section").order("key");
      if (error) throw error;
      return data as SiteContent[];
    },
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (content: Partial<SiteContent> & { id: string }) => {
      const { data, error } = await supabase
        .from("site_content")
        .update(content)
        .eq("id", content.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    },
  });
}

export function useCreateSiteContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (content: Omit<SiteContent, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("site_content")
        .insert(content)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    },
  });
}

export function useDeleteSiteContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("site_content").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    },
  });
}
