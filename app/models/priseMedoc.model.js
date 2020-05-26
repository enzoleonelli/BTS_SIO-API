module.exports = (sequelize, Sequelize) => {
    const PriseMedoc = sequelize.define("priseMedoc", {
      heurePrise: {
        type: Sequelize.STRING
      },
      pris: {
        type: Sequelize.BOOLEAN
      }
    });  
    return PriseMedoc;
  };