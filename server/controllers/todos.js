const fs = require("fs");
const path = require("path");
const { getFileDb, writeFileDb } = require("../services/service");
const { v4: uuidv4 } = require("uuid");

const getTodos = async (req, res) => {
  try {
    const { todos } = await getFileDb();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { todos } = await getFileDb();

    const newTodo = req.body;
    newTodo.id = uuidv4();
    todos.push(newTodo);

    await writeFileDb(todos);
    return res.status(200).json(newTodo);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodosDate = req.body;
    const { todos } = await getFileDb();
    console.log(updatedTodosDate);

    const todo = todos.find((item) => `${item.id}` === id);
    const newTodos = todos.map((item) => {
      if (`${item.id}` === id) {
        return {
          ...todo,
          ...updatedTodosDate,
        };
      } else {
        return item;
      }
    });
    await writeFileDb(newTodos);

    return res.status(200).json({ ...todo, ...updatedTodosDate });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { todos } = await getFileDb();
    const newTodos = todos.filter((item) => `${item.id}` !== id);

    await writeFileDb(newTodos);
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
