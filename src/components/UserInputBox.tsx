import { useState } from "react";

function UserInputBox() {
  const [userText, setUserText] = useState<string>("");

  const handleUserText = (value: string) => {
    setUserText(value);
  };

  return (
    <textarea
      className="w-[400px] h-[200px] border border-black bg-slate-100 p-2"
      name="english-box"
      value={userText}
      onChange={(e) => handleUserText(e.target.value)}
    />
  );
}

export default UserInputBox;
