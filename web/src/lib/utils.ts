import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parse = <T>(str?: string) => {
  try {
    return JSON.parse(str!) as T;
  } catch {
    return str as T;
  }
};

export const stringify = (v: unknown) => JSON.stringify(v);
