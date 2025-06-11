const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc Register a new user
// @route POST /api/auth/register
// @access Public 
const subscribeUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        let role = "member";

        const password = "password";
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            profileImageUrl: "",
            role
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error", error: error.message
        });
    }
};

module.exports = { subscribeUser };