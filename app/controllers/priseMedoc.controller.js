const db = require("../models");
const PriseMedoc = db.priseMedoc;
const Op = db.Sequelize.Op;

// Créer et sauvegarder une nouvelle prise de médicament
exports.create = (req, res) => {
  // Requête validée
  if (!req.body.heurePrise) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide!"
    });
    return;
  }

  // Structure création prise de medicament
  const priseMedoc = {
    heurePrise: req.body.heurePrise,
    pris: req.body.pris
  };

  // Sauvegarder prise de médicament dans la BDD
  PriseMedoc.create(priseMedoc)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création d'une prise de medicament."
      });
    });
};

// Retourne toutes les prises de médicaments de la BDD
exports.findAll = (req, res) => {
  const heurePrise = req.query.heurePrise;
  var condition = heurePrise ? { heurePrise: { [Op.like]: `%${heurePrise}%` } } : null;

  PriseMedoc.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des prises de médicaments"
      });
    });
};

// Retourne une prise de médicament seul en fonction de l'ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  PriseMedoc.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération d'une prise de medicament avec id =" + id
      });
    });
};

// Met à jour une prise de medicament en fonction de son ID
exports.update = (req, res) => {
  const id = req.params.id;

  PriseMedoc.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La prise de medicament a été mis à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre a jour la prise de medicament avec id=${id}. Peut-être que la prise de medicament n'a pas été trouvé ou le corps est vide!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour de la prise de médicament avec id=" + id
      });
    });
};

// Delete a Medoc with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PriseMedoc.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La prise de medicament a été supprimé avec succès!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer la prise de medicament avec id=${id}. Peut-être que la prise de médicament n'a pas été trouvé!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer la prise de medicament avec id =" + id
      });
    });
};

// Delete all Ordonances from the database.
exports.deleteAll = (req, res) => {
    PriseMedoc.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Les prises de medicament ont été supprimés avec succès!`  });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de toutes les prises de medicaments."
      });
    });
};
