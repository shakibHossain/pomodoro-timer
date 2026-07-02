import { useSettings } from "@/context/SettingsContext";
import { styles } from "@/lib/styles";
import { useEffect, useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[#1a1a1a] text-lg font-semibold mb-6">Settings</h2>
        <div className="mb-4">
          <label className={styles.labelBase}>Daily Goal (pomodoros)</label>
          <input
            type="number"
            className={styles.inputBase}
            value={localSettings.dailyGoal}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                dailyGoal: Number(e.target.value),
              })
            }
            min={1}
            max={20}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labelBase}>Work Duration (minutes)</label>
          <input
            type="number"
            className={styles.inputBase}
            value={localSettings.workDuration / 60}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                workDuration: Number(e.target.value) * 60,
              })
            }
            min={1}
            max={60}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labelBase}>Short Break (minutes)</label>
          <input
            type="number"
            className={styles.inputBase}
            value={localSettings.shortBreak / 60}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                shortBreak: Number(e.target.value) * 60,
              })
            }
            min={1}
            max={60}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labelBase}>Long Break (minutes)</label>
          <input
            type="number"
            className={styles.inputBase}
            value={localSettings.longBreak / 60}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                longBreak: Number(e.target.value) * 60,
              })
            }
            min={1}
            max={60}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labelBase}>Sessions before long break</label>
          <input
            type="number"
            className={styles.inputBase}
            value={localSettings.breakAfterSessionCount}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                breakAfterSessionCount: Number(e.target.value),
              })
            }
            min={1}
            max={10}
          />
        </div>
        <div className="flex gap-3 mt-6">
          <button className={styles.btnOutline} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.btnPrimarySmall}
            onClick={() => {
              updateSettings(localSettings);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
