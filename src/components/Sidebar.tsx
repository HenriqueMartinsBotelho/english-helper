export interface SidebarItem {
  name: string;
  current: boolean;
}

interface SideBarProps {
  sidebarItems: SidebarItem[];
  setSidebarItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}

import { useState } from "react";

const Sidebar = ({
  sidebarItems,
  setSidebarItems,
  setCurrentChat,
}: SideBarProps) => {
  const [newItemName, setNewItemName] = useState("");

  const addSidebarItem = () => {
    if (newItemName.trim()) {
      const newItem: SidebarItem = {
        name: newItemName,
        current: false,
      };
      setSidebarItems([...sidebarItems, newItem]);
      setNewItemName("");
    }
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
      </button>

      <aside
        id="default-sidebar"
        className="z-40 w-64 h-auto transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <div
                  onClick={() => setCurrentChat(item.name)}
                  className={`flex items-center p-2 rounded-lg group ${
                    item.current
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="ms-3">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full p-2 mb-2 text-sm text-gray-900 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white"
            />

            <button
              onClick={addSidebarItem}
              className="w-full p-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add New Item
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
