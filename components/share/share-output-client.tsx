"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createShareHash, type SharedOutputPayload } from "@/lib/share-output";

type ShareOutputClientProps = {
  payload: SharedOutputPayload;
};

function createCreatorPack(name: string) {
  const hashtags = ["#usernameideas", "#gamername", "#handlecheck", "#brandname", "#creator"];
  return {
    bio: `${name} | gaming + creator content | daily clips`,
    hashtags: hashtags.join(" "),
    thumbnail: `${name} - TOP PICK`,
  };
}

export function ShareOutputClient({ payload }: ShareOutputClientProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [inviteCount, setInviteCount] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const raw = window.localStorage.getItem("namelaunchpad:invites");
    const value = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isNaN(value) ? 0 : value;
  });

  const topName = payload.n[0] ?? "NameLaunchpadPick";
  const creatorPack = useMemo(() => createCreatorPack(topName), [topName]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return `/u/${createShareHash(payload)}`;
    return `${window.location.origin}/u/${createShareHash(payload)}`;
  }, [payload]);

  const incrementInvite = () => {
    const next = inviteCount + 1;
    setInviteCount(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("namelaunchpad:invites", String(next));
    }
  };

  const onShare = async (platform: "tiktok" | "x" | "reddit" | "discord") => {
    const text = encodeURIComponent(`Top username picks: ${payload.n.slice(0, 3).join(", ")}`);
    const encodedUrl = encodeURIComponent(shareUrl);

    if (platform === "tiktok") {
      try {
        await navigator.clipboard.writeText(`${creatorPack.bio}\n${shareUrl}`);
        setToast("TikTok bio pack copied.");
      } catch {
        setToast("Could not copy TikTok bio.");
      }
      incrementInvite();
      window.setTimeout(() => setToast(null), 1800);
      return;
    }

    if (platform === "x") {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`, "_blank", "noopener,noreferrer");
      incrementInvite();
      return;
    }

    if (platform === "reddit") {
      window.open(
        `https://www.reddit.com/submit?title=${encodeURIComponent("Top username picks")}&text=${text}%20${encodedUrl}`,
        "_blank",
        "noopener,noreferrer"
      );
      incrementInvite();
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setToast("Share link copied for Discord.");
    } catch {
      setToast("Could not copy Discord link.");
    }
    incrementInvite();
    window.setTimeout(() => setToast(null), 1800);
  };

  const onCopyPack = async () => {
    try {
      await navigator.clipboard.writeText(
        [`Name: ${topName}`, `Bio: ${creatorPack.bio}`, `Hashtags: ${creatorPack.hashtags}`, `Thumbnail: ${creatorPack.thumbnail}`].join("\n")
      );
      setToast("Creator pack copied.");
    } catch {
      setToast("Could not copy creator pack.");
    }
    window.setTimeout(() => setToast(null), 1800);
  };

  const onDownloadTop5Card = async () => {
    try {
      const ogUrl = `/api/og?title=${encodeURIComponent("Top 5 Usernames")}&subtitle=${encodeURIComponent(payload.n.slice(0, 5).join(" • "))}&eyebrow=NameLaunchpad&theme=listing`;
      const response = await fetch(ogUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("OG image failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "top-5-usernames.png";
      anchor.click();
      window.URL.revokeObjectURL(url);
      setToast("Top 5 card downloaded.");
    } catch {
      setToast("Could not download Top 5 card.");
    }
    window.setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="mt-6 grid gap-4">
      <Card className="p-5">
        <h2 className="text-xl font-bold text-white">Share This Output</h2>
        <p className="mt-2 text-sm text-slate-300">One-click distribution across TikTok bio, X, Reddit, and Discord.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={() => onShare("tiktok")}>
            TikTok Bio
          </Button>
          <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={() => onShare("x")}>
            Share on X
          </Button>
          <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={() => onShare("reddit")}>
            Share on Reddit
          </Button>
          <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={() => onShare("discord")}>
            Share on Discord
          </Button>
        </div>
        <div className="mt-3">
          <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={onDownloadTop5Card}>
            Download Top 5 Card
          </Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-xl font-bold text-white">Creator Pack</h2>
        <div className="mt-3 grid gap-2 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-white">Name:</span> {topName}
          </p>
          <p>
            <span className="font-semibold text-white">Bio line:</span> {creatorPack.bio}
          </p>
          <p>
            <span className="font-semibold text-white">Hashtags:</span> {creatorPack.hashtags}
          </p>
          <p>
            <span className="font-semibold text-white">Thumbnail text:</span> {creatorPack.thumbnail}
          </p>
        </div>
        <Button variant="ghost" className="mt-4 h-10 px-3 py-0 text-xs" onClick={onCopyPack}>
          Copy Creator Pack
        </Button>
      </Card>

      <Card className="p-5">
        <h2 className="text-xl font-bold text-white">Invite Unlock</h2>
        <p className="mt-2 text-sm text-slate-300">Invite 3 friends through shares to unlock premium pack ideas.</p>
        <p className="mt-3 text-sm font-semibold text-cyan-200">Invites tracked: {inviteCount} / 3</p>
        {inviteCount >= 3 ? (
          <div className="mt-3 rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm text-cyan-100">
            Premium pack unlocked: add custom color themes + long-form hashtag sets.
          </div>
        ) : null}
      </Card>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
