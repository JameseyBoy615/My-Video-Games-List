//DEPENDENCIES
const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// Routes

// New

// router.get("/:listId/addGame", async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.session.user._id);

//     const list = currentUser.lists.id(req.params.listId);

//     console.log(req.params);
//     // console.log(list);

//     res.render("games/new.ejs", {
//       list: list,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/");
//   }
// });

module.exports = router;
