import type { TaskStats } from "../types/task";

const STAT_ITEMS = [
  { key: "total", label: "Total Task", accent: "default" },
  { key: "todo", label: "Todo", accent: "todo" },
  { key: "in_progress", label: "In Progress", accent: "progress" },
  { key: "done", label: "Done", accent: "done" },
] as const;

interface StatsCardProps {
  stats: TaskStats | null;
}

function StatsCard({ stats }: StatsCardProps) {
  return (
    <section className="stats-row" aria-label="Ringkasan statistik task">
      {STAT_ITEMS.map((item) => (
        <div key={item.key} className={`stat-card stat-card--${item.accent}`}>
          <span className="stat-card__value">
            {stats ? stats[item.key] : 0}
          </span>
          <span className="stat-card__label">{item.label}</span>
        </div>
      ))}
    </section>
  );
}

export default StatsCard;