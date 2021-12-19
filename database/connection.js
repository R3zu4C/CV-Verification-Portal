const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

(async () => {
  await sequelize.authenticate();
  console.log("Connection to the Database has been established successfully.");
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
})().catch((error) => {
  console.error(error);
});

module.exports = sequelize;
