import { useState } from "react";
import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import UserInputBox from "./components/UserInputBox";
import Box2 from "./components/Box2";
import useChat from "./hooks/useChat";
import { FaTrash } from "react-icons/fa";

function App() {
  const [currentChat, setCurrentChat] = useState<string>("Chat1");
  const { chats, addChatItem, removeChatItem } = useChat();

  const sidebarItems = [
    { name: "Chat1", link: "#", current: currentChat === "Chat1" },
    { name: "Chat2", link: "#", current: currentChat === "Chat2" },
  ];

  return (
    <div className="w-full">
      <Menu />
      <div className="flex bg-slate-400">
        <Sidebar sidebarItems={sidebarItems} setCurrentChat={setCurrentChat} />
        <div className="flex flex-col flex-wrap gap-4 p-4 mt-4">
          {chats[currentChat]?.map((chat, index) => (
            <div key={index} className="flex gap-4">
              <Box2 content={chat.main} />
              <Box2 content={chat.ans1} />
              <Box2 content={chat.ans2} />
              <FaTrash
                className="self-center text-red-500 cursor-pointer"
                onClick={() => removeChatItem(currentChat, index)}
              />
            </div>
          ))}
          <UserInputBox addChatItem={addChatItem} currentChat={currentChat} />
        </div>
      </div>
    </div>
  );
}

export default App;
