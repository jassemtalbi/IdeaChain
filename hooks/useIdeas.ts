"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Idea } from "@/types";

export function useIdeas(sort: string = "recent") {
  return useQuery<Idea[]>({
    queryKey: ["ideas", sort],
    queryFn: async () => {
      const res = await fetch(`/api/ideas?sort=${sort}`);
      if (!res.ok) throw new Error("Failed to fetch ideas");
      return res.json();
    },
  });
}

export function useIdea(id: string) {
  return useQuery<Idea>({
    queryKey: ["idea", id],
    queryFn: async () => {
      const res = await fetch(`/api/ideas/${id}`);
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
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
