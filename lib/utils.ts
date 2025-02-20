import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { randomBytes } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatterIDR = (amount: number) => {
  const formatter = Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return formatter;
};

export const formatDate = (date: Date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};

export const formatDaysAgo = (date: Date) => {
  let daysAgo;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  // Calculate the difference in time (in milliseconds)
  const timeDifference = today.getTime() - date.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  switch (daysDifference) {
    case 0:
      daysAgo = "Today";
      break;
    case 1:
      daysAgo = "Yesterday";
      break;
    default:
      daysAgo = daysDifference + " Days Ago";
  }

  return daysAgo;
};

export const generateRandomString = (length: number = 16) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";

  const randomBuffer = randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += characters[randomBuffer[i] % charactersLength];
  }

  return result;
};
