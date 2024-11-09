interface ChatItem {
  main: string;
  ans1: string;
  ans2: string;
}

type Chats = {
  [key: string]: ChatItem[];
};

const chats: Chats = {};

export default chats;
