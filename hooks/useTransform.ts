"use client";

import { useMutation } from "@tanstack/react-query";
import { Blueprint } from "@/types";
import { API_BASE, authHeaders } from "@/lib/fetchWithAuth";

interface TransformResult {
  blueprint: Blueprint;
  isMock: boolean;
}

export function useTransform() {
  return useMutation<TransformResult, Error, string>({
    mutationFn: async (rawIdea: string) => {
      const res = await fetch(API_BASE + "/api/transform", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ idea: rawIdea }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Transform failed");
      }
      return res.json();
    },
  });
}
