"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { Sidebar } from "@/components/layout/sidebar";
import {
  type Message,
  type Conversation,
  ApiResponse,
  StepsArr,
  Knowledge,
} from "@/lib/types";
import { useAccount } from "@starknet-react/core";
import { fetchGLM } from "@/lib/glm";

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "0",
      title: "Agent",
      lastMessage: "New conversation",
      timestamp: new Date(),
      messages: [
        {
          role: "brain",
          content: "I can help you send Transactions on starknet.",
          sender: "brain",
        },
      ],
    },
    {
      id: "1",
      title: "Ekubo",
      lastMessage: "New conversation",
      timestamp: new Date(),
      messages: [
        {
          role: "brain",
          content: "You can ask me any on-chain data about Ekubo.",
          sender: "brain",
        },
      ],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >("0");

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const { address } = useAccount();
  const [enableComfirmArray, setEnableComfirmArray] = useState<boolean[]>([
    false,
  ]);
  const [stepsArr, setStepsArr] = useState<StepsArr[]>([{ steps: [] }]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      sender: "user",
    };

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

    setEnableComfirmArray((prevArray) => [...prevArray, false]);
    setStepsArr((prevArray) => [...prevArray, { steps: [] }]);

    let newResponse: Message | undefined = undefined;
    if (activeConversationId === "1") {
      console.log("Ekubo active");
      newResponse = {
        role: "brain",
        content: await fetchGLM(content),
        sender: "brain",
      };

      console.log(newResponse.content);

      setEnableComfirmArray((prevArray) => [...prevArray, false]);
      setStepsArr((prevArray) => [...prevArray, { steps: [] }]);
    } else {
      newResponse = await brainFetch(content);
    }

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
    const API_KEY = process.env.NEXT_PUBLIC_BRAIN_API_KEY;
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

      const result: ApiResponse | Knowledge = await res.json();
      const brainHistroy = result.result[0].conversationHistory;

      // !res.ok 不是2XX
      if (!res.ok) {
        setEnableComfirmArray((prevArray) => [...prevArray, false]);
        setStepsArr((prevArray) => [...prevArray, { steps: [] }]);

        return {
          role: "brain",
          content: "Something goes wrong with Brain API.",
          sender: "brian",
        };
      } else {
        if (result.result[0].type === "knowledge") {
          setEnableComfirmArray((prevArray) => [...prevArray, false]);
          setStepsArr((prevArray) => [...prevArray, { steps: [] }]);

          return {
            role: "brain",
            sender: "brian",
            content: (result as Knowledge).result[0].answer,
          };
        } else {
          setEnableComfirmArray((prevArray) => [...prevArray, true]);
          setStepsArr((prevArray) => [
            ...prevArray,
            { steps: (result as ApiResponse).result[0].data.steps },
          ]);
        }
      }

      return brainHistroy[brainHistroy.length - 1];
    } catch (error) {
      console.error("Error:", error);
      setEnableComfirmArray((prevArray) => [...prevArray, false]);
      setStepsArr((prevArray) => [...prevArray, { steps: [] }]);

      return {
        role: "brain",
        content: "Something goes wrong with Brain API.",
        sender: "brian",
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
          <ChatMessages
            messages={activeConversation?.messages ?? []}
            enableComfirmArray={enableComfirmArray}
            stepsArr={stepsArr}
          />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}
