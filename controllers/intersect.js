const User = require("..\\models\\user.js");
var Event = require("..\\models\\event.js");

module.exports = function(req, res){
    let myname = req.params.name;
    let names = Object.keys(req.query);
    console.log(names);
    names.splice(names.length-4, 4);
    console.log(names);
    names.push(myname);
    const promises = names
    .map(x => 
      User.find()
      .where('name')
      .equals(x)
      .then(
        t =>{
          let fr = t[0];
          return User.find().where('name')
          .equals(myname).then(
            u => {
              let usert = u[0];
              if (fr.name!= myname &&
                !fr.friends.includes(usert._id)){
                  return new Promise((res, rej)=> {
                    res([]);
                  });
              }
              return Event.find()
              .where('user')
              .equals(fr._id);
            } 
          );
        }
      )
    )
    const tryMinus = require(".\\inter.js");
    Promise.all(promises)
    .then(r => {
      console.log(JSON.stringify(r.flat(1)));
      let toMinus = r.flat(1).map(x => [new Date(x.start), new Date(x.end)]);
      let bankSched =[[new Date(req.query.start_date+"T"+req.query.start_time),
      new Date(req.query.end_date+"T"+req.query.end_time)]];
      for (const pair of toMinus){
        bankSched = tryMinus(bankSched, pair);
      }
      res.render("intersect.hbs", {
        events: bankSched.map(x => {
          return {start:x[0], end:x[1]}
        })
      });
    });
}