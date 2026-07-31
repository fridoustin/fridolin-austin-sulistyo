import type { Task, TaskStatus } from "../types/task";

const STATUS_OPTIONS: TaskStatus[] = [
  "Todo",
  "In Progress",
  "Done",
];

const STATUS_BORDER: Record<TaskStatus, string> = {
  Todo: "border-l-[var(--color-todo)]",
  "In Progress": "border-l-[var(--color-progress)]",
  Done: "border-l-[var(--color-done)]",
};

const STATUS_BADGE: Record<TaskStatus, string> = {
  Todo: "bg-[var(--color-todo-soft)] text-[var(--color-todo)]",
  "In Progress": "bg-[var(--color-progress-soft)] text-[var(--color-progress)]",
  Done: "bg-[var(--color-done-soft)] text-[var(--color-done)]",
};

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (task: Task, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
}

function TaskCard({
  task,
  onStatusChange,
  onEdit,
  onDeleteRequest,
}: TaskCardProps) {
  return (
    <article
      className={`border border-(--color-border) border-l-4 ${STATUS_BORDER[task.status]} rounded-md px-4.5 py-4 bg-white flex flex-col gap-2.5 transition-[box-shadow,transform] duration-150 ease-out hover:shadow-(--shadow-card)`}
    >
      <div className="flex justify-between items-start gap-2.5">
        <h3 className="text-base font-bold m-0 leading-[1.3]">{task.title}</h3>

        <span
          className={`text-[0.72rem] font-bold px-2.5 py-0.75 rounded-full whitespace-nowrap ${STATUS_BADGE[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="m-0 text-(--color-text-soft) text-[0.88rem] leading-[1.4]">
          {task.description}
        </p>
      )}

      <div className="text-[0.78rem] text-(--color-text-soft)">
        <span>Dibuat {formatDate(task.created_at)}</span>
      </div>

      <div className="flex items-center justify-between gap-2 mt-1 flex-wrap">
        <select
          className="text-[0.82rem] px-2 py-1.5 rounded-sm border border-(--color-border) bg-[#fbfbfd] text-(--color-text)"
          value={task.status}
          onChange={(e) => onStatusChange(task, e.target.value as TaskStatus)}
          aria-label={`Ubah status task ${task.title}`}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="flex gap-1.5">
          <button
            className="border-none rounded-sm font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] px-3 py-1.5 text-[0.82rem] bg-transparent text-(--color-text-soft) border border-(--color-border) hover:bg-[#f2f3f6] hover:text-(--color-text)"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>

          <button
            className="border-none rounded-sm font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] px-3 py-1.5 text-[0.82rem] bg-transparent text-(--color-danger) border border-(--color-danger-soft) hover:bg-(--color-danger-soft)"
            onClick={() => onDeleteRequest(task)}
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;