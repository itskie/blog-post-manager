import { useState } from "react";

interface Props {
  onSubmit: (title: string, body: string) => Promise<void>;
}

export default function CreatePostForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  function validate() {
    const errs: { title?: string; body?: string } = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!body.trim()) errs.body = "Body is required";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await onSubmit(title.trim(), body.trim());
      setTitle("");
      setBody("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-900">New Post</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition ${
            errors.title ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post…"
          rows={4}
          className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none ${
            errors.body ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.body && <span className="text-xs text-red-500">{errors.body}</span>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
      >
        {submitting ? "Publishing…" : "Publish Post"}
      </button>
    </form>
  );
}
