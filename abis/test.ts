import { avnu } from "./avnu";

interface NamedArguments {
  [key: string]: string | NamedArguments[];
}

/**
 * 根据智能合约的 ABI，将调用参数与参数名称对应。
 * @param abiItem - ABI 中的方法定义。
 * @param args - 调用参数数组。
 * @returns 对应的参数对象。
 */
function mapArgumentsToAbi(abiItem: any, args: string[]): NamedArguments {
  const result: NamedArguments = {};
  let argIndex = 0;

  abiItem.inputs.forEach((input: any) => {
    if (input.type.startsWith("core::array")) {
      // 如果是数组类型，解析数组参数
      const arrayLength = parseInt(args[argIndex], 16); // 数组长度
      argIndex += 1;

      const arrayItems: NamedArguments[] = [];
      for (let i = 0; i < arrayLength; i++) {
        const subArgs = args.slice(argIndex, argIndex + input.type.match(/Array::<([\w:]+)>/) ? 1 : 0);
        const subResult = mapArgumentsToAbi({ inputs: input.members || [] }, subArgs);
        arrayItems.push(subResult);
        argIndex += subArgs.length;
      }

      result[input.name] = arrayItems;
    } else {
      // 如果是简单参数，直接赋值
      result[input.name] = args[argIndex];
      argIndex += 1;
    }
  });

  return result;
}

// 示例：解析 multi_route_swap 方法参数
const abi = avnu.find((item) => item.name === "multi_route_swap"); // 从 ABI 中找到目标方法
const args = [
  "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  "0xb271fb0",
  "0x0",
  "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  "0xb2691d9",
  "0x0",
  "0xb23b713",
  "0x0",
  "0x3ecca170cf5e32c4cf7d4d471eae8e4bf7426dea535bd34df2230dfb7d4ed80",
  "0x0",
  "0x0",
  "0x1",
  "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
  "0xe8d4a51000",
  "0x6",
  "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  "0x14f8b588e368f1000000000000000",
  "0x14",
  "0x0",
  "0x278a5763000004d50aa730f8dc2",
];

if (abi) {
  const mappedArgs = mapArgumentsToAbi(abi, args);
  console.log("Mapped Arguments:", JSON.stringify(mappedArgs, null, 2));
}
