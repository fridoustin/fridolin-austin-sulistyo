import type { Task } from "../types/task";

interface ConfirmDialogProps {
  task: Task;
  onConfirm: (id: number) => void;
  onCancel: () => void;
}

function ConfirmDialog({
  task,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 bg-[rgba(15,17,24,0.45)] flex items-center justify-center p-5 z-100 animate-[fadeIn_0.15s_ease]"
      onMouseDown={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-95 shadow-(--shadow-pop) animate-[popIn_0.15s_ease]"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h2 id="confirm-title" className="font-bold text-[1.05rem] m-0 mb-4">
          Hapus task ini?
        </h2>

        <p className="text-(--color-text-soft) text-[0.92rem] leading-normal m-0 mb-5">
          "{task.title}" akan dihapus secara permanen dan tidak bisa dikembalikan.
        </p>

        <div className="flex justify-end gap-2.5 mt-1.5">
          <button
            className="border-none rounded-sm font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] px-4.5 py-2.5 text-[0.9rem] bg-transparent text-(--color-text-soft) border border-(--color-border) hover:bg-[#f2f3f6] hover:text-(--color-text)"
            onClick={onCancel}
          >
            Batal
          </button>

          <button
            className="border-none rounded-sm font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] px-4.5 py-2.5 text-[0.9rem] bg-(--color-danger) text-white hover:bg-[#b32e2e]"
            onClick={() => onConfirm(task.id)}
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;