const { string, types } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    // Comment: String,
    // rating: {
    //     type: Number,
    //     min: 1,
    //     max: 5
    // },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true   // or false if you want it optional
  },
  
}, { timestamps: true });


module.exports = mongoose.model("Review", reviewSchema);