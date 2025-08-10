"use client";
import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function ChatBox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<string>("N/A");
  useEffect(() => {
    if (socket.connected) onConnect();
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", (transport) => setTransport(transport.name));
    }
    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  socket.on("message", (value, author) => {
    messages.push(`${author} -> ${value}`);
  })
  return (
    <div className="gap-2 flex flex-col text-slate-500">
      <div className="bg-slate-500 flex flex-col justify-left p-2">
        {messages.map((message, index) => (
          <div key={index}>
            {message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <p>{isConnected ? "Connected" : "Disconnected"}</p>
        <p> - </p>
        <p>{transport}</p>
      </div>
    </div>
  );
}