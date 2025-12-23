//Requires in mongoose
const mongoose = require('mongoose');
//Requires in Schema instance from mongoose
const {Schema} = mongoose;

//Schema used to track if recipients have responded - records if user has clicked a link (responded), prevents users responding multiple times
const recipientSchema = new Schema({
  //Specifies the user email as a string
  email: String,
  //Specifies the response as a boolean and sets it to false (not responded) once responded this changes to true
  responded: {type: Boolean, default: false}
});

module.exports = recipientSchema;
