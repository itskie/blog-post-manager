import type { Post } from "../types";

interface Props {
  post: Post;
  onDelete: (id: string) => void;
  deleting: boolean;
}

export default function PostCard({ post, onDelete, deleting }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900 leading-snug">{post.title}</h2>
        <button
          onClick={() => onDelete(post.id)}
          disabled={deleting}
          className="shrink-0 text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
    </div>
  );
}
