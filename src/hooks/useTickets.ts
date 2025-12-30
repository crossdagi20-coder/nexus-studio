import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { useAuth } from "@/contexts/AuthContext";

export type Ticket = Tables<"tickets">;
export type TicketInsert = TablesInsert<"tickets">;
export type TicketUpdate = TablesUpdate<"tickets">;

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select("*, clients(company_name), projects(name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useTicket(id: string | undefined) {
  return useQuery({
    queryKey: ["tickets", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("tickets")
        .select("*, clients(company_name), projects(name), ticket_messages(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (ticket: Omit<TicketInsert, "created_by" | "ticket_number">) => {
      if (!user) throw new Error("User not authenticated");

      const ticketNumber = `TKT-${Date.now().toString(36).toUpperCase()}`;

      const { data, error } = await supabase
        .from("tickets")
        .insert({
          ...ticket,
          created_by: user.id,
          ticket_number: ticketNumber,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Ticket;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: TicketUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("tickets")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Ticket;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}
