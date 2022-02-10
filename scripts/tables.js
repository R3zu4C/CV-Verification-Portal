const { sequelize: sequelizelog } = require("../models/log");
const { sequelize } = require("../models");

(async () => {
    try {
        await sequelizelog.authenticate();
        await sequelizelog.sync({ alter: true, force: true });
        await sequelize.authenticate();
        await sequelize.sync({ alter: true, force: true });
    }
    catch (err) {
        console.log(err);
    }
})();
