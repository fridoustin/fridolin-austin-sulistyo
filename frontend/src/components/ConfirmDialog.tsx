import type { Task } from "../types/task";

interface ConfirmDialogProps {
  task: Task;
  onConfirm: (id: number) => void;
  onCancel: () => void;
}

function ConfirmDialog({
  task,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) =>
        e.target === e.currentTarget && onCancel()
      }
    >
      <div
        className="modal modal--sm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h2 id="confirm-title" className="card__title">
          Hapus task ini?
        </h2>

        <p className="modal__text">
          "{task.title}" akan dihapus secara permanen dan tidak bisa
          dikembalikan.
        </p>

        <div className="modal__actions">
          <button
            className="btn btn--ghost"
            onClick={onCancel}
          >
            Batal
          </button>

          <button
            className="btn btn--danger"
            onClick={() => onConfirm(task.id)}
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;