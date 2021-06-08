const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  todo_status: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = Todo = mongoose.model("todo", todoSchema);
