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
  currentStepIndex: number;
}

export function useWriteSync({ steps, currentStepIndex }: useWriteSyncProps) {
  const { provider } = useProvider();
  const [abis, setAbis] = useState<Abi[]>([]);

  useEffect(() => {
    const fetchAbis = async () => {
      try {
        const fetchedAbis = await Promise.all(
          steps.map(async (step) => {
            const fetchedAbi = await provider.getClassAt(step.contractAddress);
            if (fetchedAbi && fetchedAbi.abi) {
              return fetchedAbi.abi;
            } else {
              console.warn(
                `ABI not found for contract address: ${step.contractAddress}`
              );
              return null; // 或者抛出错误，取决于你的需求
            }
          })
        );
        setAbis(fetchedAbis.filter((abi) => abi !== null) as Abi[]);
      } catch (fetchError) {
        console.error("Error fetching ABIs:", fetchError);
      } finally {
      }
    };

    if (provider && steps.length > 0) {
      fetchAbis();
    } else {
      setAbis([]); // 清空abis，如果steps为空
    }
  }, [provider, steps]);

  const currentStep = steps ? steps[currentStepIndex] : undefined;

  const { contract } = useContract({
    abi: abis[currentStepIndex],
    address: currentStep?.contractAddress,
  });

  const args =
    currentStep && abis[currentStepIndex]
      ? processArguments(
          currentStep.calldata,
          currentStep.entrypoint,
          abis[currentStepIndex]
        )
      : [];

  const calls =
    contract?.populateTransaction?.[steps[currentStepIndex]?.entrypoint]?.(
      ...args
    ) ?? [];

  return calls;
}
