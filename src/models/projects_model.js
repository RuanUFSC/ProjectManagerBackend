module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      zip_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cost: {
        type: Sequelize.DECIMAL(13, 2),
        allowNull: false
      },
      done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      } 
    });
  
    return Project;
  };