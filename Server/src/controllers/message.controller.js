import Message from '../models/messages.model.js';
import User from "../models/users.model.js"; 
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggendInUserID = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggendInUserID}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}


export const getMessages = async (req, res) => {
    try {
        const { id:otherUserId } = req.params;
        const currUserId = req.user._id; 
        console.log(currUserId, otherUserId)
        const messages =  await Message.find({
            $or: [
                {senderId: currUserId, receiverId:otherUserId},
                {senderId: otherUserId, receiverId: currUserId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        let messageSent = await newMessage.save();

         //todo: real time functionality goes here => socket.io

        res.status(200).json(messageSent)

    
    } catch (error) {
        console.log("Error in sendMessage: ", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}