const { sequelize: sequelizelog } = require("../models/log");
const { sequelize } = require("../models");

(async () => {
    try {
      await sequelize.authenticate();
      console.log("Main Database Connected!");
      await sequelize.sync({ alter: true, force: true });
      await sequelizelog.authenticate();
      console.log("Logging Database connected!");
      await sequelizelog.sync({ alter: true, force: true });
    }
    catch (err) {
        console.log(err);
    }
})();
