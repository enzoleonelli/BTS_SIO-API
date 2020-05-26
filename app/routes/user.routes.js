const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //Test role utilisateur 
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  //Test role administrateur
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //Voir tous le sutilisateur
  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );
};
