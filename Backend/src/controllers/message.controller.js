import Meesage from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("error in meessage contoller file");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Meesage.find({
      $or: [
        {
          myId: myId,
          receiverId: userToChatId,
        },
        {
          myId: userToChatId,
          receiverId: myId,
        },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("error in meessage contoller file");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
        // upload base64image on cloudinary
        const uploadImage = await cloudinary.uploader.upload(image);
        imageUrl = uploadImage.secure_url;
    }

    const newMessage = newMessage({
        senderId,
        receiverId,
        text,
        image: imageUrl
    })

    await newMessage.save();

    // real time functionality goes here => socket.io

    res.status(201).json(newMessage)
  } catch (error) {
    console.log("error in send message controller file");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
