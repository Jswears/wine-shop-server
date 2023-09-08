const { Schema, model } = require("mongoose");

// Define the Wine schema
const wineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    grape: {
      type: String,
    },
    type: {
      type: String,
      enum: ["red", "white", "rose", "sparkling"],
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    desc: {
      type: String,
    },
    vintage: {
      type: Number,
    },
    winery: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Wine = model("Wine", wineSchema);

module.exports = Wine;
