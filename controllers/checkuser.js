const User = require("../models/user.js");
var Event = require("../models/event.js");

module.exports = function(req, res){
    let userData = req.body;
    let login  = userData.userName;
    let pass = userData.pass;
    let user = new User({name:login, password:pass});
    User.find()
    .where('name').equals(login)
    .then(t => {
      if (t.length > 0){
        res.redirect("/alreadyhere");
      }else{
        /*not to expose password*/
        user.save().then(t => res.send('<form id="redir" method="post" action="/login">' +
        '<input type="hidden" name="username" value="'+login+'">' +
        '<input type="hidden" name="password" value="'+pass+'">'+
        '</form>' +
        '<script>document.getElementById("redir").submit()</script>'));
        /*user.save().then(t => res.redirect("/login/?username="+login+"&password="+pass));*/
      }
    })
    .catch(console.log);
  }