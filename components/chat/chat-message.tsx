"use client";

import { useWriteSync } from "@/hooks/useWriteSync";
import { Step, type Message } from "@/lib/types";
import { cn, processArguments } from "@/lib/utils";
import { Button } from "@radix-ui/themes";
import { useContract, useContractWrite } from "@starknet-react/core";
import { ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Abi } from "starknet";

interface ChatMessageProps {
  message: Message;
  enableComfirm: boolean;
  steps: Step[];
}

export function ChatMessage({
  message,
  enableComfirm,
  steps,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const calls = useWriteSync({ steps, currentStepIndex });
  const { writeAsync } = useContractWrite({ calls });

  // useEffect(() => {
  //   if(currentStepIndex===0){
  //     return;
  //   }
  // }, [currentStepIndex]);

  if (isUser) {
    return (
      <div className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white font-semibold">U</span>
        </div>
        <div className="flex-1">
          <div className="text-base text-white font-medium">
            {message.content}
          </div>
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
          <div className="text-base text-white font-medium">
            {message.content}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-[52px]">
        {enableComfirm && !calls && <span>Loading...</span>}
        {enableComfirm && (
          <Button
            color="indigo"
            variant="soft"
            onClick={async () => {
              try {
                await writeAsync();
                if (currentStepIndex !== steps.length - 1) {
                  setCurrentStepIndex(currentStepIndex + 1);
                }
              } catch (error) {
                console.error("Error writing contract:", error);
              }
            }}
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
}
