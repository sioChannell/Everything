import { format } from "./format";
import { promptForAPI, promptForSumary } from "./prompt";

function findByName(functionName: string): any {
  const paths = format.paths as { [key: string]: any };
  const keys = Object.keys(paths);
  for (const key of keys) {
    if (key === functionName) {
      let result = paths[key];
      result.path = functionName;
      return result;
    }
  }
}

// system: 这是一条系统消息，通常用于设置助手的行为或角色。
// 它在对话的开始时发送，用于告知助手它的身份
interface ChatCompletionRequestMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface governanceResponse {
  [key: string]: any[];
}

interface ChatCompletionRequest {
  model: string; // 模型名称，例如 "glm-4-plus"
  messages: ChatCompletionRequestMessage[];
  temperature?: number; // 控制生成文本的随机性 (0-1)
  top_p?: number; // 另一种控制随机性的方法
  n?: number; // 生成多少个回复
  stream?: boolean; // 是否使用流式传输
  max_tokens?: number; // 限制生成token数量
  // ... 其他可选参数
}

interface ChatCompletionResponseChoice {
  message: ChatCompletionRequestMessage;
  finish_reason: string | null;
  index: number;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatCompletionResponseChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const API_KEY = process.env.NEXT_PUBLIC_MODEL_API_KEY; // 替换成你的实际 API 密钥
const API_URL = process.env.NEXT_PUBLIC_MODEL_API_URL || "";
const MODEL_NAME = process.env.NEXT_PUBLIC_MODEL_NAME || "";

async function callGLM4Plus(
  messages: ChatCompletionRequestMessage[]
): Promise<ChatCompletionResponse | null> {
  const requestBody: ChatCompletionRequest = {
    model: MODEL_NAME, // 指定模型
    messages: messages,
    temperature: 0.7, // 可选参数
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`, // 注意Bearer
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // 详细错误处理
      const errorText = await response.text();
      console.error(
        `API request failed with status ${response.status}: ${errorText}`
      );
      return null;
    }

    const data: ChatCompletionResponse = await response.json() as ChatCompletionResponse;
    return data;
  } catch (error) {
    console.error("Error calling API:", error);
    return null;
  }
}

async function fetchEkuboAPI(path: string): Promise<any> {
  try {
    const response = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // 详细错误处理
      const errorText = await response.text();
      console.error(
        `API request failed with status ${response.status}: ${errorText}`
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling API:", error);
    return null;
  }
}

// 只取前5个数据
function filter(input: governanceResponse): governanceResponse {
  const keys = Object.keys(input);
  const firstKey = keys[0];
  if (input[firstKey].length <= 5) {
    return input;
  }

  let result: any[] = [];
  for (let i = 0; i < 5; i++) {
    result.push(input[firstKey][i]);
  }

  input[firstKey] = result;

  return input;
}

// 使用示例：
export async function fetchGLM(content: string): Promise<string> {
  const question = content;

  // 构建消息数组的基础结构
  const messages: ChatCompletionRequestMessage[] = [
    { role: "user", content: JSON.stringify(format) },
    { role: "user", content: promptForAPI + question },
  ];

  // 调用 API 获取初步结果
  let result = await callGLM4Plus(messages);

  if (!result || !result.choices || result.choices.length === 0) {
    console.log("API call failed.");
    return "API call failed.";
  }

  // 获取初步响应内容
  let response = result.choices[0].message.content;
  console.log("Response Message:", response);

  // 判断初步响应是否有效
  if (response === "ERROR" || !response.includes("/")) {
    return "不好意思，该问题与Ekubo链上数据无关，无法给出答案";
  } else if (response.charAt(0) !== "/") {
    response = "/" + response; // 确保响应以 "/" 开头
  }

  // 更新消息以查找 Ekubo 数据
  const ekuboURL = "https://mainnet-api.ekubo.org" + response;
  const ekuboAPIResponse: governanceResponse = await fetchEkuboAPI(ekuboURL);

  // 过滤 Ekubo API 响应
  const finalResult = filter(ekuboAPIResponse);
  console.log(finalResult);

  // 使用过滤后的结果生成新的消息，并重新调用 API 获取最终答案
  messages[0] = { role: "user", content: JSON.stringify(findByName(response)) };
  messages.push({
    role: "user",
    content: promptForSumary + JSON.stringify(finalResult),
  });

  result = await callGLM4Plus(messages);
  if (result && result.choices && result.choices.length > 0) {
    return result.choices[0].message.content; // 返回最终的回答
  } else {
    return "API call failed.";
  }
}
