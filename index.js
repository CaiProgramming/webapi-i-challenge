const express = require("express");
const app = express();
const users = require("./routes/user");

app.use("/api/users", users);

let server = app.listen(3000);
