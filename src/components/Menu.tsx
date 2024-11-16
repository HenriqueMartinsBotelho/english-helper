import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Settings {
  privateKey: string;
  prompts: string[];
}

function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { value: storedSettings, setValue: setStoredSettings } =
    useLocalStorage<Settings>("settings", {
      privateKey: "",
      prompts: ["", ""],
    });

  const [settings, setSettings] = useState<Settings>(
    storedSettings || { privateKey: "", prompts: ["", ""] }
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStoredSettings(settings);
    setIsModalOpen(false);
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

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Bromodomo Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Bromodomo
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <a
              href="https://github.com/HenriqueMartinsBotelho/english-helper"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <FaGithub size={32} />
            </a>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  New Chat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <button
                  onClick={handleOpenModal}
                  className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isModalOpen && (
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
                  onClick={handleCloseModal}
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
      )}
    </header>
  );
}

export default Menu;
