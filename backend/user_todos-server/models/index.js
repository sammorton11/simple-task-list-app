const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize("postgres://sammorton:scheer62@localhost:5432/mytest", {dialect: "postgres"});

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database:', error);
});

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

db.todos = require('./todoModel')(sequelize, DataTypes);

module.exports = db;
