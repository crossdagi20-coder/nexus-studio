import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TeamMemberPublic {
  id: string;
  name: string;
  role: string;
  expertise: string | null;
  bio: string | null;
  avatar_url: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export function useTeamPublic() {
  return useQuery({
    queryKey: ["team-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members_public")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as TeamMemberPublic[];
    },
  });
}

export function useUpdateTeamMemberPublic() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (member: Partial<TeamMemberPublic> & { id: string }) => {
      const { data, error } = await supabase
        .from("team_members_public")
        .update(member)
        .eq("id", member.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-public"] });
    },
  });
}

export function useCreateTeamMemberPublic() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (member: Omit<TeamMemberPublic, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("team_members_public")
        .insert(member)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-public"] });
    },
  });
}

export function useDeleteTeamMemberPublic() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members_public").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-public"] });
    },
  });
}
