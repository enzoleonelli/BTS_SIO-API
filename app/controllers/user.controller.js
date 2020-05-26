const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

//Test role utilisateur 
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

//Test role administrateur
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition })
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


