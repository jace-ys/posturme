consts mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  points: Number,
  percentage: [Number],
});

modeule.exports = mongoose.model("User", UserSchema);
