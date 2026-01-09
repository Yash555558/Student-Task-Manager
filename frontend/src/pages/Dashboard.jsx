import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "../components/Header";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from "../services/api";

const priorityColor = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700"
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: ""
  });

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (filter !== "all") params.status = filter;
      if (sortBy) params.sortBy = sortBy;
      setTasks(await fetchTasks(params));
    } catch {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, [filter, sortBy]);

  const submitTask = async e => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    await createTask(form);
    setForm({ title: "", description: "", priority: "low", dueDate: "" });
    await loadTasks();
    setSubmitting(false);
  };

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header onCreateClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Create Task Card */}
        <form
          onSubmit={submitTask}
          className="bg-white rounded-2xl p-6 shadow-card grid md:grid-cols-4 gap-4"
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

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border w-64"
          />

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl border"
          >
            <option value="">No Sort</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        {/* Task Grid */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl mb-4">
            {error}
          </div>
        )}
        <section className="grid md:grid-cols-3 gap-6">
          {loading && <Loading label="Fetching tasks…" />}

          {!loading && filtered.length === 0 && (
            <EmptyState
              title="No tasks found"
              description={
                search
                  ? "Try a different search term."
                  : "You’re all clear! Add a task to begin."
              }
              actionLabel="Add your first task"
              onAction={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          )}

          {!loading &&
            filtered.map(task => (
              <div
                key={task._id}
                className={`rounded-2xl p-5 shadow-card transition hover:scale-[1.02]
                ${task.completed ? "bg-green-50" : "bg-white"}`}
              >
                <div className="flex justify-between items-start">
                  <h3 className={`font-semibold text-lg ${task.completed && "line-through text-muted"}`}>
                    {task.title}
                  </h3>

                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => updateTask(task._id, { completed: !task.completed }).then(loadTasks)}
                    className="h-5 w-5"
                  />
                </div>

                <p className="text-sm text-muted mt-2">
                  {task.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${priorityColor[task.priority]}`}>
                    {task.priority}
                  </span>

                  {task.dueDate && (
                    <span className="text-xs text-muted">
                      {dayjs(task.dueDate).format("MMM D, YYYY")}
                    </span>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={async () => {
                      const confirmed = window.confirm(
                        "Are you sure you want to delete this task? This action cannot be undone."
                      );
                      if (!confirmed) return;

                      await deleteTask(task._id);
                      loadTasks();
                    }}
                    className="text-sm text-danger hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </section>

      </main>
    </>
  );
}