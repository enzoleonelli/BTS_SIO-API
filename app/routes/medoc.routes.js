module.exports = app => {
    const medocs = require("../controllers/medoc.controller.js");
  
    var router = require("express").Router();
  
    // Creer un nouveau medicament
    router.post("/", medocs.create);
  
    // Retourne tous les medicaments
    router.get("/", medocs.findAll);
  
    // Retorune un seul medicament avec son id
    router.get("/:id", medocs.findOne);
  
    // Met a jour un medicament avec son id
    router.put("/:id", medocs.update);
  
    // Supprime un medicament avec son id
    router.delete("/:id", medocs.delete);
  
    // Supprime tous les medicaments
    router.delete("/", medocs.deleteAll);
  
    app.use('/api/medicament', router);
  };
  