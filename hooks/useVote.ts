"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation<{ voted: boolean }, Error, string>({
    mutationFn: async (ideaId: string) => {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId }),
      });
      if (!res.ok) throw new Error("Failed to vote");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      queryClient.invalidateQueries({ queryKey: ["idea"] });
    },
  });
}
