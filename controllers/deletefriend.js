const User = require("../models/user.js");
var Event = require("../models/event.js");

module.exports =  function(req, res){
    User.find().where('name')
    .equals(req.params.myname)
    .then(
      t => {
          let fuser = t[0];
          User.findById(req.params.fid)
          .then(
              r => 
              {
                  let ruser = r;
                  fuser.friends.remove(ruser._id);
                  fuser.save()
                  .then(res.redirect("/profile/"+fuser.id));
              });
            });
};