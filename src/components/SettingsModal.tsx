import { useSettings } from "@/context/SettingsContext";
import { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-gray-900 text-lg font-semibold mb-6">Settings</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Duration (minutes)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Break (minutes)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Long Break (minutes)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sessions before long break
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none"
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
        <button
          className="px-3 py-1 rounded-full font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            updateSettings(localSettings);
            onClose();
          }}
        >
          Save
        </button>
        <button
          className="px-3 py-1 mx-3 rounded-full font-medium transition-colors bg-gray-500 hover:bg-gray-600 text-white"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
