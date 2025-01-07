"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { type Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="space-y-1">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2", // 添加 flex 和 items-center
              "hover:bg-accent hover:text-accent-foreground",
              activeId === conversation.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <MessageSquare />
            <div className="text-sm font-medium truncate">
              {conversation.title}
            </div>
            {/* <div className="text-xs truncate opacity-70">{conversation.lastMessage}</div> */}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
