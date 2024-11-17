import { useState } from "react";
import getAI from "../utils/ai";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ChatItem {
  main: string;
  ans1: string;
  ans2: string;
}

interface UserInputBoxProps {
  addChatItem: (chatKey: string, newChatItem: ChatItem) => void;
  currentChat: string;
}

interface Settings {
  privateKey: string;
  prompts: string[];
}

function UserInputBox({ addChatItem, currentChat }: UserInputBoxProps) {
  const [userText, setUserText] = useState<string>("");

  const { value: settingsValue } = useLocalStorage<Settings>("settings");
  const settings = settingsValue || { privateKey: "", prompts: ["", ""] };

  const privateKey = settings.privateKey;
  const prompt1Value = settings.prompts ? settings.prompts[0] : "";
  const prompt2Value = settings.prompts ? settings.prompts[1] : "";

  const handleUserText = (value: string) => {
    setUserText(value);
  };

  const handleSubmit = async () => {
    if (!userText.trim() || !privateKey) return;
    const main = userText;
    const ans1 = await getAI(
      privateKey,
      prompt1Value ||
        "Rewrite this text in a more natural and fluent English style:",
      userText
    );
    const ans2 = await getAI(
      privateKey,
      prompt2Value ||
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
        placeholder="Type something in English here..."
      />
    </div>
  );
}

export default UserInputBox;
