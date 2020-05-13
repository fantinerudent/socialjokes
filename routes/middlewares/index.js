
module.exports = {
  isThisUserAdmin:  function (req, res, next) {
      if (!req.session.userData.isAdministrator) {
        console.log("the user is  not admin");
      } else {
        console.log(" the user is admin");
        next();
      }
    },
    isThisUserLogged : function(req, res, next) {
      if (!req.session.userData.isLogged) {
        console.log("the user isnt logged");
      } else {
        next();
      }
  },
};

