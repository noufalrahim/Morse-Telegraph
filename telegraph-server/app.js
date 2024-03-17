import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { decodeMorse } from "./controllers/telegraph.js";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routes/users.js";
import MessagesRouter from "./routes/messages.js";
import AdminRouter from "./routes/admin.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define MongoDB models and schemas if needed

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//ROUTES
app.use("/users", usersRouter);
app.use("/messages", MessagesRouter);
app.use("/admin", AdminRouter);

const clients = new Map();

io.on("connection", (socket) => {
  console.log("A user connected with id: ", socket.id);
  socket.emit("start", socket.id);
  socket.on("start", (msg) => {
    console.log(msg);
    clients.set(msg.userId, { socketId: socket.id, userName: msg.userName });
    console.log(clients);
  });

  socket.on("channels", (msg) => {
    console.log("channels");
    // convert to array of objects
    const clientsArr = [];
    for (let [key, value] of clients) {
      clientsArr.push({
        userId: key,
        socketId: value.socketId,
        userName: value.userName,
      });
    } 
    console.log(clientsArr);
    socket.emit("channels", clientsArr);
  });

  socket.on("message", (data) => {
    console.log("received: sdvv");
    console.log(data);
    console.log(clients);
    const message = decodeMorse(data.message, data.userId, data.receiverId);
    if (data.receiverId === "all") {
      socket.broadcast.emit("message", {
        message: message.result,
        method: message.method,
        userName: clients.get(data.userId) ? clients.get(data.userId).userName : "Anonymous",
      }); // Broadcast received message to all other clients
    } else {
      const receiverSocket = clients.get(data.receiverId) ? clients.get(data.receiverId).socketId : null;
      if (receiverSocket) {
        socket.to(receiverSocket).emit("message", {
          message: message.result,
          method: message.method,
          userName: clients.get(data.userId) ? clients.get(data.userId).userName : "Anonymous",
        });
      }
      else console.log("Receiver not found");
    }
    socket.emit("message", {
      message: message.result,
      method: message.method,
      userName: clients.get(data.userId) ? clients.get(data.userId).userName : "Anonymous",
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    clients.delete(socket.id);
    console.log(clients.size);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
