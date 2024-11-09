interface ChatItem {
  main: string;
  column1: string;
  column2: string;
}

type Chats = {
  [key: string]: ChatItem[];
};

const chats: Chats = {
  Chat1: [
    {
      main: "text",
      column1: "other text",
      column2: "other text 2",
    },
    {
      main: "text 2",
      column1: "other text 2",
      column2: "other text 3",
    },
  ],
  Chat2: [
    {
      main: "text",
      column1: "other text",
      column2: "other text",
    },
    {
      main: "text aaa",
      column1: "other text bb",
      column2: "other text cc",
    },
  ],
};

export default chats;
