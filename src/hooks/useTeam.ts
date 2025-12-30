import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type TeamMember = Tables<"team_members">;
export type TeamMemberInsert = TablesInsert<"team_members">;
export type TeamMemberUpdate = TablesUpdate<"team_members">;

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*, profiles(full_name, avatar_url, email:user_id)")
        .order("job_title", { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

export function useTeamMember(id: string | undefined) {
  return useQuery({
    queryKey: ["team_members", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("team_members")
        .select("*, profiles(full_name, avatar_url)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (member: TeamMemberInsert) => {
      const { data, error } = await supabase
        .from("team_members")
        .insert(member)
        .select()
        .single();

      if (error) throw error;
      return data as TeamMember;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: TeamMemberUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("team_members")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as TeamMember;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
    },
  });
}
