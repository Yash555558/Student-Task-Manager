export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`rounded-2xl p-5 shadow-card transition hover:scale-[1.02]
      ${task.completed ? "bg-green-50" : "bg-white"}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold text-lg ${task.completed && "line-through text-muted"}`}>
            {task.title}
          </h3>
          <p className="text-sm text-muted mt-2">
            {task.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className={`px-3 py-1 text-xs rounded-full ${
              task.priority === "high" ? "bg-red-100 text-red-600" :
              task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
              "bg-green-100 text-green-700"
            }`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="text-xs text-muted">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
            className="h-5 w-5 cursor-pointer"
          />
          <button
            onClick={() => onDelete(task._id)}
            className="text-sm text-danger hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}