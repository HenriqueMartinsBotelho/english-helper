import { useState, useEffect } from "react";
import defaultChats from "../constants/chat";

interface ChatItem {
  main: string;
  ans1: string;
  ans2: string;
}

type Chats = {
  [key: string]: ChatItem[];
};

function useChat() {
  const [chats, setChats] = useState<Chats>(() => {
    const storedChats = localStorage.getItem("chats");
    return storedChats ? JSON.parse(storedChats) : defaultChats;
  });

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const addChatItem = (chatKey: string, newChatItem: ChatItem) => {
    setChats((prevChats) => {
      const updatedChat = {
        ...prevChats,
        [chatKey]: [...(prevChats[chatKey] || []), newChatItem],
      };
      return updatedChat;
    });
  };

  const removeChatItem = (chatKey: string, index: number) => {
    setChats((prevChats) => {
      const updatedChat = {
        ...prevChats,
        [chatKey]: prevChats[chatKey].filter((_, i) => i !== index),
      };
      return updatedChat;
    });
  };

  return { chats, addChatItem, removeChatItem };
}

export default useChat;
