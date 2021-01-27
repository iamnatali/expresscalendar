const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: {type:String, required: true},
  start: {type: Date, required: true},
  end: {type: Date, required: true},
});

module.exports = mongoose.model('Event', eventSchema);