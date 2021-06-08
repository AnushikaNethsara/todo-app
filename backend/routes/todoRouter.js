const router = require("express").Router();
const Todo = require("../models/todoModel");

// ***add todo***//
router.post("/add", async (req, res) => {
  try {
    let { todo, todo_status, user_id } = req.body;
    const NewTodo = new Todo({
      todo,
      todo_status,
      user_id,
    });

    const savedTodo = await NewTodo.save();
    res.status(200).json({ msg: "Successfully added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ***get todo by userid***//
router.get("/:id", async (req, res) => {
  await Todo.find({ user_id: req.params.id })
    .exec()
    .then((todo) => {
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//**** update todo ****//
router.put("/:id", async (req, res) => {
  try {
    await Todo.findById(req.params.id).then((todo) => {
      todo.todo_status = req.body.todo_status;

      todo
        .save()
        .then(() => res.status(200).json({ msg: "Todo Updated!" }))
        .catch((err) => res.status(400).json({ error: err.message }));
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ***get active todos by userid***//
router.get("/active/:id", async (req, res) => {
  await Todo.find({ user_id: req.params.id, todo_status: "active" })
    .exec()
    .then((todo) => {
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ***get completed todos by userid***//
router.get("/completed/:id", async (req, res) => {
  await Todo.find({ user_id: req.params.id, todo_status: "completed" })
    .exec()
    .then((todo) => {
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ***mark all as completed***//
router.post("/completed-all/:id", async (req, res) => {
  try {
    const result = await Todo.updateMany(
      { user_id: req.params.id },
      { $set: { todo_status: "completed" } }
    ).then(() => res.status(200).json({ msg: "Todos Updated!" }));
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ***mark all as active***//
router.post("/active-all/:id", async (req, res) => {
  try {
    const result = await Todo.updateMany(
      { user_id: req.params.id },
      { $set: { todo_status: "active" } }
    ).then(() => res.status(200).json({ msg: "Todos Updated!" }));
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
