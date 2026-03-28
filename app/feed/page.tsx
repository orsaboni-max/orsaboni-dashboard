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

    // Sort newest first
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
        <p className="text-sm text-gray-500 mt-1">
          {filteredPosts.length} פוסטים
          {selectedCompetitor ? ` מ-@${selectedCompetitor.username}` : " מכל המתחרים"}
        </p>
      </div>

      {/* Competitor cards — horizontal scroll */}
      <div className="mb-6 -mx-6 px-6">
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
          <button
            onClick={() => setSelectedUsername(null)}
            className={`flex-shrink-0 flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold transition-all min-w-[80px] cursor-pointer
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

      {/* Type filter */}
      <div className="flex items-center gap-2 mb-6">
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

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">אין פוסטים להצגה</p>
          <p className="text-sm mt-1">נסה לשנות את הפילטר</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPosts.map((post) => (
            <PostEmbed key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
