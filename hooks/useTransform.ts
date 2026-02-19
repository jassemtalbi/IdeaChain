"use client";

import { useMutation } from "@tanstack/react-query";
import { Blueprint } from "@/types";

interface TransformResult {
  blueprint: Blueprint;
  isMock: boolean;
}

export function useTransform() {
  return useMutation<TransformResult, Error, string>({
    mutationFn: async (rawIdea: string) => {
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawIdea }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Transform failed");
      }

      return res.json();
    },
  });
}
