import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface SidebarItem {
  name: string;
  current: boolean;
}

type UseSidebarReturn = {
  sidebarItems: SidebarItem[];
  setSidebarItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
};

export const useSidebar = (): UseSidebarReturn => {
  const { value: storedItems, setValue: setStoredItems } = useLocalStorage<
    SidebarItem[]
  >("sidebarItems", []);
  const [sidebarItems, setSidebarItemsState] = useState<SidebarItem[]>(
    storedItems || []
  );

  useEffect(() => {
    setStoredItems(sidebarItems);
  }, [sidebarItems, setStoredItems]);

  const setSidebarItems: React.Dispatch<React.SetStateAction<SidebarItem[]>> = (
    action
  ) => {
    if (typeof action === "function") {
      setSidebarItemsState((prevState) => {
        const newState = action(prevState);
        return newState;
      });
    } else {
      setSidebarItemsState(action);
    }
  };

  return { sidebarItems, setSidebarItems };
};
