import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  let hour = d.getHours();
  const minute = d.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const hourStr = hour.toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hourStr}:${minute} ${ampm}`;
}

export function profileUrl(url: string) {
  if (!url || url.trim() === "") {
    return import.meta.env.VITE_MEDIA_URL + "/uploads/profile/default-avatar.png";
  } else {
    return import.meta.env.VITE_MEDIA_URL + url;
  }
}