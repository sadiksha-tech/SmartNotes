// ---------------------------------------
// 📌 Imports
// ---------------------------------------
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ---------------------------------------
// 📌 Controller
// ---------------------------------------
module.exports = {
  // -------------------------
  // REGISTER
  // -------------------------
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Duplicate check
      const existing = await User.findOne({ where: { email } });
      if (existing)
        return res.status(400).json({ message: "Email already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // -------------------------
  // LOGIN
  // -------------------------
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid password" });

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,   
        { expiresIn: "1d" }
      );

      return res.json({
        message: "Login successful",
        token,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
