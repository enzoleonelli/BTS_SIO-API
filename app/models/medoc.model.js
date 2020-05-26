module.exports = (sequelize, Sequelize) => {
    const Medoc = sequelize.define("medoc", {
      nom: {
        type: Sequelize.STRING
      },
      nbBoitesMax: {
        type: Sequelize.INTEGER
      },
      nbBoitesAchetees: {
        type: Sequelize.INTEGER
      },
      nbMedocParBoite: {
        type: Sequelize.INTEGER
      },
      nbFoisParJour: {
        type: Sequelize.INTEGER
      },
      nbJourParSemaine: {
        type: Sequelize.INTEGER
      },
      finDeLaPrise: {
        type: Sequelize.DATE
      },
      heuresPrises_id: {
        type: Sequelize.INTEGER,
      }
    });
    return Medoc;
  };