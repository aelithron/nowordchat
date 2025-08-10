import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { nonEmojiRegex } from "./app/chat.form";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number.parseInt(process.env.PORT || "3000");
if (Number.isNaN(port)) throw new Error("Port is invalid!");
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);
  io.on("chat", (value: string, author: string) => {
    if (!value || nonEmojiRegex.test(value) || !author || nonEmojiRegex.test(author)) return;
    io.emit("message", value, author);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});