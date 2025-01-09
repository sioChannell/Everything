"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useAccount } from "@starknet-react/core";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");
  const { address } = useAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
      <div className="flex gap-4 items-center bg-gray-900 rounded-lg p-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={address?"Type your message...":"Please connect to your wallet first"}
          className="flex-1 bg-transparent border-0 focus:ring-0 resize-none text-white placeholder-gray-400 text-base min-h-[40px] max-h-[120px] py-2 px-3"
          disabled={!address}
        />
        <button
          type="submit"
          className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
