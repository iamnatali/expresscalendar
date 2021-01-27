const User = require("../models/user.js");
var Event = require("../models/event.js");

module.exports = function(req, res){
    //console.log(req.query);
    //console.log(req.body);
    User.find().where('name').equals(req.body.friend)
    .then(t => {
      if (t.length===0){
        User.find().where('name').equals(req.body.user)
        .then(r => {
          let fuser  = r[0];
          res.redirect("/profile/"+fuser._id) 
        });
      }
      let fuser1 = t[0];
      User.find().where('name').equals(req.body.user)
      .then(r => {
          let fuser  = r[0];
          if (fuser.friends.includes(fuser1._id)){
            res.redirect("/profile/"+fuser._id)
          }else{
            fuser.friends
          .push(fuser1);
          fuser.save()
          .then(res.redirect("/profile/"+fuser._id));
          }
      });
    });
  };