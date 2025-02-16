//DEPENDENCIES
const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// ROUTES

// Index

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.render("lists/index.ejs", {
      lists: currentUser.lists,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// New

router.get("/new", async (req, res) => {
  res.render("lists/new.ejs");
});

// Delete

router.delete("/:listId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.lists.id(req.params.listId).deleteOne();

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/lists`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Update

// Create

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const newList = {
      title: req.body.title,
      description: req.body.description,
      games: [],
    };

    currentUser.lists.push(newList);

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/lists`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Edit

// Show

router.get("/:listId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    res.render("lists/show.ejs", {
      list: list,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
