"use client";

import { Settings, HelpCircle, Activity, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversationList } from "./conversation-list";
import { type Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
}



const bottomNavItems = [
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help", href: "#" },
  { icon: Activity, label: "Activity Log", href: "#" },
];

export function Sidebar({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
}: SidebarProps) {
  return (
    <div className="w-64 bg-card h-screen border-r border-border flex flex-col">
      <div className="p-4">
        <Button
          onClick={onNewConversation}
          className="w-full justify-center"
          variant="secondary"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Connect
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col px-2">
        <div className="text-xs font-semibold text-muted-foreground px-3 py-2">
          Recent Conversations
        </div>
        <ConversationList
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={onSelectConversation}
        />
      </div>

      <div className="p-4 border-t border-border">
        <nav className="space-y-1">
          {bottomNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
                "text-muted-foreground text-sm"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}