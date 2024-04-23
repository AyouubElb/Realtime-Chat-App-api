const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import Routes
const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");
const imageRoutes = require("./routes/imageRoute");
const notificationRoutes = require("./routes/notificationRoute");

// config app
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes Middleware
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/notifications", notificationRoutes);

//Run the app
const port = process.env.PORT || 5000;

// DB mongodb
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Database is connected ...");
    // Save the images to the "uploads" directory
    // uploadImages();
  })
  .catch((err) => console.log(`Database could not connect ... ${err}`));

app.listen(port, () => console.log(`App is running on port : ${port}`));
