import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log("User added:", userId, "Socket:", socket.id);
    console.log("Online users:", onlineUser);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    
    // ✅ CRITICAL FIX: Check if receiver exists before emitting
    if (receiver && receiver.socketId) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log("Message sent to:", receiverId);
    } else {
      console.log("Receiver not online:", receiverId);
      // Message is already saved in database, receiver will see it when they connect
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
    console.log("Online users after disconnect:", onlineUser);
  });
});

io.listen("4000");