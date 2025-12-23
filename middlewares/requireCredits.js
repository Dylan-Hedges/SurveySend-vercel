module.exports = (req, res, next) => {
  //Checks user credits
  if (req.user.credits < 1){
    //If user has less than 1 credit, exit and display a status code + error message
    return res.status(403).send({error: 'You must have at least 1 credit'});
  }
  //Proceed to the next part of the chain
  next();
};
