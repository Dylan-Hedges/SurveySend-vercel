//Requires in mongoose
const mongoose = require('mongoose');
//Requires in Schema instance from mongoose
const {Schema} = mongoose;

//Creates the schema for users - specifies the properties for DB entries in the collection
const userSchema = new Schema({
  //Specifies the Google ID will be a string
  googleId: String,
  //Sepcifies user credits will be a number and by default start with 0
  credits: {type: Number, default: 0}
});

//Creates a users model class using the userSchema under the name 'users' and loads it into mongoose
mongoose.model('users', userSchema);
