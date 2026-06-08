import { useEffect, useState } from "react";
import { fetchPosts, createPost, deletePost } from "./api";
import type { Post } from "./types";
import PostCard from "./components/PostCard";
import CreatePostForm from "./components/CreatePostForm";

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch {
      setError("Could not load posts. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(title: string, body: string) {
    const post = await createPost(title, body);
    setPosts((prev) => [post, ...prev]);
  }

  async function handleDelete(id: string) {
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Failed to delete post.");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">Blog Post Manager</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage your posts</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <CreatePostForm onSubmit={handleCreate} />

        <section>
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            All Posts{" "}
            {!loading && (
              <span className="text-gray-400 font-normal">({posts.length})</span>
            )}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No posts yet. Create one above!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDelete}
                  deleting={deletingIds.has(post.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
