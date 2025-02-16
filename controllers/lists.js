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

// Delete

// Update

// Create

// Edit

// Show

module.exports = router;
