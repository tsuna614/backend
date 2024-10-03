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
const loggerMiddleware = require("./middleware/logger.middleware");
const authMiddleware = require("./middleware/auth.middleware");

/////////////////////////////////

// const webserver = express()
//  .use((req, res) =>
//    res.sendFile('/websocket-client.html', { root: __dirname })
//  )
//  .listen(3000, () => console.log(`Listening on ${3000}`))

// const { WebSocketServer } = require('ws')
// const sockserver = new WebSocketServer({ port: 443 })

/////////////////////////////////

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.on("open", () => {
  console.log("Connected to database");
});

app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/test", () => {
  console.log("sent");
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
