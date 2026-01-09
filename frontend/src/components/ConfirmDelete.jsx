export default function ConfirmDelete({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>Delete task?</h3>
        <p>This action cannot be undone.</p>

        <div className="confirm-actions">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}