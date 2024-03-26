const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true, // Removes whitespace from both ends of the string
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    trim: true, // Removes whitespace from both ends of the string
    lowercase: true, // Converts email to lowercase
    validate: {
      validator: function (value) {
        // Regular expression for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  mobileNumber: {
    type: String,
    validate: {
      validator: function (value) {
        // Regular expression for mobile number validation
        return /^[0-9]{10}$/.test(value); // Assuming a 10-digit mobile number format
      },
      message: "Invalid mobile number",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
 
});

module.exports = mongoose.model("User", userSchema);
