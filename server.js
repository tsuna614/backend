require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/user.route");
const tourRoute = require("./routes/tour.route");
const loggerMiddleware = require("./middleware/logger.middleware");

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

app.use("/user", userRoute);
app.use("/tour", tourRoute);

app.get("/test", () => {
    console.log("sent");
})

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})