import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Skeleton from "../components/Skeleton";
import ConfirmDelete from "../components/ConfirmDelete";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    fetchTasks().then(data => {
      setTasks(data);
      setInitialized(true);
    });
  }, []);

  const handleCreate = async (task) => {
    const temp = { ...task, _id: Date.now(), completed: false };
    setTasks(prev => [temp, ...prev]);

    try {
      const saved = await createTask(task);
      setTasks(prev => prev.map(t => t._id === temp._id ? saved : t));
    } catch {
      setTasks(prev => prev.filter(t => t._id !== temp._id));
    }
  };

  const handleToggle = async (task) => {
    setTasks(prev =>
      prev.map(t =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      )
    );
    await updateTask(task._id, { completed: !task.completed });
  };

  const handleDelete = async (id) => {
    const snapshot = tasks;
    setTasks(prev => prev.filter(t => t._id !== id));
    try {
      await deleteTask(id);
    } catch {
      setTasks(snapshot);
    }
  };

  const confirmDelete = async () => {
    const id = deleteTarget._id;
    setDeleteTarget(null);

    const snapshot = tasks;
    setTasks(prev => prev.filter(t => t._id !== id));

    try {
      await deleteTask(id);
    } catch {
      setTasks(snapshot);
      alert("Failed to delete task. Please try again.");
    }
  };

  const visibleTasks = tasks.filter(t => {
    if (filter === "completed" && !t.completed) return false;
    if (filter === "pending" && t.completed) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (!t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Header onCreateClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <TaskForm onCreate={handleCreate} />
        {!initialized ? <Skeleton /> :
          <>
            <TaskList
              tasks={visibleTasks}
              onToggle={handleToggle}
              onRequestDelete={setDeleteTarget}
              setFilter={setFilter}
              setSearch={setSearch}
              setPriorityFilter={setPriorityFilter}
            />
            <ConfirmDelete
              open={!!deleteTarget}
              onCancel={() => setDeleteTarget(null)}
              onConfirm={confirmDelete}
            />
          </>}
      </main>
    </>
  );
}
