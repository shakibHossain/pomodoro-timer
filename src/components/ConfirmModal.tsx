interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel,
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#e8ddc4] rounded-2xl p-6 w-full max-w-xs mx-4 border border-[#c9bb95]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[#1a1a1a] text-lg font-semibold mb-2">{title}</h2>
        <p className="text-[#4a4035] text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            className="flex-1 px-4 py-2 rounded-full border border-[#c9bb95] text-[#4a4035] text-sm hover:text-[#1a1a1a] transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-2 rounded-full bg-[#d4795a] text-white text-sm hover:bg-[#c06848] transition-colors"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
