"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const exampleSuggestions = [
  "Pokemon Name Generator",
  "Streamer Name Generator",
  "TikTok Username Generator",
  "Clan Name Generator",
];

const storageKey = "namelaunchpad:generator-requests";

export function GeneratorRequest() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      setSuggestions(exampleSuggestions);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setSuggestions(parsed);
        return;
      }
    } catch {}

    setSuggestions(exampleSuggestions);
  }, []);

  useEffect(() => {
    if (suggestions.length === 0) return;
    window.localStorage.setItem(storageKey, JSON.stringify(suggestions));
  }, [suggestions]);

  const hasValue = useMemo(() => input.trim().length >= 4, [input]);

  const onSubmit = () => {
    const value = input.trim();
    if (value.length < 4) return;

    setSuggestions((current) => {
      const exists = current.some((item) => item.toLowerCase() === value.toLowerCase());
      if (exists) {
        setMessage("Suggestion already saved.");
        window.setTimeout(() => setMessage(null), 1800);
        return current;
      }

      setMessage("Generator request saved.");
      window.setTimeout(() => setMessage(null), 1800);
      return [value, ...current].slice(0, 24);
    });
    setInput("");
  };

  return (
    <section className="content-auto mt-10">
      <Card className="p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white md:text-3xl">Generator Request</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
              Suggest a new generator you want to see on NameLaunchpad. Requests are stored locally in this browser for now.
            </p>
          </div>
          <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
            Local suggestions
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Suggest a generator, e.g. Pokemon Name Generator"
            className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
          />
          <Button onClick={onSubmit} disabled={!hasValue} className="md:min-w-48">
            Submit Request
          </Button>
        </div>

        {message ? <p className="mt-3 text-sm text-cyan-200">{message}</p> : null}

        <div className="mt-6">
          <h3 className="text-lg font-bold text-white">Suggested Generators</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
