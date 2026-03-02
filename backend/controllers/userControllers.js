const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists with this email");
        }

        const newUser = new User({ name, email, password, phone });
        await newUser.save();

        res.status(201).send("User registered successfully!");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).send("Invalid email or password");
        }

        res.send(`Login successful! User type: ${user.role}`);
    } catch (err) {
        res.status(500).send("Server error");
    }
};