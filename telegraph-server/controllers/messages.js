import Messages from '../models/messages.js';
import User from '../models/users.js';

// CREATE
const createMessage = async (req, res) => {
    try {
        const newMessage = req.body;
        const message = new Messages(newMessage);
        await message.save();
        res.status(201).json(message);
        console.log(message);
        console.log("Message Created");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// READ
const getMessages = async (req, res) => {
    try {
        const messages = await Messages.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getRecievedMessages = async (req, res) => {
    try {
        const messages = await Messages.find({ receiverId: req.params.id });
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBroadCastMessages = async (req, res) => {
    try {
        const messages = await Messages.find({ receiverId: "all" });
        const users = await User.find();
        const updatedMessages = [];
        // add username to each message
        messages.forEach((message) => {
            const user = users.find((user) => user._id == message.senderId);
            message = message.toObject();
            message.senderName = user.username;
            updatedMessages.push(message);
        });
        res.status(200).json(updatedMessages);
    } catch (err) {
        res.status(404).json({ message: error.message });
    }
}


export { createMessage, getMessages, getRecievedMessages, getBroadCastMessages };