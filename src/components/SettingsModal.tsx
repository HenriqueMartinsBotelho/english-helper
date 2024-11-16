import { useState } from "react";

interface Settings {
  privateKey: string;
  prompts: string[];
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSettings: Settings;
  onSave: (settings: Settings) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  initialSettings,
  onSave,
}: SettingsModalProps) {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "privateKey") {
      setSettings({ ...settings, privateKey: value });
    } else if (name.startsWith("prompt")) {
      const index = parseInt(name.replace("prompt", "")) - 1;
      const newPrompts = [...settings.prompts];
      newPrompts[index] = value;
      setSettings({ ...settings, prompts: newPrompts });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-semibold">Settings</h2>
        <form onSubmit={handleSaveSettings}>
          <div className="mb-4">
            <label
              htmlFor="privateKey"
              className="block text-sm font-medium text-gray-700"
            >
              Private Key
            </label>
            <input
              type="password"
              id="privateKey"
              name="privateKey"
              value={settings.privateKey}
              onChange={handleChange}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {settings.prompts.map((prompt, index) => (
            <div className="mb-4" key={index}>
              <label
                htmlFor={`prompt${index + 1}`}
                className="block text-sm font-medium text-gray-700"
              >
                Prompt {index + 1}
              </label>
              <textarea
                id={`prompt${index + 1}`}
                name={`prompt${index + 1}`}
                value={prompt}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
