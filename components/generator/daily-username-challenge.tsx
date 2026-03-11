"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getDailyChallengeName,
  getDailyChallengeUserVote,
  getDailyChallengeVotes,
  voteDailyChallenge,
  type DailyChallengeVote,
} from "@/lib/daily-username-challenge";

export function DailyUsernameChallenge() {
  const challengeName = useMemo(() => getDailyChallengeName(), []);
  const [likes, setLikes] = useState(0);
  const [passes, setPasses] = useState(0);
  const [userVote, setUserVote] = useState<DailyChallengeVote | null>(null);

  useEffect(() => {
    const votes = getDailyChallengeVotes();
    setLikes(votes.likes);
    setPasses(votes.passes);
    setUserVote(getDailyChallengeUserVote());
  }, []);

  const onVote = useCallback((vote: DailyChallengeVote) => {
    const next = voteDailyChallenge(vote);
    setLikes(next.likes);
    setPasses(next.passes);
    setUserVote(next.userVote);
  }, []);

  return (
    <section className="content-auto mt-10">
      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">🎮 Daily Gamer Tag Challenge</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">{challengeName}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            A fresh featured gamer tag is generated each day. Vote whether you like today&apos;s pick and come back
            tomorrow for a new challenge name.
          </p>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-[1fr_auto_auto] md:p-8">
          <div className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            <span className="font-semibold text-white">{likes}</span> likes and <span className="font-semibold text-white">{passes}</span> passes
          </div>
          <Button
            variant={userVote === "like" ? "primary" : "ghost"}
            className="md:min-w-36"
            onClick={() => onVote("like")}
          >
            {userVote === "like" ? "Liked" : "Like it"}
          </Button>
          <Button
            variant={userVote === "pass" ? "primary" : "ghost"}
            className="md:min-w-36"
            onClick={() => onVote("pass")}
          >
            {userVote === "pass" ? "Voted" : "Not for me"}
          </Button>
        </div>
      </Card>
    </section>
  );
}
