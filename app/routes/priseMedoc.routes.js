module.exports = app => {
    const priseMedocs = require("../controllers/priseMedoc.controller.js");
  
    var router = require("express").Router();
  
    // Creer une nouvelle prise de medicament
    router.post("/", priseMedocs.create);
  
    // Retourne toutes les prises de medicaments
    router.get("/", priseMedocs.findAll);
  
    // Retorune un seul prise de medicament avec son id
    router.get("/:id", priseMedocs.findOne);
  
    // Met a jour un prise de medicament avec son id
    router.put("/:id", priseMedocs.update);
  
    // Supprime un prise de medicament avec son id
    router.delete("/:id", priseMedocs.delete);
  
    // Supprime toutes les prises de medicaments
    router.delete("/", priseMedocs.deleteAll);
  
    app.use('/api/priseMedoc', router);
  };
  