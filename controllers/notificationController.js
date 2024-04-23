const notificationModel = require("../models/notificationModel");
const chatModel = require("../models/chatModel");

exports.createNotification = async (req, res) => {
  try {
    const { chatId, senderId, isRead, date, text } = req.body;
    const chat = await chatModel.findById(chatId);
    console.log("chat", chat);

    const newNotif = new notificationModel({
      chatId,
      senderId,
      isRead,
      date,
      text,
    });

    // new notification
    const response = await newNotif.save();
    // console.log("response", response);
    // update chat notifications
    chat.notifications.push(response._id); // Use push instead of splice
    await chat.save();

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
