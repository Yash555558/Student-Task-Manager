import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const submitTask = async e => {
    e.preventDefault();
    if (submitting || !form.title.trim()) return;

    setSubmitting(true);
    try {
      await onCreate(form);
      setForm({ title: "", description: "", priority: "low", dueDate: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submitTask}
      className="bg-white rounded-2xl p-6 shadow-card grid md:grid-cols-4 gap-4 mb-10"
    >
      <input
        placeholder="Task title"
        required
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="md:col-span-2 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary"
      />

      <select
        value={form.priority}
        onChange={e => setForm({ ...form, priority: e.target.value })}
        className="px-4 py-3 rounded-xl border"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={form.dueDate}
        onChange={e => setForm({ ...form, dueDate: e.target.value })}
        className="px-4 py-3 rounded-xl border"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        className="md:col-span-4 px-4 py-3 rounded-xl border"
      />

      <button
        disabled={submitting}
        className={`md:col-span-4 py-3 rounded-xl font-semibold transition
          ${submitting
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-primary text-white shadow-soft hover:scale-[1.02]"
          }`}
      >
        {submitting ? "Creating…" : "Create Task"}
      </button>
    </form>
  );
}