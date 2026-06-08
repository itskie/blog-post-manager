import type { Post } from "./types";

const BASE = "https://blog-post-manager-b3o5.onrender.com";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function createPost(title: string, body: string): Promise<Post> {
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Failed to create post");
  }
  return res.json();
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`${BASE}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete post");
}
