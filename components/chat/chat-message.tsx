"use client";

import { useWriteSync } from "@/hooks/useWriteSync";
import { Step, type Message } from "@/lib/types";
import { cn, processArguments } from "@/lib/utils";
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
  const [abis, setAbis] = useState<Abi[]>([]);
  useWriteSync({ steps, setAbis });

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const currentStep = steps ? steps[currentStepIndex] : undefined;
  const { contract } = useContract({
    abi: abis[currentStepIndex],
    address: currentStep?.contractAddress,
  });
  const args = currentStep
    ? processArguments(
        currentStep.calldata,
        currentStep.entrypoint,
        abis[currentStepIndex]
      )
    : [];
  const calls = contract?.populateTransaction[
    steps[currentStepIndex].entrypoint
  ]!(...args);
  const { writeAsync } = useContractWrite({ calls });

  useEffect(() => {
    console.log("abis 发生了变化：", abis); // 在 abis 变化后执行
    console.log(contract);
    console.log(args);
    console.log(calls);
    // 在这里执行依赖于 abis 的操作
  }, [abis]); // 依赖于 abis
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
          <div className="text-base text-white font-medium">
            {message.content}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-[52px]">
        {enableComfirm && !calls && <span>Loading...</span>}
        {enableComfirm && (
          <button
            onClick={async () => {
              try {
                const result = await writeAsync();
              } catch (error) {
                console.error("Error writing contract:", error);
              }
            }}
          >
            Confirm
          </button>
        )}
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
