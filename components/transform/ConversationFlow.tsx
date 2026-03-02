"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box, Typography, TextField, Button, LinearProgress, IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from "@mui/icons-material/Send";
import { useConversationTurn } from "@/hooks/useConversation";
import { ChatMessage, ConversationTurn } from "@/types";

const MotionBox = motion(Box);
const TOTAL_QUESTIONS = 5;

interface Props {
  idea: string;
  onComplete: (conversation: ConversationTurn[]) => void;
  onError: (msg: string) => void;
}

export default function ConversationFlow({ idea, onComplete, onError }: Props) {
  const [apiMessages, setApiMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [completedTurns, setCompletedTurns] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [hasError, setHasError] = useState(false);

  const qaAccumulator = useRef<ConversationTurn[]>([]);
  const pendingQuestion = useRef<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasFired = useRef(false);
  // Snapshot of apiMessages at the time we fire — used for retry
  const lastFiredMessages = useRef<Array<{ role: "user" | "assistant"; content: string }>>([]);

  const { mutate } = useConversationTurn();

  const scrollToBottom = () =>
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);

  const fireTurn = (messages: Array<{ role: "user" | "assistant"; content: string }>) => {
    lastFiredMessages.current = messages;
    setIsThinking(true);
    setHasError(false);

    mutate({
      idea,
      messages,
      onSuccess: (result) => {
        setIsThinking(false);

        const aiContent = result.content;

        if (aiContent.includes("DISCOVERY_COMPLETE")) {
          onComplete(qaAccumulator.current);
          return;
        }

        pendingQuestion.current = aiContent;

        setChatMessages((prev) => [
          ...prev,
          { role: "ai", content: aiContent, type: "question" },
        ]);

        scrollToBottom();
        setTimeout(() => inputRef.current?.focus(), 150);
      },
      onError: () => {
        setIsThinking(false);
        setHasError(true);
      },
    });
  };

  // Fire first turn on mount (strict-mode safe)
  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    fireTurn([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserAnswer = () => {
    const answer = userInput.trim();
    if (!answer || isThinking) return;

    setChatMessages((prev) => [...prev, { role: "user", content: answer }]);
    setUserInput("");

    qaAccumulator.current.push({ question: pendingQuestion.current, answer });

    const newMessages: Array<{ role: "user" | "assistant"; content: string }> = [
      ...apiMessages,
      { role: "assistant", content: pendingQuestion.current },
      { role: "user", content: answer },
    ];
    setApiMessages(newMessages);
    setCompletedTurns((t) => t + 1);
    scrollToBottom();

    fireTurn(newMessages);
  };

  const handleRetry = () => {
    fireTurn(lastFiredMessages.current);
  };

  const progressPct = Math.min((completedTurns / TOTAL_QUESTIONS) * 100, 100);
  const canSend = userInput.trim().length > 0 && !isThinking && chatMessages.length > 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>

      {/* Progress bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 700, letterSpacing: "0.06em", fontSize: "0.68rem" }}>
            AI DISCOVERY
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.68rem" }}>
            {completedTurns} of {TOTAL_QUESTIONS} answered
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressPct}
          sx={{
            height: 4, borderRadius: 2,
            backgroundColor: "rgba(139,92,246,0.1)",
            "& .MuiLinearProgress-bar": {
              background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
              borderRadius: 2,
              transition: "transform 0.6s ease",
            },
          }}
        />
      </Box>

      {/* Chat area */}
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 3,
        overflowY: "auto",
        maxHeight: { xs: 320, sm: 420 },
        pr: 0.5,
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": { background: "rgba(139,92,246,0.25)", borderRadius: 2 },
      }}>
        <AnimatePresence initial={false}>
          {chatMessages.map((msg, i) => (
            <MotionBox
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              sx={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              {msg.role === "ai" && (
                <Box sx={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0, mt: 0.25,
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 12px rgba(139,92,246,0.35)",
                }}>
                  <AutoAwesomeIcon sx={{ fontSize: 14, color: "#fff" }} />
                </Box>
              )}
              <Box sx={{
                maxWidth: "78%",
                px: 2, py: 1.5,
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                  : "rgba(13,22,40,0.9)",
                border: msg.role === "ai" ? "1px solid rgba(139,92,246,0.2)" : "none",
                boxShadow: msg.role === "user"
                  ? "0 2px 16px rgba(139,92,246,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.2)",
              }}>
                <Typography variant="body2" sx={{ lineHeight: 1.65, fontSize: "0.9rem" }}>
                  {msg.content}
                </Typography>
              </Box>
            </MotionBox>
          ))}
        </AnimatePresence>

        {/* Typing dots */}
        <AnimatePresence>
          {isThinking && (
            <MotionBox
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box sx={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 12px rgba(139,92,246,0.35)",
              }}>
                <AutoAwesomeIcon sx={{ fontSize: 14, color: "#fff" }} />
              </Box>
              <Box sx={{
                px: 2, py: 1.25,
                borderRadius: "4px 18px 18px 18px",
                background: "rgba(13,22,40,0.9)",
                border: "1px solid rgba(139,92,246,0.2)",
                display: "flex", gap: 0.75, alignItems: "center",
              }}>
                {[0, 1, 2].map((i) => (
                  <MotionBox
                    key={i}
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                    sx={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6" }}
                  />
                ))}
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Error / Retry */}
        <AnimatePresence>
          {hasError && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 5 }}
            >
              <Typography variant="caption" color="error.main" sx={{ fontSize: "0.75rem" }}>
                Connection error.
              </Typography>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleRetry}
                sx={{ fontSize: "0.7rem", py: 0.25, px: 1.5, borderRadius: 2, minWidth: 0 }}
              >
                Retry
              </Button>
            </MotionBox>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </Box>

      {/* Input row */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-end" }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.slice(0, 600))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleUserAnswer();
            }
          }}
          placeholder="Type your answer… (Enter to send, Shift+Enter for new line)"
          disabled={isThinking || chatMessages.length === 0}
          inputRef={inputRef}
          sx={{
            "& .MuiInputBase-root": {
              background: "rgba(13,22,40,0.8)",
              borderRadius: 2,
              fontSize: "0.9rem",
              lineHeight: 1.65,
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(148,163,184,0.4)",
              fontSize: "0.85rem",
            },
          }}
        />
        <IconButton
          onClick={handleUserAnswer}
          disabled={!canSend}
          sx={{
            width: 48, height: 48, flexShrink: 0, borderRadius: 2,
            background: canSend
              ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
              : "rgba(139,92,246,0.12)",
            color: canSend ? "#fff" : "rgba(139,92,246,0.4)",
            boxShadow: canSend ? "0 0 16px rgba(139,92,246,0.4)" : "none",
            transition: "all 0.2s",
            "&:hover": { background: canSend ? "linear-gradient(135deg, #a78bfa, #7c3aed)" : undefined },
            "&:disabled": { background: "rgba(139,92,246,0.08)", color: "rgba(139,92,246,0.25)" },
          }}
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {userInput.length > 500 && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 0.75, fontSize: "0.68rem", textAlign: "right" }}>
          {userInput.length}/600
        </Typography>
      )}
    </Box>
  );
}
