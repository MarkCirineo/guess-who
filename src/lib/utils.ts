import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  // Simple cn implementation without tailwind-merge
  return clsx(inputs)
}
