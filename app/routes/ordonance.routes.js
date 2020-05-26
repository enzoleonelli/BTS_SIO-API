module.exports = app => {
    const ordonance = require("../controllers/ordonance.controller.js");
    const auth = require("../middleware/authJwt")
  
    var router = require("express").Router();
  
    // Creer un nouveau ordonance
    router.post("/", auth, ordonance.create);
  
    // Retourne toutes les ordonances
    router.get("/",auth, ordonance.findAll);
  
    // Retourne une seul ordonance avec son id
    router.get("/:id",auth, ordonance.findOne);

    // Retourne les ordonances avec id utilisateur
    router.get("/:id",auth, ordonance.findTwo);

    // Met a jour une ordonance avec son id
    router.put("/:id",auth, ordonance.update);
  
    // Supprime une ordonance avec son id
    router.delete("/:id",auth, ordonance.delete);
  
    // Supprime toutes les ordonances
    router.delete("/", ordonance.deleteAll);
  
    app.use('/api/ordonance', router);
  };
  