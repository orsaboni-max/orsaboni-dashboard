import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Fetch posts from Supabase
  return NextResponse.json({ posts: [] });
}

export async function POST() {
  // TODO: Create post in Supabase
  return NextResponse.json({ message: "Post created" });
}
