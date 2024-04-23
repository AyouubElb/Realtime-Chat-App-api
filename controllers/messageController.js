const messageModel = require("../models/messageModel");

//create message
exports.createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({ chatId, senderId, text });
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//get Messages

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
