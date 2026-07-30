import axios from "axios";
import type {
  Task,
  TaskCreate,
  TaskUpdate,
  TaskStats,
} from "../types/task";

// Wajib lewat environment variable, tidak boleh hardcode localhost:8000
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error(
    "VITE_API_URL belum di-set. Salin .env.example menjadi .env di folder frontend."
  );
}

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await client.get<Task[]>("/tasks");
  return data;
};

export const getStats = async (): Promise<TaskStats> => {
  const { data } = await client.get<TaskStats>("/tasks/stats");
  return data;
};

export const createTask = async (
  payload: TaskCreate
): Promise<Task> => {
  const { data } = await client.post<Task>("/tasks", payload);
  return data;
};

export const updateTask = async (
  id: number,
  payload: TaskUpdate
): Promise<Task> => {
  const { data } = await client.put<Task>(`/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await client.delete(`/tasks/${id}`);
};