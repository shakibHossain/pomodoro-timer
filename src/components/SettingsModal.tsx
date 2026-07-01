import { useSettings } from "@/context/SettingsContext";
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
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#e8ddc4] rounded-2xl p-6 w-full max-w-sm mx-4 border border-[#c9bb95]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[#1a1a1a] text-lg font-semibold mb-6">Settings</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#6b6354] mb-1">
            Daily Goal (pomodoros)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[#c9bb95] rounded-lg text-sm text-[#1a1a1a] bg-[#f4ead0] focus:outline-none focus:ring-2 focus:ring-[#d4795a]"
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
          <label className="block text-sm font-medium text-[#6b6354] mb-1">
            Work Duration (minutes)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[#c9bb95] rounded-lg text-sm text-[#1a1a1a] bg-[#f4ead0] focus:outline-none focus:ring-2 focus:ring-[#d4795a]"
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
          <label className="block text-sm font-medium text-[#6b6354] mb-1">
            Short Break (minutes)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[#c9bb95] rounded-lg text-sm text-[#1a1a1a] bg-[#f4ead0] focus:outline-none focus:ring-2 focus:ring-[#d4795a]"
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
          <label className="block text-sm font-medium text-[#6b6354] mb-1">
            Long Break (minutes)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[#c9bb95] rounded-lg text-sm text-[#1a1a1a] bg-[#f4ead0] focus:outline-none focus:ring-2 focus:ring-[#d4795a]"
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
          <label className="block text-sm font-medium text-[#6b6354] mb-1">
            Sessions before long break
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[#c9bb95] rounded-lg text-sm text-[#1a1a1a] bg-[#f4ead0] focus:outline-none focus:ring-2 focus:ring-[#d4795a]"
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
          <button
            className="px-4 py-2 rounded-full border border-[#c9bb95] text-[#6b6354] hover:text-[#1a1a1a] text-sm transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-full bg-[#f2c94c] hover:bg-[#e0b73a] text-[#1a1a1a] text-sm font-medium transition-colors"
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
