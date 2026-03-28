"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { type CompetitorPost, competitors, formatLikes } from "@/lib/windsor";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

interface PostEmbedProps {
  post: CompetitorPost;
}

export function PostEmbed({ post }: PostEmbedProps) {
  const { permalink, likes, comments, type, timestamp, username } = post;
  const containerRef = useRef<HTMLDivElement>(null);

  const competitor = competitors.find((c) => c.username === username);
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("he-IL", {
    day: "numeric",
    month: "short",
  });

  const createLink = `/create?topic=${encodeURIComponent(post.caption)}&source=${encodeURIComponent(username)}`;

  useEffect(() => {
    const process = () => window.instgrm?.Embeds?.process();
    process();
    const t1 = setTimeout(process, 1000);
    const t2 = setTimeout(process, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [permalink]);

  return (
    <div className="bg-surface rounded-[14px] border border-border overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow">
      <div ref={containerRef} className="w-full p-4">
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={permalink}
          style={{ width: "100%", margin: 0 }}
        >
          <a href={permalink} target="_blank" rel="noopener noreferrer">
            View post on Instagram
          </a>
        </blockquote>
      </div>

      <div className="px-4 pb-4 flex flex-col gap-3 border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-[#f0734a] to-[#ff9a76]">
              <Image
                src={`https://unavatar.io/instagram/${username}`}
                alt={username}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-foreground">
              {competitor?.displayName ?? username}
            </span>
          </div>
          <span className="text-xs font-numbers text-gray-400">{formattedDate}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="font-numbers font-semibold text-foreground">
            ❤️ {formatLikes(likes)}
          </span>
          <span className="font-numbers">💬 {formatLikes(comments)}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold mr-auto ${
            type === "REELS" ? "bg-purple-100 text-purple-700" :
            type === "FEED" ? "bg-blue-100 text-blue-700" :
            "bg-green-100 text-green-700"
          }`}>
            {type}
          </span>
        </div>

        <Link
          href={createLink}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors no-underline"
        >
          ◆ צור תוכן מזה
        </Link>
      </div>
    </div>
  );
}
