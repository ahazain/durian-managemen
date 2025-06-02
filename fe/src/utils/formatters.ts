/**
 * Utility functions for formatting data
 */

import { format } from "date-fns";

/**
 * Formats a date string to a readable format
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy h:mm a");
}

/**
 * Formats a number as Indonesian Rupiah
 * @param amount Amount to format
 * @returns Formatted currency string
 */
export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Maps API grade to display quality
 * @param grade API grade (may be X for not durian)
 * @param label API label
 * @returns Formatted quality string
 */
export function formatQuality(grade: string, label: string): string {
  if (label.toLowerCase() === "not durian") {
    return "Not Durian";
  }
  return grade;
}

/**
 * Gets appropriate color class for quality grade
 * @param quality Quality grade
 * @returns Tailwind color class
 */
export function getQualityColorClass(quality: string): string {
  if (quality === "Not Durian") {
    return "bg-gray-100 text-gray-800";
  }

  switch (quality) {
    case "A":
      return "bg-green-100 text-green-800";
    case "B":
      return "bg-blue-100 text-blue-800";
    case "C":
      return "bg-yellow-100 text-yellow-800";
    case "D":
    case "X":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
