import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Task, TaskStatus, TaskUpdate } from "../types/task";

const STATUS_OPTIONS: TaskStatus[] = [
  "Todo",
  "In Progress",
  "Done",
];

const inputClass =
  "font-[var(--font-body)] text-[0.95rem] px-3 py-[10px] rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[#fbfbfd] text-[var(--color-text)] outline-none transition-[border-color,box-shadow] duration-150 ease-out focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_var(--color-accent-soft)]";

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
      className="fixed inset-0 bg-[rgba(15,17,24,0.45)] flex items-center justify-center p-5 z-100 animate-[fadeIn_0.15s_ease]"
      onMouseDown={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-110 shadow-(--shadow-pop) animate-[popIn_0.15s_ease]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        <h2 id="edit-modal-title" className="font-bold text-[1.05rem] m-0 mb-4">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1.5 mb-3.5">
            <label htmlFor="edit-title" className="text-[0.85rem] font-semibold text-(--color-text-soft)">
              Judul
            </label>

            <input
              id="edit-title"
              type="text"
              className={inputClass}
              value={form.title}
              onChange={handleChange("title")}
              aria-invalid={Boolean(error)}
              autoFocus
            />

            {error && (
              <span className="text-(--color-danger) text-[0.8rem] font-medium">{error}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 mb-3.5">
            <label htmlFor="edit-desc" className="text-[0.85rem] font-semibold text-(--color-text-soft)">
              Deskripsi
            </label>

            <textarea
              id="edit-desc"
              rows={3}
              className={`${inputClass} resize-y min-h-15`}
              value={form.description}
              onChange={handleChange("description")}
            />
          </div>

          <div className="flex flex-col gap-1.5 mb-3.5">
            <label htmlFor="edit-status" className="text-[0.85rem] font-semibold text-(--color-text-soft)">
              Status
            </label>

            <select id="edit-status" className={inputClass} value={form.status} onChange={handleChange("status")}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2.5 mt-1.5">
            <button
              type="button"
              className="border-none rounded-sm font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] px-4.5 py-2.5 text-[0.9rem] bg-transparent text-(--color-text-soft) border border-(--color-border) hover:bg-[#f2f3f6] hover:text-(--color-text)"
              onClick={onCancel}
              disabled={saving}
            >
              Batal
            </button>

            <button
              type="submit"
              className="border-none rounded-sm font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] px-4.5 py-2.5 text-[0.9rem] bg-(--color-accent) text-white hover:bg-(--color-accent-hover) disabled:opacity-60 disabled:cursor-not-allowed"
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