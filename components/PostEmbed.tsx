"use client";

import { InstagramEmbed } from "react-social-media-embed";
import Link from "next/link";
import { type CompetitorPost, formatLikes } from "@/lib/windsor";

interface PostEmbedProps {
  post: CompetitorPost;
}

export function PostEmbed({ post }: PostEmbedProps) {
  const { permalink, caption, likes, comments, type, timestamp, username } = post;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("he-IL", {
    day: "numeric",
    month: "short",
  });

  const createLink = `/create?topic=${encodeURIComponent(caption)}&source=${encodeURIComponent(username)}`;

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow">
      <div className="w-full">
        <InstagramEmbed url={permalink} width={328} />
      </div>

      <div className="p-3 flex flex-col gap-2 border-t border-border">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="font-numbers font-semibold text-foreground">
              ❤️ {formatLikes(likes)}
            </span>
            <span className="font-numbers">
              💬 {formatLikes(comments)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              type === "REELS" ? "bg-purple-100 text-purple-700" :
              type === "FEED" ? "bg-blue-100 text-blue-700" :
              "bg-green-100 text-green-700"
            }`}>
              {type}
            </span>
            <span className="font-numbers">{formattedDate}</span>
          </div>
        </div>

        <Link
          href={createLink}
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors no-underline"
        >
          ◆ צור תוכן מזה
        </Link>
      </div>
    </div>
  );
}
