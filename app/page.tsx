import ChatForm from "./chat.form";
import ChatBox from "./chatbox.module";

export default function Home() {
  return (
    <div className="flex flex-col p-8 md:p-20 min-h-screen items-center">
      <h1 className="text-3xl">❌✍️💬</h1>
      <ChatForm />
      <ChatBox />
    </div>
  );
}
