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

router.get("/:listId/addGame", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    res.render("games/new.ejs", {
      list: list,
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

router.get("/:listId/addGame", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    res.render("games/new.ejs", {
      list: list,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
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

router.delete("/:listId/:gameId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    list.games.id(req.params.gameId).deleteOne();

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/lists/${req.params.listId}`);
  } catch (error) {
    console.log(error);
    res.redirect(``);
  }
});

// Update

router.put("/:listId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    list.set(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/lists/${req.params.listId}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:listId/:gameId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    const game = list.games.id(req.params.gameId);

    game.set(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/lists/${req.params.listId}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

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

router.post("/:listId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    const newGame = {
      title: req.body.title,
      rating: req.body.rating,
      review: req.body.review,
    };

    list.games.push(newGame);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/lists/${list._id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Edit

router.get("/:listId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    res.render("lists/edit.ejs", {
      list: list,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:listId/:gameId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

    const game = list.games.id(req.params.gameId);

    res.render("games/edit.ejs", {
      list: list,
      game: game,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Show

router.get("/:listId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const list = currentUser.lists.id(req.params.listId);

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

    res.render("lists/show.ejs", {
      list: list,
      game: list.games,
      covers: covers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
