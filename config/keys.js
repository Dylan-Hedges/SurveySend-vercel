//Works out if app is in production or development using NODE_ENV variable - gets back prod or dev keys
if (process.env.NODE_ENV === 'production'){
  //Returns production keys
  module.exports = require('./prod');
}else{
  //Returns development keys
  module.exports = require('./dev');
}
