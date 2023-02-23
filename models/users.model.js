const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:''
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:''
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        defaultValue:null
      },
      date_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true        
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:''
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:''
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:''
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:true
      },
      token_access: {
        type: DataTypes.TEXT,
        defaultValue:null        
      },
      refreshToken: {
        type: DataTypes.TEXT,
        defaultValue:null        
      },
      type_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      
      code_recovery: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
    return User;
  };