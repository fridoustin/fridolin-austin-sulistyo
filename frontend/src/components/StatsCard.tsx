import type { TaskStats } from "../types/task";

const STAT_ITEMS = [
  { key: "total", label: "Total Task", accent: "default" },
  { key: "todo", label: "Todo", accent: "todo" },
  { key: "in_progress", label: "In Progress", accent: "progress" },
  { key: "done", label: "Done", accent: "done" },
] as const;

const ACCENT_CLASS: Record<string, string> = {
  default: "border-t-[var(--color-accent)]",
  todo: "border-t-[var(--color-todo)]",
  progress: "border-t-[var(--color-progress)]",
  done: "border-t-[var(--color-done)]",
};

interface StatsCardProps {
  stats: TaskStats | null;
}

function StatsCard({ stats }: StatsCardProps) {
  return (
    <section
      className="grid grid-cols-4 gap-3.5 max-[720px]:grid-cols-2"
      aria-label="Ringkasan statistik task"
    >
      {STAT_ITEMS.map((item) => (
        <div
          key={item.key}
          className={`bg-(--color-surface) border border-(--color-border) rounded-md px-5 py-4.5 flex flex-col gap-1 shadow-(--shadow-card) border-t-[3px] ${ACCENT_CLASS[item.accent]}`}
        >
          <span className="font-bold text-[1.9rem] leading-none">
            {stats ? stats[item.key] : 0}
          </span>
          <span className="text-(--color-text-soft) text-[0.85rem]">
            {item.label}
          </span>
        </div>
      ))}
    </section>
  );
}

export default StatsCard;