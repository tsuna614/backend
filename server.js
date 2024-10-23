require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const travelRoute = require("./routes/travel.route");
const postRoute = require("./routes/post.route");
const bookRoute = require("./routes/book.route");
const messageRoute = require("./routes/message.route");
const loggerMiddleware = require("./middleware/logger.middleware");
const authMiddleware = require("./middleware/auth.middleware");
const cors = require("cors");
const http = require("http"); // Import http to create server for both HTTP and WS
const WebSocket = require("ws"); // Import WebSocket module
const Message = require("./models/message.model");

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.on("open", () => {
  console.log("Connected to database");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/auth", authRoute);
// app.use("/user", authMiddleware.isAuth, userRoute);
// app.use("/travel", authMiddleware.isAuth, travelRoute);
// app.use("/post", authMiddleware.isAuth, postRoute);

/* test */
app.use("/user", userRoute);
app.use("/travel", travelRoute);
app.use("/post", postRoute);
app.use("/book", bookRoute);
app.use("/message", messageRoute);

app.get("/test", () => {
  console.log("sent");
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

////////////////////////////////////////

// Create an HTTP server
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on("connection", (ws, req) => {
  const userId = req.url.split("=")[1]; // Assuming the user ID is passed as a query param like ws://server?userId=user1
  ws.userId = userId; // Associate the WebSocket connection with the user ID
  console.log(`User ${userId} connected`);

  // Send a welcome message to the connected client
  // ws.send(JSON.stringify({ message: "Welcome to WebSocket server!" }));

  // Listen for messages from clients
  ws.on("message", async (data) => {
    const { conversationId, message, sender, receiver } = JSON.parse(data);
    const newMessage = new Message({
      conversationId,
      message,
      sender,
      receiver,
    });

    try {
      await newMessage.save(); // Save the message in the database

      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          (client.userId === receiver || client.userId === sender)
        ) {
          // client.send(newMessage.message);
          client.send(JSON.stringify(newMessage));
        }
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

////////////////////////////////////////

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
