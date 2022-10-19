module.exports = (sequelize, Sequelize) => {
    const Zipcode = sequelize.define("projectZipcode", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      zip_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  
    return Zipcode;
  };