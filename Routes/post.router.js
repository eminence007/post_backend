const express = require("express");
const jwt = require("jsonwebtoken");
const { PostModel } = require("../Models/post.model");
const PostRouter = express.Router();

PostRouter.get("/", async (req, res) => {
  const { device } = req.query;
  const { userID } = req.body;
  try {
    const posts = await PostModel.find({
      $and: [{ userID }, { device: { $regex: device || "", $options: "i" } }],
    });
    res.status(200).json({ msg: "success", posts });
  } catch (error) {
    console.log("error: ", error);
    res.status(403).json({ "msg get post": error });
  }
});

PostRouter.get("/top", async (req, res) => {
  const userID = req.body.userID;
  try {
    const posts = await PostModel.find({ userID }).sort({ no_if_comments: -1 });
    res.status(200).json({ msg: "success", posts });
  } catch (error) {
    console.log("error: ", error);
    res.status(403).json({ msg: error });
  }
});

PostRouter.post("/add", async (req, res) => {
  const data = req.body;
  try {
    const posts = new PostModel(data);
    await posts.save();
    res.status(200).json({ msg: "new post has been added." });
  } catch (error) {
    console.log("error: ", error);
    res.status(403).json({ msg: error });
  }
});

PostRouter.patch("/update/:postId", async (req, res) => {
  const userID = req.body.userID;
  const { postId } = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id: postId }, req.body);
    res.send({ msg: "Updated Successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(403).json({ msg: error });
  }
});

PostRouter.delete("/delete/:postId", async (req, res) => {
  const userID = req.body.userID;
  const { postId } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id: postId });
    res.send({ msg: "Deleted Successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(403).json({ msg: error });
  }
});

module.exports = { PostRouter };
