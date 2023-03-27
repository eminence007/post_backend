const express = require("express");
const cors = require("cors");
const { connection } = require("./Configs/db");
const { Authentication } = require("./Middlewares/authentication");
const { PostRouter } = require("./Routes/post.router");
const { UserRouter } = require("./Routes/user.route");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", UserRouter);
app.use(Authentication);
app.use("/posts", PostRouter);

app.get("/", async (req, res) => {
  res.send("Home page");
});

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connection;
    console.log(`server is running at port ${port}`);
  } catch (error) {
    console.log("error", error);
  }
});
