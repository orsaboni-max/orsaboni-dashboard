"use client";

import Image from "next/image";
import { type Competitor, formatFollowers } from "@/lib/windsor";

interface CompetitorCardProps {
  competitor: Competitor;
  isSelected: boolean;
  onClick: () => void;
}

export function CompetitorCard({ competitor, isSelected, onClick }: CompetitorCardProps) {
  const { username, displayName, followers, category, own, inactive } = competitor;

  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer min-w-[120px]
        ${isSelected
          ? "bg-surface shadow-[0_2px_12px_rgba(240,115,74,0.2)] border-2 border-accent"
          : "bg-surface shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        }
        ${own ? "border-accent border-2" : ""}
      `}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#f0734a] to-[#ff9a76]">
          <Image
            src={`https://unavatar.io/instagram/${username}`}
            alt={displayName}
            width={48}
            height={48}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement("span");
                fallback.className = "flex items-center justify-center w-full h-full text-white font-bold text-lg";
                fallback.textContent = displayName[0];
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
        {own && (
          <span className="absolute -top-1 -left-1 text-xs">🔥</span>
        )}
        {inactive && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-gray-300 border-2 border-surface" />
        )}
      </div>

      <div className="text-center">
        <p className="text-xs font-medium text-foreground leading-tight truncate max-w-[100px]">
          {displayName}
        </p>
        <p className="text-[10px] text-gray-400 truncate max-w-[100px]">@{username}</p>
        <p className="text-xs font-numbers font-semibold text-foreground mt-0.5">
          {formatFollowers(followers)}
        </p>
        <p className="text-[10px] text-gray-400">{category}</p>
      </div>

      {own && (
        <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
          🔥 שלך
        </span>
      )}
    </button>
  );
}
