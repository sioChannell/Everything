export interface Message {
  role: "user" | "brain";
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

export type ConversationId = string;

interface Protocol {
  key: string;
  name: string;
  logoURI: string;
}

interface Token {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
}

export interface Step {
  contractAddress: string;
  entrypoint: string;
  calldata: string[];
}

interface ExtractedParams {
  action: string;
  chain: string;
  token1: string;
  token2: string;
  address: string;
  amount: string;
}

interface Data {
  description: string;
  steps: Step[];
  gasCostUSD: string;
  fromChainId: number;
  fromAmountUSD: number;
  fromAmount: string;
  fromToken: Token;
  fromAddress: string;
  toChainId: number;
  toAmountUSD: number;
  toAmount: string;
  toAmountMin: string;
  toToken: Token;
  toAddress: string;
  receiver: string;
  protocol: Protocol;
}

interface ResultItem {
  solver: string;
  action: string;
  type: string;
  data: Data;
  extractedParams: ExtractedParams;
  conversationHistory: Message[];
}

export interface ApiResponse {
  result: ResultItem[];
}
