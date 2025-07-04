const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.updateUserByAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const updatedData = {};
    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
