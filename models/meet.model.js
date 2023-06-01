const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
  const Meet = sequelize.define("meet", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true

    },
    host: {
      type: DataTypes.UUID,
      allowNull: true
  },
    issue: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: true
    },
    hour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    video:{
      type:DataTypes.JSON(),
      defaultValue: {},
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  });
  return Meet;
};