"use client";

import { useMutation } from "@tanstack/react-query";
import { API_BASE, authHeaders } from "@/lib/fetchWithAuth";
import { ConversationResponse } from "@/types";

export interface ConversationTurnPayload {
  idea: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  onSuccess: (data: ConversationResponse) => void;
  onError: () => void;
}

export function useConversationTurn() {
  return useMutation<
    ConversationResponse,
    Error,
    ConversationTurnPayload
  >({
    mutationFn: async ({ idea, messages }) => {
      const res = await fetch(API_BASE + "/api/conversation", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ idea, messages }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Conversation failed");
      }
      return res.json();
    },
    onSuccess: (data, variables) => {
      variables.onSuccess(data);
    },
    onError: (_err, variables) => {
      variables.onError();
    },
  });
}
