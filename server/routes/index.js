const { Router } = require("express");
const todoRouter = require("./todos");

const router = new Router();

router.use("/todos", todoRouter);

module.exports = router;
