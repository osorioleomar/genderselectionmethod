"use client";

import ShareButtons from "@/components/ShareButtons";
import { buildGenericShareMessage } from "@/lib/share";
import { useSiteOrigin } from "@/lib/useSiteOrigin";

export default function FooterShare() {
  const siteOrigin = useSiteOrigin();
  if (!siteOrigin) return null;

  const sharePayload = buildGenericShareMessage(siteOrigin);

  return (
    <ShareButtons
      variant="footer"
      message={sharePayload.message}
      url={sharePayload.url}
      title={sharePayload.title}
    />
  );
}
