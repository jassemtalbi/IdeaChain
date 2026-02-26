"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Idea } from "@/types";
import { API_BASE, authHeaders } from "@/lib/fetchWithAuth";

export function useIdeas(sort: string = "latest") {
  return useQuery<{ ideas: Idea[]; total: number }>({
    queryKey: ["ideas", sort],
    queryFn: async () => {
      const res = await fetch(API_BASE + "/api/ideas?sort=" + sort, { headers: authHeaders() });
      if (!res.ok) throw new Error("Failed to fetch ideas");
      return res.json();
    },
  });
}

export function useIdea(id: string) {
  return useQuery<Idea>({
    queryKey: ["idea", id],
    queryFn: async () => {
      const res = await fetch(API_BASE + "/api/ideas/" + id, { headers: authHeaders() });
      if (!res.ok) throw new Error("Idea not found");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useSaveIdea() {
  const queryClient = useQueryClient();
  return useMutation<{ id: string }, Error, Partial<Idea>>({
    mutationFn: async (idea) => {
      const res = await fetch(API_BASE + "/api/ideas", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(idea),
      });
      if (!res.ok) throw new Error("Failed to save idea");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}
