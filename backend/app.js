import express from "express";
import cors from "cors";
import "dotenv/config";
import { Server } from "socket.io";
import http from "http";
import path from "path";

const __dirname = path.resolve();

const app = express();

const PORT = process.env.PORT || 5000;
const users = [];
const messages = [];

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get((_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

io.on("connection", (socket) => {

    socket.on("create-user", (displayName, email, pfp) => {
        const username = displayName;
        if (!username?.trim()) return;
        const existingUser = users.find((u) => u.id === socket.id);
        const user = {
            id: socket.id,
            username,
            displayName,
            email,
            pfp
        };
        if (existingUser) {
            existingUser.username = username;
            existingUser.displayName = displayName;
            existingUser.email = email;
            existingUser.pfp = pfp;
        } else {
            users.push(user);
        }
        socket.emit("chat-history", messages);
        socket.emit("user-created", user);
        io.emit("get-users", users);
    });

    socket.on("send-msg", (msg) => {
        const sender = users.find((u) => u.id === socket.id);
        if (!sender) return;
        const message = {
            ...sender,
            msg,
            time: Date.now()
        };
        messages.push(message);
        if (messages.length > 50) {
            messages.shift();
        }

        io.emit("receive-msg", message);
    });

    socket.on("disconnect", () => {
        const index = users.findIndex((u) => u.id === socket.id);
        if (index !== -1) {
            users.splice(index, 1);
        }
        io.emit("get-users", users);
    });
})

server.listen(PORT, "0.0.0.0", () => {
    console.log(`server started on port ${PORT}`);
})
