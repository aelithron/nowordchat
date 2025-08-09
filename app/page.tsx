import ChatForm from "./chat.form";

export default function Home() {
  return (
    <div className="flex flex-col p-8 md:p-20 min-h-screen items-center">
      <h1 className="text-3xl">❌⌨️💬</h1>
      <ChatForm />
    </div>
  );
}
