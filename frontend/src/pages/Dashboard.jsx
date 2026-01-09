import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "../components/Header";
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
    const params = {};
    if (filter !== "all") params.status = filter;
    if (sortBy) params.sortBy = sortBy;
    setTasks(await fetchTasks(params));
  };

  useEffect(() => { loadTasks(); }, [filter, sortBy]);

  const submitTask = async e => {
    e.preventDefault();
    await createTask(form);
    setForm({ title: "", description: "", priority: "low", dueDate: "" });
    loadTasks();
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
            className="md:col-span-4 bg-primary text-white py-3 rounded-xl font-semibold shadow-soft hover:scale-[1.02] transition"
          >
            Create Task
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
        <section className="grid md:grid-cols-3 gap-6">
          {filtered.map(task => (
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
                  onClick={() => deleteTask(task._id).then(loadTasks)}
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