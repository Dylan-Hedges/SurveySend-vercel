module.exports = (req, res, next) => {
  //Checks if user is logged in
  if (!req.user){
    //If there is no req.user (doesnt exist), exit the current chain and send back a status of 401 + error message
    return res.status(401).send({error: 'You must be logged in'});
  }
  //Proceed to the next part of the chain
  next();
};
