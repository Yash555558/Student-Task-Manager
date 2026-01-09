import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onRequestDelete, setFilter, setSearch }) {
  return (
    <>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          placeholder="Search tasks..."
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl border w-64"
        />
        <select
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <section className="grid md:grid-cols-3 gap-6">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={onToggle}
            onRequestDelete={onRequestDelete}
          />
        ))}
      </section>
    </>
  );
}