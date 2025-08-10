"use client"
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import { socket } from "@/socket";

export default function ChatForm() {
  const [content, setContent] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    socket.emit("chat", content, "💬");
    
  }
  function handleContentChange(e: ChangeEvent<HTMLInputElement>) {
    if (nonEmojiRegex.test(e.target.value)) {
      const audio = new Audio("/no.mp3#t=0.6");
      audio.play();
      return;
    }
    setContent(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      <input onChange={handleContentChange} value={content} className="bg-violet-500 border-2 border-slate-300 dark:border-slate-800 p-2 rounded-xl" />
      <div className="flex gap-2">
        <div className="bg-slate-500 border-2 border-slate-300 dark:border-slate-800 p-1 rounded-xl"><input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></div>
        <button type="submit" className="bg-violet-500 border-2 border-slate-300 dark:border-slate-800 p-2 rounded-xl"><FontAwesomeIcon icon={faComment} /></button>
      </div>
    </form>
  );
}
export const nonEmojiRegex = /[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~` ]/;