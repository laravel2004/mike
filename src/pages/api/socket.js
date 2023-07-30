import { Server } from "socket.io";
import messageHandler from "@/utils/messageHandler";
import transcriptionResultsHandler from "@/utils/transcriptionResultsHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    socket.on("join-room", room => {
      socket.join(room)
      console.log("Room :" + room)
    })

    // socket.on("createdSpeech", result => {
    //   console.log(result)
    //   socket.broadcast.emit("incomingSpeech", result);
    // })

    messageHandler(socket);
    transcriptionResultsHandler(socket);
  };

  // Define actions inside
  io.on("connection", onConnection);

  // io.on("connection", socket => {
  //   const room = socket.handshake.query.room;
  //   console.log("Room: " + room);
  //   socket.join(room);

  //   socket.on("join-room", (room) => {
  //     console.log("Room: " + room);
  //     socket.join(room)
  //   })

  //   socket.on("created-message", message => {
  //     console.log("received: " + message.message);
  //     console.log("room: " + message.room);
  //     io.to(message.room).emit("incoming-message", message);
  //   })

  //   socket.on("createdSpeech", results => {
  //     io.to(results.room).emit("incomingSpeech", results);
  //   })
  // });

  console.log("Setting up socket");
  res.end();
}