const chatModel = require("../models/chatModel");

// findUserChats

exports.findUserChats = async (req, res) => {
  const userId = req.params.userID;
  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    // .populate("Notification");
    res.send(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// createChat
exports.createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;
    // const chat = await chatModel.findOne({
    //   members: { $all: [firstId, secondId] },
    // });
    // if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [firstId, secondId],
    });

    const response = await newChat.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// findChat

exports.findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updateChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const result = await chatModel.findByIdAndUpdate(chatId, req.body, {
      new: true,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
