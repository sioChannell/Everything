import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { cairo } from "starknet";
import { Abi } from "starknet";

/**
 * 递归检查数组及其嵌套数组中是否存在 name 属性等于 functionName 的对象
 * @param array - JSON 对象数组
 * @param functionName - 要匹配的 name 属性值
 * @returns - 匹配的对象或 undefined
 */
function findByName(array: Abi, functionName: string): any | undefined {
  for (const item of array) {
    if (item.name == functionName) {
      console.log("success");
      return item;
    }

    const keys = Object.keys(item);
    for (const key of keys) {
      if (Array.isArray(item[key])) {
        const result = findByName(item[key], functionName);
        if (result) {
          return result;
        }
      }
    }
  }
  return undefined;
}

export function processArguments(
  arr: string[],
  functionName: string,
  abi: Abi
): any[] {
  if(!abi){
    return [];
  }
  const targetFunction = findByName(abi, functionName);

  if (!targetFunction) {
    console.error(`Function "${functionName}" not found in ABI.`);
    return [];
  }

  while (arr.length !== targetFunction.inputs.length) {
    console.log(
      `Incorrect number of arguments for function "${functionName}". Expected ${targetFunction.inputs.length}, but got ${arr.length}.`
    );

    arr.pop();
  }

  console.log(targetFunction);
  const processedArgs: any[] = [];

  for (let i = 0; i < arr.length; i++) {
    const arg = arr[i];
    const inputType = targetFunction.inputs[i].type;

    if (inputType === "core::integer::u256") {
      try {
        const uint = cairo.uint256(arg);
        processedArgs.push(uint);
      } catch (error) {
        console.error(`Invalid u256 value: ${arg}`, error);
        return [];
      }
    } else {
      processedArgs.push(arg);
    }
  }

  return processedArgs;
}
