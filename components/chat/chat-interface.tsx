"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { Sidebar } from "@/components/layout/sidebar";
import { type Message, type Conversation, ApiResponse } from "@/lib/types";
import { useAccount } from "@starknet-react/core";

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: nanoid(),
      title: "Agent",
      lastMessage: "New conversation",
      timestamp: new Date(),
      messages: [
        {
          role: "brain",
          content: "I can help you send Transactions on starknet.",
        },
      ],
    },
    {
      id: nanoid(),
      title: "Ekubo",
      lastMessage: "New conversation",
      timestamp: new Date(),
      messages: [
        {
          role: "brain",
          content: "You can ask me any on-chain data about Ekubo.",
        },
      ],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const { address } = useAccount();
  const [enableComfirmArray, setEnableComfirmArray] = useState<boolean[]>([false]);
  // const [newResponse, setNewResponse] = useState<Message>();

  // const createNewConversation = () => {
  //   const newConversation: Conversation = {
  //     id: nanoid(),
  //     title: `Conversation ${conversations.length + 1}`,
  //     lastMessage: "New conversation",
  //     timestamp: new Date(),
  //     messages: [],
  //   };

  //   setConversations((prev) => [newConversation, ...prev]);
  //   setActiveConversationId(newConversation.id);
  // };

  const handleSendMessage = async (content: string) => {
    // if (!activeConversationId) {
    //   createNewConversation();
    //   return;
    // }

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

    setEnableComfirmArray(prevArray => [...prevArray, false]);

    const newResponse = await brainFetch(content);

    if (newResponse) {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== activeConversationId) return conv;
          return {
            ...conv,
            messages: [...conv.messages, newResponse],
            lastMessage: newResponse.content,
            timestamp: new Date(),
          };
        })
      );
    }
  };

  async function brainFetch(content: string): Promise<Message> {
    const API_URL = "https://api.brianknows.org/api/v0/agent";
    const API_KEY = "brian_ojVMQC3S7BqF7aXo2";
    const history = conversations[0].messages;
    history.shift();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-brian-api-key": API_KEY || "",
        },
        body: JSON.stringify({
          prompt: content,
          address: address,
          messages: history,
        }),
      });

      const result: ApiResponse = await res.json();
      const brainHistroy = result.result[0].conversationHistory;

      if (!res.ok) {
        setEnableComfirmArray(prevArray => [...prevArray, false]);
      } else {
        if (result.result[0].type === "knowledge") {
          setEnableComfirmArray(prevArray => [...prevArray, false]);
        } else {
          setEnableComfirmArray(prevArray => [...prevArray, true]);
        }
      }

      return brainHistroy[brainHistroy.length - 1];
    } catch (error) {
      console.error("Error:", error);
      setEnableComfirmArray(prevArray => [...prevArray, false]);

      return {
        role: "brain",
        content: "Something goes wrong with Brain API.",
      };
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewConversation={() => {}}
        onSelectConversation={setActiveConversationId}
      />
      <main className="flex-1 flex flex-col p-4">
        <div className="flex-1 mb-4">
          <ChatMessages messages={activeConversation?.messages ?? []} enableComfirmArray={enableComfirmArray}/>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}
