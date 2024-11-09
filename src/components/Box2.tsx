interface Box2Props {
  content: string;
}

function Box2({ content }: Box2Props) {
  return (
    <div className="w-[400px] h-[200px] border border-black bg-slate-100 p-2">
      {content}
    </div>
  );
}

export default Box2;
