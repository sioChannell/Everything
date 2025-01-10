"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useConnect, useAccount } from "@starknet-react/core";
import { connect as getStarknetConnect } from "get-starknet";
import { mainnet } from "@starknet-react/chains";
import { constants } from "starknet";

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const wallets = [
  {
    name: "MetaMask",
    icon: "/metamask.png",
    subtitle: "Recent",
  },
  {
    name: "Rainbow",
    icon: "/rainbow.png",
    subtitle: "",
  },
  {
    name: "Coinbase Wallet",
    icon: "/coinbase.png",
    subtitle: "",
  },
  {
    name: "WalletConnect",
    icon: "/walletconnect.png",
    subtitle: "",
  },
];

export function WalletDialog({ open, onOpenChange }: WalletDialogProps) {
  const { connect, connectors } = useConnect();
  const { account } = useAccount();

  const switchNetwork = async () => {
    const wallet = await getStarknetConnect();
    // chainId 例如 "SN_MAIN" 或 "SN_GOERLI"
    if (wallet?.isConnected) {
      const targetChainId = constants.StarknetChainId.SN_MAIN;
      window.alert("success");

      try {
        // 请求切换链
        await wallet.request({
          type: "wallet_switchStarknetChain",
          params: { chainId: targetChainId },
        });
        console.log(`成功切换到链ID: ${targetChainId}`);
      } catch (error) {
        console.error("切换链失败:", error);
      }
    } else {
      console.error("钱包未连接");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Connect a Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {connectors.map((connector) => (
            <Button
              key={connector.name}
              variant="ghost"
              className="w-full justify-start h-14 px-4 hover:bg-gray-800"
              onClick={async () => {
                connect({ connector });
                await switchNetwork();
                onOpenChange(false);
              }}
            >
              <div className="h-8 w-8 rounded-full mr-3 bg-gray-800 flex items-center justify-center">
                <Image
                  src={
                    connector.name.toLocaleLowerCase() === "braavos"
                      ? "/braavos.png"
                      : connector.name.toLocaleLowerCase() === "metamask"
                      ? "/metamask.png"
                      : "/argent.png"
                  }
                  alt={connector.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl text-white">
                  {connector.name.toLocaleLowerCase() === "braavos"
                    ? "Braavos"
                    : connector.name.toLocaleLowerCase() === "metamask"
                    ? "MetaMask"
                    : "Argent X"}
                </span>
                {/* {wallet.subtitle && (
                  <span className="text-xs text-blue-400">{wallet.subtitle}</span>
                )} */}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
