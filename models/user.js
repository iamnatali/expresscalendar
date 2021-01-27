const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {type:String, required: true},
  password: {type:String, required: true},
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);