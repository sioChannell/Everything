"use client";
import { ReactNode } from "react";

import { sepolia, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  reddioProvider,
  jsonRpcProvider
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: ReactNode }) {
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random",
  });
  
  const apiKey = "https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/td5sFSDvhzLCspnpu2G8raJKs7daVavr";

  return (
    <StarknetConfig
      chains={[mainnet]}
      // provider={reddioProvider({ apiKey })}
      provider={jsonRpcProvider({
        rpc: ()=>{
          return {nodeUrl: apiKey}
        }
      })}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
