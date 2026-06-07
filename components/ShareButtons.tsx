"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Facebook, Link2, MessageCircle, Pin, Share2, Twitter } from "lucide-react";
import { getShareLinks, type SharePayload } from "@/lib/share";

type ShareVariant = "celebration" | "compact" | "footer";
type GenderTint = "boy" | "girl" | "neutral";

interface ShareButtonsProps {
  variant: ShareVariant;
  message: string;
  url: string;
  title?: string;
  headline?: string;
  subline?: string;
  genderTint?: GenderTint;
}

function useShareActions(payload: SharePayload) {
  const [copied, setCopied] = useState(false);
  const links = getShareLinks(payload);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(links.copyText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, [links.copyText]);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return false;
    try {
      await navigator.share({
        title: payload.title,
        text: payload.message,
        url: payload.url,
      });
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return true;
      }
      return false;
    }
  }, [payload.message, payload.title, payload.url]);

  return { links, copied, handleCopy, handleNativeShare, canNativeShare: typeof navigator !== "undefined" && !!navigator.share };
}

interface IconRowProps {
  links: ReturnType<typeof getShareLinks>;
  copied: boolean;
  onCopy: () => void;
  onNativeShare: () => Promise<boolean>;
  canNativeShare: boolean;
  light?: boolean;
  compact?: boolean;
}

function ShareIconRow({
  links,
  copied,
  onCopy,
  onNativeShare,
  canNativeShare,
  light = false,
  compact = false,
}: IconRowProps) {
  const buttonClass = light
    ? "inline-flex items-center justify-center rounded-full w-10 h-10 bg-white/20 text-white hover:bg-white/30 transition-colors"
    : compact
      ? "inline-flex items-center justify-center rounded-full w-10 h-10 border-2 border-line bg-white text-foreground hover:border-primary/40 transition-colors"
      : "inline-flex items-center justify-center rounded-full w-11 h-11 border-2 border-line bg-white text-foreground hover:border-primary/40 hover:shadow-soft transition-colors";

  const handleNativeClick = async () => {
    await onNativeShare();
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${compact ? "justify-center" : "justify-center sm:justify-start"}`}
      role="group"
      aria-label="Share options"
    >
      {canNativeShare && (
        <button
          type="button"
          onClick={handleNativeClick}
          className={buttonClass}
          aria-label="Share using your device"
        >
          <Share2 className="w-5 h-5" aria-hidden />
        </button>
      )}
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" aria-hidden />
      </a>
      <a
        href={links.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" aria-hidden />
      </a>
      <a
        href={links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on X"
      >
        <Twitter className="w-5 h-5" aria-hidden />
      </a>
      <a
        href={links.pinterest}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on Pinterest"
      >
        <Pin className="w-5 h-5" aria-hidden />
      </a>
      <button
        type="button"
        onClick={onCopy}
        className={buttonClass}
        aria-label={copied ? "Link copied" : "Copy share message"}
      >
        {copied ? (
          <Link2 className="w-5 h-5" aria-hidden />
        ) : (
          <Copy className="w-5 h-5" aria-hidden />
        )}
      </button>
      {copied && (
        <span
          className={`text-sm font-semibold ${light ? "text-white" : "text-primary"}`}
          role="status"
          aria-live="polite"
        >
          Copied!
        </span>
      )}
    </div>
  );
}

function tintClasses(genderTint: GenderTint): string {
  if (genderTint === "boy") return "bg-boy/10 border border-boy/30";
  if (genderTint === "girl") return "bg-girl/10 border border-girl/30";
  return "bg-primary/5 border border-primary/20";
}

export default function ShareButtons({
  variant,
  message,
  url,
  title = "Natural Gender Selection Methods",
  headline,
  subline,
  genderTint = "neutral",
}: ShareButtonsProps) {
  const payload: SharePayload = { message, url, title };
  const { links, copied, handleCopy, handleNativeShare, canNativeShare } =
    useShareActions(payload);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCompactShare = async () => {
    if (canNativeShare) {
      const shared = await handleNativeShare();
      if (shared) return;
    }
    setMenuOpen((open) => !open);
  };

  if (variant === "compact") {
    return (
      <div className="relative flex-[2] sm:flex-none sm:min-w-[120px]">
        <button
          type="button"
          onClick={handleCompactShare}
          className="btn-secondary w-full min-h-[48px]"
          aria-expanded={menuOpen}
          aria-haspopup="true"
        >
          Share
        </button>
        {menuOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl border border-line bg-white p-3 shadow-card z-50 sm:left-auto sm:right-0 sm:min-w-[280px]">
            <ShareIconRow
              links={links}
              copied={copied}
              onCopy={handleCopy}
              onNativeShare={handleNativeShare}
              canNativeShare={canNativeShare}
              compact
            />
          </div>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="text-center">
        <p className="mb-3 opacity-90 font-semibold">
          Know someone planning? Share these free calculators
        </p>
        <ShareIconRow
          links={links}
          copied={copied}
          onCopy={handleCopy}
          onNativeShare={handleNativeShare}
          canNativeShare={canNativeShare}
          light
        />
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-4 mb-4 ${tintClasses(genderTint)}`}>
      {headline && (
        <h4 className="text-base sm:text-lg mb-1 text-primary">{headline}</h4>
      )}
      {subline && (
        <p className="text-sm sm:text-base mb-3">{subline}</p>
      )}
      <ShareIconRow
        links={links}
        copied={copied}
        onCopy={handleCopy}
        onNativeShare={handleNativeShare}
        canNativeShare={canNativeShare}
      />
    </div>
  );
}
