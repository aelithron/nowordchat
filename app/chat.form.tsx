"use client"
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Emoji } from "emoji-type";
import { FormEvent, useState } from "react";

export default function ChatForm() {
  const [color, setColor] = useState<string>("#000000");
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <div className="bg-slate-500 border-2 border-slate-300 dark:border-slate-800 p-1 rounded-xl"><input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></div>
      <button type="submit" className="bg-violet-500 border-2 border-slate-300 dark:border-slate-800 p-2 rounded-xl"><FontAwesomeIcon icon={faComment} /></button>
    </form>
  );
}