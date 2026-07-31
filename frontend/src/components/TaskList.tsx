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
      <div className="text-center px-5 py-12 text-(--color-text-soft)">
        <p className="font-bold text-(--color-text) m-0 mb-1.5">Belum ada task di sini</p>
        <p className="m-0 text-[0.9rem]">
          Tambahkan task baru lewat form di atas, atau ganti filter untuk melihat task lain.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-3.5">
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