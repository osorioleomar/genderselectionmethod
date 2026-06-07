import { formatDateShort, MONTH_NAMES } from "./dates";
import type { ChineseResults } from "./chinese-calendar";
import type { ShettlesResults } from "./shettles";

export interface SharePayload {
  message: string;
  url: string;
  title: string;
}

export interface ShareLinks {
  whatsapp: string;
  facebook: string;
  twitter: string;
  pinterest: string;
  copyText: string;
}

export function getWizardShareUrl(siteOrigin: string): string {
  const base = siteOrigin.replace(/\/$/, "");
  return `${base}/#wizard`;
}

export function buildGenericShareMessage(siteOrigin: string): SharePayload {
  const url = getWizardShareUrl(siteOrigin);
  return {
    title: "Natural Gender Selection Methods",
    message: `Planning for a boy or girl? Free Shettles timing and Chinese birth chart tools: ${url}`,
    url,
  };
}

export function buildShettlesShareMessage(
  results: ShettlesResults,
  siteOrigin: string
): SharePayload {
  const url = getWizardShareUrl(siteOrigin);
  const dateList = results.recommendedDates.map((date) => formatDateShort(date)).join(", ");
  const ovulation = formatDateShort(results.ovulationDate);

  return {
    title: "Our Shettles plan",
    message: `Our Shettles plan for a ${results.desiredGender}: best days to try ${dateList}. Ovulation around ${ovulation}. Calculate yours free: ${url}`,
    url,
  };
}

export function buildChineseShareMessage(
  results: ChineseResults,
  siteOrigin: string
): SharePayload {
  if (results.favorableMonths.length === 0) {
    return buildGenericShareMessage(siteOrigin);
  }

  const url = getWizardShareUrl(siteOrigin);
  const monthList = results.favorableMonths
    .map((month) => MONTH_NAMES[month - 1])
    .join(", ");

  return {
    title: "Our Chinese chart results",
    message: `Chinese birth chart for a ${results.desiredGender} in ${results.conceptionYear}: favorable months are ${monthList}. Free calculator: ${url}`,
    url,
  };
}

export function getShareLinks(payload: SharePayload): ShareLinks {
  const encodedMessage = encodeURIComponent(payload.message);
  const encodedUrl = encodeURIComponent(payload.url);

  return {
    whatsapp: `https://wa.me/?text=${encodedMessage}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedMessage}`,
    copyText: payload.message,
  };
}

export function getResultsSharePayload(
  shettlesResults: ShettlesResults | null,
  chineseResults: ChineseResults | null,
  siteOrigin: string
): SharePayload | null {
  if (shettlesResults) {
    return buildShettlesShareMessage(shettlesResults, siteOrigin);
  }
  if (chineseResults) {
    return buildChineseShareMessage(chineseResults, siteOrigin);
  }
  return null;
}
