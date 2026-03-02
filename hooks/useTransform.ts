"use client";

import { useMutation } from "@tanstack/react-query";
import { Blueprint, ConversationTurn } from "@/types";
import { API_BASE, authHeaders } from "@/lib/fetchWithAuth";

interface TransformResult {
  blueprint: Blueprint;
  isMock: boolean;
}

export interface TransformPayload {
  idea: string;
  conversation?: ConversationTurn[];
}

export function useTransform() {
  return useMutation<TransformResult, Error, TransformPayload>({
    mutationFn: async ({ idea, conversation }) => {
      const res = await fetch(API_BASE + "/api/transform", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ idea, conversation }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Transform failed");
      }
      return res.json();
    },
  });
}
