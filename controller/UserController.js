const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Invalid User" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Invalid User" });
    }

    res.json({ message: "Login Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// signup controller
exports.signup = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { fullname, email, password, repassword } = req.body;

    if (!fullname || !email || !password || !repassword) {
      return res.json({ message: "All fields requird" });
    }

    if (password != repassword) {
      return res.json({ message: "Password do not match" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json({ message: "User Already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({ message: "Signup Success" });
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};
