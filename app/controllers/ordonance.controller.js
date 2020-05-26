const db = require("../models");
const Ordonance = db.ordonances;
const Op = db.Sequelize.Op;

// Créer et sauvegarder une nouveau ordonance 
exports.create = (req, res) => {
  // Requête validée
  if (!req.body.titre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Structure création ordonance
  const ordonance = {
    titre: req.body.titre,
    description: req.body.description,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    medocs_id: req.body.medocs_id,
    user_id: req.body.user_id
  };

  // Sauvegarder ordonance dans la BDD
  Ordonance.create(ordonance)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ordonance."
      });
    });
};

// Retourne tous les ordonances de la BDD
exports.findAll = (req, res) => {
  const titre = req.query.titre;
  var condition = titre ? { titre: { [Op.like]: `%${titre}%` } } : null;

  Ordonance.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des ordonances."
      });
    });
};

// Retourne une ordonance seul en fonction de l'ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ordonance.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération de l'ordonance avec id =" + id
      });
    });
};

exports.findTwo = (req, res) => {
  const id = req.params.user_id;

  Ordonance.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération de l'ordonance avec id =" + id
      });
    });
};

// Met à jour une ordonance en fonction de son ID
exports.update = (req, res) => {
  const id = req.params.id;

  Ordonance.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "L'ordonance a été mis à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre a jour l'ordonance avec id=${id}. Peut-être que l'ordonance n'a pas été trouvé ou le corps est vide!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour de l'Ordonance avec id=" + id
      });
    });
};

// Supprime un médicament spécifique en focntion de son ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Ordonance.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "L'ordonance a été supprimé avec succès!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'ordonance avec id=${id}. Peut-être que l'ordonance n'a pas été trouvé!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer l'ordonance avec id =" + id
      });
    });
};

// Delete all Ordonances from the database.
exports.deleteAll = (req, res) => {
  Ordonance.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Les ordonances ont été supprimés avec succès!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de toutes les ordonances."
      });
    });
};
