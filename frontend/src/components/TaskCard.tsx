import type { Task, TaskStatus } from "../types/task";

const STATUS_OPTIONS: TaskStatus[] = [
  "Todo",
  "In Progress",
  "Done",
];

const STATUS_CLASS: Record<TaskStatus, string> = {
  Todo: "badge--todo",
  "In Progress": "badge--progress",
  Done: "badge--done",
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
    <article className={`task-card task-card--${STATUS_CLASS[task.status]}`}>
      <div className="task-card__top">
        <h3 className="task-card__title">{task.title}</h3>

        <span className={`badge ${STATUS_CLASS[task.status]}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="task-card__desc">{task.description}</p>
      )}

      <div className="task-card__meta">
        <span className="task-card__date">
          Dibuat {formatDate(task.created_at)}
        </span>
      </div>

      <div className="task-card__actions">
        <select
          className="status-select"
          value={task.status}
          onChange={(e) =>
            onStatusChange(task, e.target.value as TaskStatus)
          }
          aria-label={`Ubah status task ${task.title}`}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="task-card__buttons">
          <button
            className="btn btn--ghost"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>

          <button
            className="btn btn--danger-ghost"
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