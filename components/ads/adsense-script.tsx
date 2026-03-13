"use client";

import Script from "next/script";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSenseScript() {
  if (!adsenseClient) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      strategy="beforeInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
    />
  );
}
