module.exports = (sequelize, Sequelize) => {
  const Ordonance = sequelize.define("ordonance", {
    titre: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    dateDebut: {
      type: Sequelize.DATE
    },
    dateFin: {
      type: Sequelize.DATE
    },
    medocs_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  });

  return Ordonance;
};
