import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceContent {
  id: string;
  service_type: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  features: string[];
  icon: string | null;
  color: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export function useServicesContent() {
  return useQuery({
    queryKey: ["services-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services_content")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as ServiceContent[];
    },
  });
}

export function useServiceByType(serviceType: string) {
  return useQuery({
    queryKey: ["services-content", serviceType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services_content")
        .select("*")
        .eq("service_type", serviceType)
        .maybeSingle();
      if (error) throw error;
      return data as ServiceContent | null;
    },
  });
}

export function useUpdateServiceContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (service: Partial<ServiceContent> & { id: string }) => {
      const { data, error } = await supabase
        .from("services_content")
        .update(service)
        .eq("id", service.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services-content"] });
    },
  });
}

export function useCreateServiceContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (service: Omit<ServiceContent, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("services_content")
        .insert(service)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services-content"] });
    },
  });
}

export function useDeleteServiceContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services_content").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services-content"] });
    },
  });
}
