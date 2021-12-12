// Run 'npm run dev:tables' command to add all tables

const defineModels = async () => {
  await require('../models/User');
  await require('../models/Organization');
  await require('../models/Admin');
  await require('../models/Point');
  await require('../models/Flag');
  await require('../models/Role');
  await require('../models/Permission');
  await require('../models/Notification');
  await require('../models/AdminToRole');
  await require('../models/RoleToPerm');
  await require('../models/Request');

  console.log("All tables created successfully");
};

defineModels();
