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
    if (!userText.trim()) return;
    const main = userText;
    const ans1 = await getAI(
      "Rewrite this text in a more natural and fluent English style:",
      userText
    );
    const ans2 = await getAI(
      "Find grammar issues, briefly explain why they are incorrect, and provide a corrected version of this text:",
      userText
    );

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
        placeholder="Type something in english here..."
      />
    </div>
  );
}

export default UserInputBox;
