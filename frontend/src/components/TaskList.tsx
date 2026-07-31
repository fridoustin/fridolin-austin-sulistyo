import type { Task, TaskStatus } from "../types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (task: Task, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
}

function TaskList({
  tasks,
  onStatusChange,
  onEdit,
  onDeleteRequest,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">
          Belum ada task di sini
        </p>

        <p className="empty-state__hint">
          Tambahkan task baru lewat form di atas, atau ganti filter
          untuk melihat task lain.
        </p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}

export default TaskList;