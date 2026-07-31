import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import * as api from "./api/taskapi";

import StatsCard from "./components/StatsCard";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import EditModal from "./components/EditModal";
import ConfirmDialog from "./components/ConfirmDialog";
import Notification from "./components/Notification";

import type {
  Task,
  TaskCreate,
  TaskUpdate,
  TaskStatus,
  TaskStats,
} from "./types/task";

type NotificationType = "success" | "error";

interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>("");

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const notifId = useRef<number>(0);

  const notify = useCallback(
    (type: NotificationType, message: string) => {
      notifId.current += 1;

      setNotifications((prev) => [
        ...prev,
        {
          id: notifId.current,
          type,
          message,
        },
      ]);
    },
    []
  );

  const dismissNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const loadAll = useCallback(async () => {
    try {
      setLoading(true);

      const [tasksData, statsData] = await Promise.all([
        api.getTasks(),
        api.getStats(),
      ]);

      setTasks(tasksData);
      setStats(statsData);
      setLoadError("");
    } catch {
      setLoadError(
        "Gagal memuat data dari server. Pastikan backend berjalan dan VITE_API_URL sudah benar."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const computeLocalStats = (list: Task[]): TaskStats => ({
    total: list.length,
    todo: list.filter((t) => t.status === "Todo").length,
    in_progress: list.filter((t) => t.status === "In Progress").length,
    done: list.filter((t) => t.status === "Done").length,
  });

  const refreshStats = async () => {
    try {
      const statsData = await api.getStats();
      setStats(statsData);
    } catch {
      // Tetap gunakan statistik lokal jika request gagal
    }
  };

  const handleAddTask = async (payload: TaskCreate) => {
    const created = await api.createTask(payload);

    setTasks((prev) => [created, ...prev]);

    notify("success", "Task berhasil ditambahkan");

    refreshStats();
  };

  const handleStatusChange = async (
    task: Task,
    newStatus: TaskStatus
  ) => {
    if (newStatus === task.status) return;

    const previousTasks = [...tasks];

    const optimisticTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    );

    setTasks(optimisticTasks);
    setStats(computeLocalStats(optimisticTasks));

    try {
      const updated = await api.updateTask(task.id, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updated : t))
      );

      notify(
        "success",
        `Status "${task.title}" diubah ke ${newStatus}`
      );

      refreshStats();
    } catch {
      setTasks(previousTasks);
      setStats(computeLocalStats(previousTasks));

      notify("error", "Gagal mengubah status task");
    }
  };

  const handleEditSave = async (
    id: number,
    payload: TaskUpdate
  ) => {
    const updated = await api.updateTask(id, payload);

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );

    setEditingTask(null);

    notify("success", "Perubahan task berhasil disimpan");

    refreshStats();
  };

  const handleDeleteConfirm = async (id: number) => {
    const previousTasks = [...tasks];

    const taskBeingDeleted = tasks.find((t) => t.id === id);

    const optimisticTasks = tasks.filter((t) => t.id !== id);

    setTasks(optimisticTasks);
    setStats(computeLocalStats(optimisticTasks));

    setDeletingTask(null);

    try {
      await api.deleteTask(id);

      notify(
        "success",
        `"${taskBeingDeleted?.title}" berhasil dihapus`
      );

      refreshStats();
    } catch {
      setTasks(previousTasks);
      setStats(computeLocalStats(previousTasks));

      notify("error", "Gagal menghapus task");
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-header__title">Task Tracker</h1>
          <p className="app-header__subtitle">
            Manajemen tugas tim internal
          </p>
        </div>
      </header>

      <main className="app-main">
        <StatsCard stats={stats} />

        {loadError && (
          <div className="banner banner--error">
            {loadError}
          </div>
        )}

        <TaskForm onAddTask={handleAddTask} />

        <section className="card task-list-section">
          <div className="task-list-section__header">
            <h2 className="card__title">Daftar Task</h2>

            <FilterBar
              activeFilter={filter}
              onChangeFilter={setFilter}
              stats={stats}
            />
          </div>

          {loading ? (
            <p className="loading-text">Memuat task...</p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onEdit={setEditingTask}
              onDeleteRequest={setDeletingTask}
            />
          )}
        </section>
      </main>

      {editingTask && (
        <EditModal
          task={editingTask}
          onSave={handleEditSave}
          onCancel={() => setEditingTask(null)}
        />
      )}

      {deletingTask && (
        <ConfirmDialog
          task={deletingTask}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingTask(null)}
        />
      )}

      <Notification
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}

export default App;