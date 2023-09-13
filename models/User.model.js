const { Schema, model } = require("mongoose");

// Define the User schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    // You can add more user-specific fields here, such as address, phone number, etc.
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    phoneNumber: String,
    // Define a field to store the user's role (e.g., 'customer', 'admin')
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    // Reference to orders placed by the user
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
