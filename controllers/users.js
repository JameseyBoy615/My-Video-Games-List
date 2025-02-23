const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.render("users/index.ejs", {
      users,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    res.render("users/show.ejs", { user });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:userId/:listId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const list = user.lists.id(req.params.listId);

    const covers = [];

    for (let game of list.games) {
      const request = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": process.env.Client_ID,
          Authorization: `Bearer ${process.env.Access_token}`,
        },
        body: `fields cover.image_id; limit 1; search "${game.title}";`,
      });
      const response = await request.json();
      const cover = response[0].cover.image_id;
      covers.push(cover);
    }

    res.render("users/lists/show.ejs", {
      user,
      list: list,
      covers: covers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
