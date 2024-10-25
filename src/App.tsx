import { useState } from "react";

function App() {
  return (
    <>
      <div className="flex justify-center gap-4">
        <UserInputBox />
        <div className="w-[500px] h-full bg-green-400">a</div>
        <div className="w-[500px] h-full bg-blue-400">a</div>
      </div>
    </>
  );
}

export default App;

function UserInputBox() {
  const [userText, setUserText] = useState<string>("");

  const handleUserText = (value: string) => {
    setUserText(value);
  };

  return (
    <>
      <textarea
        className="w-[400px] h-[200px] border border-black  bg-slate-100"
        name="english-box"
        value={userText}
        onChange={(e) => handleUserText(e.target.value)}
      />
    </>
  );
}
