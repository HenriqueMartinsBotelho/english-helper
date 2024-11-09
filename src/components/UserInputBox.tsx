import { useState } from "react";
import getAI from "../utils/ai";

interface ChatItem {
  main: string;
  ans1: string;
  ans2: string;
}

interface UserInputBoxProps {
  addChatItem: (chatKey: string, newChatItem: ChatItem) => void;
  currentChat: string;
}

function UserInputBox({ addChatItem, currentChat }: UserInputBoxProps) {
  const [userText, setUserText] = useState<string>("");

  const handleUserText = (value: string) => {
    setUserText(value);
  };

  const handleSubmit = async () => {
    if (!userText.trim()) return; // Prevent submission if the text is empty
    const main = userText;
    const ans1 = await getAI("Improve the text", userText);
    const ans2 = await getAI("Fix the grammatical errors", userText);

    const newChatItem = {
      main,
      ans1,
      ans2,
    };

    addChatItem(currentChat, newChatItem);
    setUserText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div>
      <textarea
        className="w-[400px] h-[200px] border border-black bg-slate-100 p-2"
        name="english-box"
        value={userText}
        onChange={(e) => handleUserText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default UserInputBox;
