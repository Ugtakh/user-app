const express = require("express");
const fs = require("fs");
const cors = require("cors"); // file system

const app = express();

app.use(cors());
app.use(express.json()); //middleware

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);
  console.log("DATA", data);
  res.status(200).json({ users: obData.employees });
});

app.post("/users", (req, res) => {
  console.log("BODY", req.body);

  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const newUser = {
    eid: `${employees.length + 1}`,
    ...req.body, //spread
  };
  employees.push(newUser); // [ {}, {},{} ]
  fs.writeFileSync("./users.json", JSON.stringify({ employees })); // {user: []}
  res.status(201).json({ user: newUser });
});

app.put("/users/:userId", (req, res) => {
  console.log("PUT-", req.params.userId);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const findIndex = employees.findIndex(
    (user) => user.eid === req.params.userId
  );
  console.log("PUT-INDEX", findIndex);
  if (findIndex > -1) {
    employees[findIndex] = { ...employees[findIndex], ...req.body };
    fs.writeFileSync("./users.json", JSON.stringify({ employees }));
    res.status(200).json({ user: employees[findIndex] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const findIndex = users.findIndex((user) => user.id === req.params.id);
  if (findIndex > -1) {
    const deletedUser = users.splice(findIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.listen(8000, () => {
  console.log("Server is running at localhost:8000");
});
