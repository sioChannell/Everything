"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Step, StepsArr, type Message } from "@/lib/types";
import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  messages: Message[];
  enableComfirmArray: boolean[];
  stepsArr: StepsArr[];
}

export function ChatMessages({
  messages,
  enableComfirmArray,
  stepsArr,
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1">
      <div className="divide-y divide-gray-800">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            Start a conversation by typing a message below.
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                enableComfirm={enableComfirmArray[index]}
                steps={stepsArr[index].steps}
              />
            ))}
            <div ref={scrollRef} />
          </>
        )}
      </div>
    </ScrollArea>
  );
}
