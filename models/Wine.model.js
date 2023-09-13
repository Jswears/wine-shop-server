const { Schema, model } = require("mongoose");

// Define the Wine schema
const wineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    grape: String,
    category: {
      type: String,
      enum: ["Red", "White", "Rosé", "Sparkling"],
      required: true,
    },
    description: String,
    vintage: String,
    winery: String,
    country: String,
    region: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        value: { type: Number, min: 1, max: 5 },
      },
    ],
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
      },
    ],
    image: String,
  },
  {
    timestamps: true,
  }
);

const Wine = model("Wine", wineSchema);

module.exports = Wine;