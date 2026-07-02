import { styles } from "@/lib/styles";

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
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[#1a1a1a] text-lg font-semibold mb-2">{title}</h2>
        <p className="text-[#4a4035] text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button className={styles.btnOutline} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btnDestructive} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
