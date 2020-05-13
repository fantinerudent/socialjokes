
module.exports = {
  isThisUserAdmin: function (req, res, next) {
    console.log("middleware isadmin");
    if (!req.session.isAdmin) {
      console.log("the user is admin");
      // res.json(response);
    } else {
      console.log("not admin");
      next();
    }
  },
  // isThisUserLogged : function(req,) {

  // }
};

// export default isThisUserAdmin;
