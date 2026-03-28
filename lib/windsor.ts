export interface Competitor {
  username: string;
  displayName: string;
  followers: number;
  category: string;
  own?: boolean;
  inactive?: boolean;
}

export interface CompetitorPost {
  id: string;
  username: string;
  permalink: string;
  caption: string;
  likes: number;
  comments: number;
  type: "REELS" | "FEED" | "CAROUSEL";
  timestamp: string;
}

export const competitors: Competitor[] = [
  { username: "trainbloom", displayName: "Train Bloom", followers: 1_100_000, category: "myth-busting" },
  { username: "jeffnippard", displayName: "Jeff Nippard", followers: 3_850_000, category: "מחקרים" },
  { username: "bryanjohnson_", displayName: "Bryan Johnson", followers: 2_430_000, category: "biohacking" },
  { username: "biolayne", displayName: "Layne Norton", followers: 1_210_000, category: "מחקרים", inactive: true },
  { username: "xtinecardenas", displayName: "Xtine Cardenas", followers: 1_260_000, category: "כושר+תזונה" },
  { username: "ccristina_fit", displayName: "Cristina Fit", followers: 230_000, category: "כושר+תזונה" },
  { username: "excelled.health", displayName: "Excelled Health", followers: 287_000, category: "מחקרים" },
  { username: "iradolfin", displayName: "Ira Dolfin", followers: 140_000, category: "כושר+תזונה" },
  { username: "trainerjye", displayName: "Trainer Jye", followers: 13_700, category: "fat loss" },
  { username: "haroldjrc", displayName: "Harold JRC", followers: 6_900, category: "תזונה+כושר" },
  { username: "orsaboni", displayName: "אור סבוני", followers: 1_675, category: "כושר+תזונה", own: true },
  { username: "shalev_vardi_fitness", displayName: "שלו ורדי", followers: 553, category: "כושר+תזונה", inactive: true },
];

