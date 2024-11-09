import { useState } from "react";
import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import chats from "./constants/chat";
import UserInputBox from "./components/UserInputBox";
import Box2 from "./components/Box2";

function App() {
  const [currentChat, setCurrentChat] = useState<string>("Chat1");

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
          {chats[currentChat].map((chat, index) => (
            <div key={index} className="flex gap-4">
              <UserInputBox />
              <Box2 content={chat.column1} />
              <Box2 content={chat.column2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
