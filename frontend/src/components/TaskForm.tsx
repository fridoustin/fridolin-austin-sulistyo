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
    <section className="card task-form">
      <h2 className="card__title">Tambah Task</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="task-title">Judul</label>

          <input
            id="task-title"
            type="text"
            placeholder="Misalnya: Review pull request"
            value={form.title}
            onChange={handleChange("title")}
            aria-invalid={Boolean(error)}
          />

          {error && (
            <span className="field__error">{error}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="task-desc">
            Deskripsi (opsional)
          </label>

          <textarea
            id="task-desc"
            rows={2}
            placeholder="Detail tambahan tentang task ini"
            value={form.description}
            onChange={handleChange("description")}
          />
        </div>

        <div className="form-row">
          <div className="field field--status">
            <label htmlFor="task-status">Status</label>

            <select
              id="task-status"
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

          <button
            type="submit"
            className="btn btn--primary"
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