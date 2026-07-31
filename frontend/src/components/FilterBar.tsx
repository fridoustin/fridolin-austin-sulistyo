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
    <div
      className="filter-bar"
      role="tablist"
      aria-label="Filter task berdasarkan status"
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.key;
        const count = stats ? stats[filter.statKey] : 0;

        return (
          <button
            key={filter.key}
            role="tab"
            aria-selected={isActive}
            className={`filter-pill ${
              isActive ? "filter-pill--active" : ""
            }`}
            onClick={() => onChangeFilter(filter.key)}
          >
            {filter.label}
            <span className="filter-pill__count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;