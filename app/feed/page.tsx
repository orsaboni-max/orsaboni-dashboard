"use client";

import { useState, useMemo } from "react";
import { competitors, competitorPosts, type CompetitorPost } from "@/lib/windsor";
import { CompetitorCard } from "@/components/CompetitorCard";
import { PostEmbed } from "@/components/PostEmbed";

type PostType = "ALL" | "REELS" | "FEED" | "CAROUSEL";

export default function FeedPage() {
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<PostType>("ALL");

  const filteredPosts = useMemo(() => {
    let posts: CompetitorPost[] = [...competitorPosts];

    if (selectedUsername) {
      posts = posts.filter((p) => p.username === selectedUsername);
    }

    if (typeFilter !== "ALL") {
      posts = posts.filter((p) => p.type === typeFilter);
    }

    posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return posts;
  }, [selectedUsername, typeFilter]);

  const selectedCompetitor = competitors.find((c) => c.username === selectedUsername);

  const typeOptions: { value: PostType; label: string }[] = [
    { value: "ALL", label: "הכל" },
    { value: "REELS", label: "Reels" },
    { value: "FEED", label: "Feed" },
    { value: "CAROUSEL", label: "Carousel" },
  ];

  return (
    <div className="p-6 max-w-[1400px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">פיד מתחרים</h1>
        <p className="text-[13px] text-gray-500 font-sans mt-1">
          {filteredPosts.length} פוסטים
          {selectedCompetitor ? ` מ-@${selectedCompetitor.username}` : " מכל המתחרים"}
        </p>
      </div>

      {/* Competitor cards — grid */}
      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          <button
            onClick={() => setSelectedUsername(null)}
            className={`flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer max-w-[140px] w-full
              ${!selectedUsername
                ? "bg-accent text-white shadow-[0_2px_12px_rgba(240,115,74,0.3)]"
                : "bg-surface text-gray-600 border border-border hover:bg-[#F5F5F0]"
              }
            `}
          >
            הכל
          </button>
          {competitors.map((comp) => (
            <CompetitorCard
              key={comp.username}
              competitor={comp}
              isSelected={selectedUsername === comp.username}
              onClick={() =>
                setSelectedUsername(
                  selectedUsername === comp.username ? null : comp.username
                )
              }
            />
          ))}
        </div>
      </div>

      {/* Section divider + type filter */}
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="text-lg font-display font-bold text-foreground mb-3">
          📱 הפוסטים האחרונים
        </h2>
        <div className="flex items-center gap-2">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTypeFilter(opt.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${typeFilter === opt.value
                  ? "bg-foreground text-white"
                  : "bg-surface text-gray-600 border border-border hover:bg-[#F5F5F0]"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">אין פוסטים להצגה</p>
          <p className="text-sm mt-1">נסה לשנות את הפילטר</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <PostEmbed key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
