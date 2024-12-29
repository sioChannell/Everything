"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Message } from "@/lib/types";
import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-4 pb-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground pt-8">
            Start a conversation by typing a message below.
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={scrollRef} />
          </>
        )}
      </div>
    </ScrollArea>
  );
}