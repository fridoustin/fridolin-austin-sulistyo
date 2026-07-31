import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Task, TaskStatus, TaskUpdate } from "../types/task";

const STATUS_OPTIONS: TaskStatus[] = [
  "Todo",
  "In Progress",
  "Done",
];

interface EditModalProps {
  task: Task;
  onSave: (id: number, payload: TaskUpdate) => Promise<void>;
  onCancel: () => void;
}

function EditModal({
  task,
  onSave,
  onCancel,
}: EditModalProps) {
  const [form, setForm] = useState<TaskUpdate>({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () =>
      document.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  const handleChange =
    (field: keyof TaskUpdate) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (field === "title" && error) {
        setError("");
      }
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title?.trim()) {
      setError("Judul task tidak boleh kosong");
      return;
    }

    setSaving(true);

    try {
      await onSave(task.id, {
        title: form.title.trim(),
        description: form.description?.trim(),
        status: form.status,
      });
    } catch {
      setError("Gagal menyimpan perubahan, silakan coba lagi");
      setSaving(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) =>
        e.target === e.currentTarget && onCancel()
      }
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        <h2 id="edit-modal-title" className="card__title">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="edit-title">Judul</label>

            <input
              id="edit-title"
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              aria-invalid={Boolean(error)}
              autoFocus
            />

            {error && (
              <span className="field__error">{error}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="edit-desc">Deskripsi</label>

            <textarea
              id="edit-desc"
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
            />
          </div>

          <div className="field">
            <label htmlFor="edit-status">Status</label>

            <select
              id="edit-status"
              value={form.status}
              onChange={handleChange("status")}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onCancel}
              disabled={saving}
            >
              Batal
            </button>

            <button
              type="submit"
              className="btn btn--primary"
              disabled={saving}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;