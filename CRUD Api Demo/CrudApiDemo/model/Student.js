//import mongoose
const mongoose = require('mongoose');

//to create a schema
const schema = mongoose.Schema;

//made a schema for student
let StudentSchema = new schema({
  name: {type: String, required: true, max: 100},
  age: {type: Number},
  marks:{type: Number}},
  {
  timestamps: true
});

//exporting the schema so that it can be shared to other files
module.exports= mongoose.model('Student', StudentSchema);
