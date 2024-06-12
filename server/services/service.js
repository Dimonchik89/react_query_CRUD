const fs = require("fs");
const path = require("path");

const getFileDb = async () => {
  const db = await fs
    .readFileSync(path.join(__dirname, "..", "db.json"))
    .toString();
  return JSON.parse(db);
};

const writeFileDb = async (todos) => {
  fs.writeFileSync(
    path.join(__dirname, "..", "db.json"),
    JSON.stringify({ todos }, null, 2)
  );
};

module.exports = {
  getFileDb,
  writeFileDb,
};
