import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onRequestDelete, setFilter, setSearch, setPriorityFilter }) {
  return (
    <>
      <div className="task-controls">
        <input
          placeholder="Search tasks..."
          onChange={e => setSearch(e.target.value)}
        />
        <select
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select onChange={e => setPriorityFilter(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
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