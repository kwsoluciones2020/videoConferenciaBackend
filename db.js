const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
 }).catch((error) => {
   // console.error('Unable to connect to the database: ', error);
 });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/users.model")(sequelize, Sequelize);
db.meet = require("./models/meet.model")(sequelize, Sequelize);



 sequelize.sync().then(() => {
//  console.log('Book table created successfully!');
}).catch((error) => {
 // console.error('Unable to create table : ', error);
}); 

module.exports = db;

/* const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hexon",
    password: "postgres",
    port: 5432,
});

module.exports = pool; */