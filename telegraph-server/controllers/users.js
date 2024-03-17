import Users from '../models/users.js';

const createUser = async (req, res) => {
    const user = req.body;
    console.log(user)
    const users = await Users.find({ username: user.username });
    try {
        if (users.length == 0) {
            const newUser = new Users(user);
            await newUser.save();
            res.status(201).json(newUser);
            console.log(newUser);
            console.log("User Created");
        } else {
            res.send({ message: "User_exists" });
            console.log("User already exists");
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const userid = req.params.userid;
    try {
        await Users.deleteOne({ _id: userid });
        res.status(200).json({ message: "success" });
        console.log("User Deleted");
    } catch (error) {
        res.status(404).json({ message: "failed" });
        console.log("Couldnot delete user");
    }
}

// Check if user exists
const checkUser = async (req, res) => {
    const user = req.body;
    try {
        const users = await Users.find({ username: user.username });
        if (users.length == 0) {
            res.status(404).send("failed");
            console.log("failed")
        }
        else if (users[0].password === user.password) {
            res.status(200).json(users[0]);
            console.log("success")
        } else {
            res.status(404).send("failed");
            console.log("failed")
        }
    } catch (error) {
        res.status(404).send("failed");
    }
}

export { createUser, getUsers, deleteUser, checkUser };