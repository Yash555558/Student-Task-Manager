export default function EmptyState({
  title = "No tasks yet",
  description = "Create your first task to get started.",
  actionLabel,
  onAction
}) {
  return (
    <div className="text-center py-20">
      <div className="text-4xl mb-4">📭</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted mt-1">{description}</p>

      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-6 px-4 py-2 bg-primary text-white rounded-xl shadow-soft hover:scale-[1.03] transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}