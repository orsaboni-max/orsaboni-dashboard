"use client";

import Image from "next/image";
import { type Competitor, formatFollowers } from "@/lib/windsor";

interface CompetitorCardProps {
  competitor: Competitor;
  isSelected: boolean;
  onClick: () => void;
}

export function CompetitorCard({ competitor, isSelected, onClick }: CompetitorCardProps) {
  const { username, followers, category, own } = competitor;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all duration-200 cursor-pointer max-w-[140px] w-full
        ${isSelected
          ? "bg-surface shadow-[0_2px_12px_rgba(240,115,74,0.2)] border-2 border-accent"
          : own
            ? "bg-surface border-2 border-accent hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            : "bg-surface shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        }
      `}
    >
      <div className="relative">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-[#f0734a] to-[#ff9a76]">
          <Image
            src={`https://unavatar.io/instagram/${username}`}
            alt={username}
            width={44}
            height={44}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement("span");
                fallback.className = "flex items-center justify-center w-full h-full text-white font-bold text-sm";
                fallback.textContent = username[0].toUpperCase();
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
      </div>

      <p className="text-[11px] text-gray-500 truncate max-w-[120px]">@{username}</p>
      <p className="text-xs font-numbers font-semibold text-foreground">
        {formatFollowers(followers)}
      </p>
      <span className="text-[10px] text-gray-400 bg-[#F5F5F0] px-2 py-0.5 rounded-full truncate max-w-[120px]">
        {category}
      </span>

      {own && (
        <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
          🔥 שלך
        </span>
      )}
    </button>
  );
}
