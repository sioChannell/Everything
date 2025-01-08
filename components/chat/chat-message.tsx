"use client";

import { type Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, Copy } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  enableComfirm: boolean;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  
  if (isUser) {
    return (
      <div className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white font-semibold">U</span>
        </div>
        <div className="flex-1">
          <div className="text-base text-white font-medium">{message.content}</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <Copy className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-900">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-white font-semibold">A</span>
        </div>
        <div className="flex-1">
          <div className="text-base text-white font-medium">{message.content}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-[52px]">
        <button>Confirm</button>
        <button className="p-2 hover:bg-gray-800 rounded-lg">
          <ThumbsUp className="h-4 w-4 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg">
          <ThumbsDown className="h-4 w-4 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg">
          <Copy className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}