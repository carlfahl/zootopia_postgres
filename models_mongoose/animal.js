var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = new Schema({
  name: String,
  species: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Animal', AnimalSchema);
