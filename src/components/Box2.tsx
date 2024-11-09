interface Box2Props {
  content: string;
}

function Box2({ content }: Box2Props) {
  return (
    <div className="w-[500px] h-fit break-words bg-green-400 p-4">
      {content}
    </div>
  );
}

export default Box2;
