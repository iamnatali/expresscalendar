const User = require("..\\models\\user.js");
var Event = require("..\\models\\event.js");

module.exports = function(req, res){
    User.find().where('name').equals(req.query.user)
    .then(t => {
      let fuser = t[0];
      console.log(req.query.start_date+"T"+req.query.start_time);
      let event = new Event({user:fuser._id, 
        name:req.query.name,
        start:req.query.start_date+"T"+req.query.start_time,
        end:req.query.end_date+"T"+req.query.end_time,
      });
      event.save().then(res.redirect("/profile/"+fuser._id));
  });
};