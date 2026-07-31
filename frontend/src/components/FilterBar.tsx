import type { TaskStats, TaskStatus } from "../types/task";

type Filter = "all" | TaskStatus;

const FILTERS = [
  { key: "all", label: "Semua", statKey: "total" },
  { key: "Todo", label: "Todo", statKey: "todo" },
  { key: "In Progress", label: "In Progress", statKey: "in_progress" },
  { key: "Done", label: "Done", statKey: "done" },
] as const;

interface FilterBarProps {
  activeFilter: Filter;
  onChangeFilter: (filter: Filter) => void;
  stats: TaskStats | null;
}

function FilterBar({
  activeFilter,
  onChangeFilter,
  stats,
}: FilterBarProps) {
  return (
    <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Filter task berdasarkan status">
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.key;
        const count = stats ? stats[filter.statKey] : 0;

        return (
          <button
            key={filter.key}
            role="tab"
            aria-selected={isActive}
            className={`bg-[#f2f3f6] border border-transparent text-(--color-text-soft) rounded-full px-3.5 py-1.75 text-[0.85rem] font-semibold inline-flex items-center gap-1.75 transition-all duration-150 ease-out hover:text-(--color-text) ${
              isActive ? "bg-(--color-accent)! text-white!" : ""
            }`}
            onClick={() => onChangeFilter(filter.key)}
          >
            {filter.label}
            <span
              className={`rounded-full px-1.75 py-px text-[0.75rem] ${
                isActive ? "bg-white/25" : "bg-black/8"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;