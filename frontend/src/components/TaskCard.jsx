import { useState } from "react";

export default function TaskCard({ task, onToggle, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

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
            onClick={() => setShowConfirm(true)}
            className="text-sm text-danger hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold mb-2">Delete Task?</h3>
            <p className="text-sm text-muted mb-6">
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(task._id);
                  setShowConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}