export const competitorPosts: CompetitorPost[] = [
  // trainbloom
  {
    id: "tb-1",
    username: "trainbloom",
    permalink: "https://www.instagram.com/reel/DV_daSMjtbj/",
    caption: "Are energy drinks killing you?",
    likes: 314_000,
    comments: 4200,
    type: "REELS",
    timestamp: "2026-03-25T10:00:00Z",
  },
  {
    id: "tb-2",
    username: "trainbloom",
    permalink: "https://www.instagram.com/reel/DVtbpOSDq1Z/",
    caption: "GMOs — the truth",
    likes: 267_000,
    comments: 3800,
    type: "REELS",
    timestamp: "2026-03-22T14:00:00Z",
  },
  {
    id: "tb-3",
    username: "trainbloom",
    permalink: "https://www.instagram.com/reel/DWRee85DoF1/",
    caption: "Creatine fat loss",
    likes: 149_000,
    comments: 2100,
    type: "REELS",
    timestamp: "2026-03-27T09:00:00Z",
  },
  {
    id: "tb-4",
    username: "trainbloom",
    permalink: "https://www.instagram.com/reel/DVgo20eDnH8/",
    caption: "Train to failure — should you?",
    likes: 93_000,
    comments: 1500,
    type: "REELS",
    timestamp: "2026-03-20T11:00:00Z",
  },
  {
    id: "tb-5",
    username: "trainbloom",
    permalink: "https://www.instagram.com/reel/DWWn0Xhjv-r/",
    caption: "Weight loss vs fat loss",
    likes: 55_000,
    comments: 890,
    type: "REELS",
    timestamp: "2026-03-28T08:00:00Z",
  },
  // iradolfin
  {
    id: "ir-1",
    username: "iradolfin",
    permalink: "https://www.instagram.com/reel/DVWRSIJjCQq/",
    caption: "Tabata Six Pack",
    likes: 1_829,
    comments: 45,
    type: "REELS",
    timestamp: "2026-03-18T16:00:00Z",
  },
  {
    id: "ir-2",
    username: "iradolfin",
    permalink: "https://www.instagram.com/reel/DWJ2ZU9DDWW/",
    caption: "אימון ישבן ורגליים",
    likes: 904,
    comments: 22,
    type: "REELS",
    timestamp: "2026-03-26T07:00:00Z",
  },
  {
    id: "ir-3",
    username: "iradolfin",
    permalink: "https://www.instagram.com/reel/DVtnONVjBWz/",
    caption: "עוגת גבינה בריאה",
    likes: 636,
    comments: 18,
    type: "REELS",
    timestamp: "2026-03-23T12:00:00Z",
  },
  {
    id: "ir-4",
    username: "iradolfin",
    permalink: "https://www.instagram.com/reel/DVlw_ooDG6o/",
    caption: "Upper Body Workout",
    likes: 621,
    comments: 15,
    type: "REELS",
    timestamp: "2026-03-21T09:00:00Z",
  },
  // ccristina_fit
  {
    id: "cc-1",
    username: "ccristina_fit",
    permalink: "https://www.instagram.com/reel/DVeUniWj8bZ/",
    caption: "Macro cheat sheet",
    likes: 9_702,
    comments: 120,
    type: "REELS",
    timestamp: "2026-03-19T15:00:00Z",
  },
  {
    id: "cc-2",
    username: "ccristina_fit",
    permalink: "https://www.instagram.com/reel/DWEeEksAZM_/",
    caption: "Fast food swaps",
    likes: 947,
    comments: 30,
    type: "REELS",
    timestamp: "2026-03-25T18:00:00Z",
  },
  {
    id: "cc-3",
    username: "ccristina_fit",
    permalink: "https://www.instagram.com/reel/DV_JPHLAf0k/",
    caption: "Volume eating tips",
    likes: 555,
    comments: 12,
    type: "REELS",
    timestamp: "2026-03-24T10:00:00Z",
  },
  // excelled.health
  {
    id: "eh-1",
    username: "excelled.health",
    permalink: "https://www.instagram.com/reel/DVozBu-DK0c/",
    caption: "Walking and aging",
    likes: 287,
    comments: 8,
    type: "REELS",
    timestamp: "2026-03-22T08:00:00Z",
  },
  {
    id: "eh-2",
    username: "excelled.health",
    permalink: "https://www.instagram.com/p/DVb7nnxDAql/",
    caption: "Thigh size and heart disease risk",
    likes: 239,
    comments: 5,
    type: "FEED",
    timestamp: "2026-03-17T13:00:00Z",
  },
  {
    id: "eh-3",
    username: "excelled.health",
    permalink: "https://www.instagram.com/reel/DWCk2--jNjS/",
    caption: "Strength training and depression",
    likes: 53,
    comments: 2,
    type: "REELS",
    timestamp: "2026-03-25T11:00:00Z",
  },
  // trainerjye
  {
    id: "tj-1",
    username: "trainerjye",
    permalink: "https://www.instagram.com/trainerjye/",
    caption: "Calorie density explained",
    likes: 24_000,
    comments: 310,
    type: "REELS",
    timestamp: "2026-03-26T14:00:00Z",
  },
  {
    id: "tj-2",
    username: "trainerjye",
    permalink: "https://www.instagram.com/trainerjye/",
    caption: "No foods off limits",
    likes: 368,
    comments: 11,
    type: "REELS",
    timestamp: "2026-03-20T09:00:00Z",
  },
  // haroldjrc
  {
    id: "hj-1",
    username: "haroldjrc",
    permalink: "https://www.instagram.com/haroldjrc/",
    caption: "Supplements timing guide",
    likes: 2_163,
    comments: 48,
    type: "REELS",
    timestamp: "2026-03-24T16:00:00Z",
  },
  // bryanjohnson_
  {
    id: "bj-1",
    username: "bryanjohnson_",
    permalink: "https://www.instagram.com/bryanjohnson_/",
    caption: "Two types of people in this world",
    likes: 58_000,
    comments: 1200,
    type: "REELS",
    timestamp: "2026-03-27T12:00:00Z",
  },
  {
    id: "bj-2",
    username: "bryanjohnson_",
    permalink: "https://www.instagram.com/bryanjohnson_/",
    caption: "I decided to live life differently",
    likes: 48_000,
    comments: 980,
    type: "REELS",
    timestamp: "2026-03-23T18:00:00Z",
  },
  // orsaboni
  {
    id: "os-1",
    username: "orsaboni",
    permalink: "https://www.instagram.com/orsaboni/",
    caption: "כמה חלבון באמת צריך?",
    likes: 34,
    comments: 3,
    type: "REELS",
    timestamp: "2026-03-26T17:30:00Z",
  },
];

export function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}

export function formatLikes(count: number): string {
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}
