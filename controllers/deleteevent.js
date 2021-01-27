const User = require("../models/user.js");
var Event = require("../models/event.js");

module.exports = function(req, res){
    User.find().where('name').equals(req.params.name)
    .then(
      u => {
        let user = u[0];
        Event.deleteOne({ name: req.params.fname }).then(
          res.redirect("/profile/"+user._id)
        );
      });
  }