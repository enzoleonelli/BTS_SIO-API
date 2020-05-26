const db = require("../models");
const Medoc = db.medoc;
const Op = db.Sequelize.Op;

// Créer et sauvegarder une nouveau médicament 
exports.create = (req, res) => {
  // Requête validée
  if (!req.body.nom) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide!"
    });
    return;
  }

  // Structure création médicament
  const medoc = {
    nom: req.body.nom,
    nbBoitesMax: req.body.nbBoitesMax,
    nbBoitesAchetees: req.body.nbBoitesAchetees,
    nbMedocParBoite: req.body.nbMedocParBoite,
    nbFoisParJour: req.body.nbFoisParJour,
    nbJourParSemaine: req.body.nbJourParSemaine,
    heuresPrises_id :req.body.heuresPrises,
    finDeLaPrise: req.body.finDeLaPrise
  };

  // Sauvegarder médicament dans la BDD
  Medoc.create(medoc)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du medicament."
      });
    });
};

// Retourne tous les médicaments de la BDD
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

  Medoc.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des medicaments."
      });
    });
};

// Retourne un médicament seul en fonction de l'ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Medoc.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération du medicament avec id =" + id
      });
    });
};

// Met à jour un medicament en fonction de son ID
exports.update = (req, res) => {
  const id = req.params.id;

  Medoc.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le medicament a été mis à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre a jour le medicament avec id=${id}. Peut-être que le médicament n'a pas été trouvé ou le corps est vide!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour du medicament avec id=" + id
      });
    });
};

// Supprime un médicament spécifique en focntion de son ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Medoc.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le medicament a été supprimé avec succès!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer Medoc avec id=${id}. Peut-être que le Médoc n'a pas été trouvé!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer Medoc avec id =" + id
      });
    });
};

// Supprime tous les médicaments de la BDD
exports.deleteAll = (req, res) => {
    Medoc.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Les medicaments ont été supprimés avec succès!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de tous les medicaments."
      });
    });
};
