"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { Sidebar } from "@/components/layout/sidebar";
import { type Message, type Conversation } from "@/lib/types";

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: nanoid(),
      title: `Conversation ${conversations.length + 1}`,
      lastMessage: "New conversation",
      timestamp: new Date(),
      messages: [],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleSendMessage = (content: string) => {
    if (!activeConversationId) {
      createNewConversation();
      return;
    }

    const userMessage: Message = { role: "user", content: content.trim() };
    
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== activeConversationId) return conv;
        return {
          ...conv,
          messages: [...conv.messages, userMessage],
          lastMessage: content.trim(),
          timestamp: new Date(),
        };
      })
    );

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: "This is a simulated AI response. In a real application, this would be connected to an AI service.This is a simulated AI response. In a real application, this would be connected to an AI service.This is a simulated AI response. In a real application, this would be connected to an AI service.This is a simulated AI response. In a real application, this would be connected to an AI service.This is a simulated AI response. In a real application, this would be connected to an AI service.",
      };
      
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== activeConversationId) return conv;
          return {
            ...conv,
            messages: [...conv.messages, aiMessage],
            lastMessage: aiMessage.content,
            timestamp: new Date(),
          };
        })
      );
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewConversation={createNewConversation}
        onSelectConversation={setActiveConversationId}
      />
      <main className="flex-1 flex flex-col p-4">
        <div className="flex-1 mb-4">
          <ChatMessages messages={activeConversation?.messages ?? []} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}