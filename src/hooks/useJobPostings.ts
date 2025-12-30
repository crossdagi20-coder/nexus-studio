import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
  requirements: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useJobPostings() {
  return useQuery({
    queryKey: ["job-postings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as JobPosting[];
    },
  });
}

export function useUpdateJobPosting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (job: Partial<JobPosting> & { id: string }) => {
      const { data, error } = await supabase
        .from("job_postings")
        .update(job)
        .eq("id", job.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-postings"] });
    },
  });
}

export function useCreateJobPosting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (job: Omit<JobPosting, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("job_postings")
        .insert(job)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-postings"] });
    },
  });
}

export function useDeleteJobPosting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_postings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-postings"] });
    },
  });
}
