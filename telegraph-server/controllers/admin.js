import Admin from "../models/admin.js";

const adminLogin = async (req, res) => {
    try {
        const adminCredentials = req.body;
        const admin = new Admin(adminCredentials);
        const adminLogin = await Admin.findOne({ username: admin.username, password: admin.password });
        if (adminLogin) {
            res.send({
                message: "success"
            });
            console.log("success");
        } else {
            res.send({
                message: "failed"
            })
            console.log("failed");
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export { adminLogin };