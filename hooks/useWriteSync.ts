import { Step } from "@/lib/types";
import { processArguments } from "@/lib/utils";
import {
  useContract,
  useContractWrite,
  useProvider,
} from "@starknet-react/core";
import React, { useEffect, useState } from "react";
import { Abi, Contract } from "starknet";

interface useWriteSyncProps {
  steps: Step[];
  setAbis: React.Dispatch<React.SetStateAction<Abi[]>>;
}

export function useWriteSync({ steps, setAbis }: useWriteSyncProps) {
  const { provider } = useProvider();

  useEffect(() => {
    const _abis: Abi[] = [];
    const getABI = async () => {
      for (const step of steps) {
        // 使用 for...of 循环，避免异步问题
        console.log(`address: ${step.contractAddress}`);
        try {
          const fetchedAbi = await provider.getClassAt(step.contractAddress);
          if (fetchedAbi && fetchedAbi.abi) {
            _abis.push(fetchedAbi.abi);
          } else {
            console.warn(
              `ABI not found for contract address: ${step.contractAddress}`
            );
            break;
          }
        } catch (innerError) {
          console.error(
            `Error fetching ABI for ${step.contractAddress}:`,
            innerError
          );
          // 可以选择在这里抛出错误，或者继续处理其他 step
        }
      }
    };

    getABI();
    setAbis(_abis);
  }, steps);
}