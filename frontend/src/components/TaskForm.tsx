import { useState, type ChangeEvent, type FormEvent } from "react";
import type { TaskCreate } from "../types/task";
import type { TaskStatus } from "../types/task";

const STATUS_OPTIONS: TaskStatus[] = [
  "Todo",
  "In Progress",
  "Done",
];

const emptyForm: TaskCreate = {
  title: "",
  description: "",
  status: "Todo",
};

const inputClass =
  "font-[var(--font-body)] text-[0.95rem] px-3 py-[10px] rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[#fbfbfd] text-[var(--color-text)] outline-none transition-[border-color,box-shadow] duration-150 ease-out focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_var(--color-accent-soft)]";

interface TaskFormProps {
  onAddTask: (task: TaskCreate) => Promise<void>;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [form, setForm] = useState<TaskCreate>(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof TaskCreate) =>
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

    if (form.title.trim() === "") {
      setError("Judul task wajib diisi");
      return;
    }

    setSubmitting(true);

    try {
      await onAddTask({
        title: form.title.trim(),
        description: form.description?.trim(),
        status: form.status,
      });

      setForm(emptyForm);
      setError("");
    } catch {
      setError("Gagal menambahkan task, silakan coba lagi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-(--color-surface) border border-(--color-border) rounded-lg px-6 py-5.5 shadow-(--shadow-card)">
      <h2 className="font-bold text-[1.05rem] m-0 mb-4">
        Tambah Task
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-1.5 mb-3.5">
          <label htmlFor="task-title" className="text-[0.85rem] font-semibold text-(--color-text-soft)">
            Judul
          </label>

          <input
            id="task-title"
            type="text"
            className={inputClass}
            placeholder="Misalnya: Review pull request"
            value={form.title}
            onChange={handleChange("title")}
            aria-invalid={Boolean(error)}
          />

          {error && (
            <span className="text-(--color-danger) text-[0.8rem] font-medium">{error}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 mb-3.5">
          <label htmlFor="task-desc" className="text-[0.85rem] font-semibold text-(--color-text-soft)">
            Deskripsi (opsional)
          </label>

          <textarea
            id="task-desc"
            rows={2}
            className={`${inputClass} resize-y min-h-15`}
            placeholder="Detail tambahan tentang task ini"
            value={form.description}
            onChange={handleChange("description")}
          />
        </div>

        <div className="flex items-end gap-3 max-[720px]:flex-col max-[720px]:items-stretch">
          <div className="flex flex-col gap-1.5 mb-0 flex-[0_0_180px] max-[720px]:flex-1">
            <label htmlFor="task-status" className="text-[0.85rem] font-semibold text-(--color-text-soft)">
              Status
            </label>

            <select id="task-status" className={inputClass} value={form.status} onChange={handleChange("status")}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="border-none rounded-sm font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] px-4.5 py-2.5 text-[0.9rem] h-10.5 bg-(--color-accent) text-white hover:bg-(--color-accent-hover) disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? "Menambahkan..." : "Tambah"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;