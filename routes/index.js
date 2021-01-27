var express = require('express');
var router = express.Router();
var passport = require('passport');
const User = require("..\\models\\user.js");
var Event = require("..\\models\\event.js");

var check_controller = require('../controllers/checkuser.js');
var intersect_controller = require('../controllers/intersect.js');
var addeventdb_controller = require('../controllers/addeventdb.js');
var deletefriend_controller = require('../controllers/deletefriend.js');
var addfriend_controller = require('../controllers/addfriend.js');
var profile_controller = require('../controllers/profile.js');
var deleteevent_controller = require('../controllers/deleteevent.js');


function authenticationMiddleware() {
  return function (req, res, next) {
      if (req.isAuthenticated()) {
          return next()
      }
      res.redirect('/createuser')
  }
}

//module.exports.authenticationMiddleware = authenticationMiddleware;

router.get("/createuser", function(req, res){
  res.render("createuser.hbs", {
    css: "/stylesheets/createuser.css"
  });
});

router.post("/login",
  passport.authenticate('local', { failureRedirect: '/wrongauth'}),
  function(req, res) {
    res.redirect('/profile/' + req.user._id);
  }
);

router.post("/checkuser", check_controller);

router.get("/alreadyhere", function(req, res){
  res.render("createuser.hbs", {
    css: "/stylesheets/alreadyhere.css"
  });
});

router.get("/wrongauth", function(req, res){
  res.render("createuser.hbs", {
    css: "/stylesheets/wrongauth.css"
  });
});

router.get("/profile/:id", authenticationMiddleware(), profile_controller);

router.post("/addfriend", authenticationMiddleware(), addfriend_controller);

router.get("/deletefriend/:myname/:fid", authenticationMiddleware(), deletefriend_controller);

router.get("/deleteevent/:name/:fname", authenticationMiddleware(), deleteevent_controller);

router.get("/addevent/:myname", authenticationMiddleware(), function(req, res){
  res.render("addevent.hbs", {
    css: "/stylesheets/createuser.css",
    n: req.params.myname
  });
})

router.get("/addeventdb", authenticationMiddleware(), addeventdb_controller)

router.get("/intersect/:name", authenticationMiddleware(), intersect_controller)

module.exports = router;
