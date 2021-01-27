const User = require("../models/user.js");
var Event = require("../models/event.js");

module.exports = function(req, res){
    User.find().where('_id').equals(req.params.id).populate('friends')
    .then(t => {
      let fuser = t[0];
      Event.find()
      .where('user')
      .equals(fuser._id)
      .then(
        e => {
          res.render("profile.hbs", {
          myname: fuser.name,
          events: e,
          friends: fuser.friends
        });
      }
      );
    })
  }