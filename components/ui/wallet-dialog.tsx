"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useConnect } from "@starknet-react/core";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Connect a Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {/* <div className="text-sm font-semibold text-gray-400 mb-4">Popular</div> */}
          {connectors.map((connector) => (
            <Button
              key={connector.name}
              variant="ghost"
              className="w-full justify-start h-14 px-4 hover:bg-gray-800"
              onClick={() => {
                connect({ connector });
                onOpenChange(false);
              }}
            >
              <div className="h-8 w-8 rounded-full mr-3 bg-gray-800 flex items-center justify-center">
                <Image
                  src={
                    connector.name === "braavos" || connector.name === "Braavos"
                      ? "/braavos.png"
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
                  {connector.name === "braavos" || connector.name === "Braavos"
                    ? "Braavos"
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
