try{
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/calendardb';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var User = require(".\\models\\user.js");
var Event = require(".\\models\\event.js");

/*add user
var user = new User({name:"Test1", password:"123"})
user.save()
.then(console.log)
.catch(console.log);*/
/*find users*/
console.log("all\n");
User.find().then(t => console.log("USERS\n"+JSON.stringify(t)))
.catch(console.log);
/*add user event
User.find().where('name').equals("Test1")
.then(t => {
    let fuser = t[0];
    let event = new Event({user:fuser._id, name:"important",
     start:'2002-12-09', end:'2012-12-09'});
    event.save().then(console.log)
    .catch(console.log)
});*/
/*delete event
Event.deleteOne({ _id: "600edb76aa3b8b3994075025" }).then(r => console.log(r));*/
/*events
Event.find().then(t => console.log("Events\n"+JSON.stringify(t)))*/
/*find user events
console.log("find user events\n");
User.find().where('name').equals("Test3")
.then(t => {
    let fuser = t[0];
    Event.find()
    .where('user')
    .equals(fuser._id)
    .then(t => console.log("EVENTS\n"+JSON.stringify(t))) 
});*/
/*add friend
console.log("add friend\n")
User.find().where('name').equals("wow")
.then(t => {
    let fuser1 = t[0];
    User.find().where('name').equals("Test1")
    .then(r => {
        let fuser  = r[0];
        fuser.friends
        .push(fuser1);
        fuser.save();
    });
});*/
/*delete friend
User.find().where('name')
.equals("Test3").
then(
    t => {
        let fuser = t[0];
        User.find().where('name')
        .equals("Test1").
        then(
            r => 
            {
                console.log(JSON.stringify(r));
                let ruser = r[0];
                fuser.friends.remove(ruser._id);
                fuser.save();
            });
});*/
/*find friends
console.log("find friends\n")
User.find().where('name')
.equals("Test3")
.populate('friends')
.select('friends')
.then(t => console.log("FRIENDS\n"+JSON.stringify(t)));*/
}catch(e){
    console.log(e.message);
}