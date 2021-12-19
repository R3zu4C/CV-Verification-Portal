const Admin = require("./Admin");
const User = require("./User");
const Role = require("./Role");
const Flag = require("./Flag");
const Notification = require("./Notification");
const Organization = require("./Organization");
const Permission = require("./Permission");
const Point = require("./Point");
const Request = require("./Request");
const Project_Template = require("./Template");



User.hasMany(Point);
Point.belongsTo(User);

User.hasMany(Request);
Request.belongsTo(User);



User.hasOne(Admin, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Admin.belongsTo(User);

Admin.belongsToMany(Permission, { through: "admin_permissions" });
Permission.belongsToMany(Admin, { through: "admin_permissions" });

Admin.belongsToMany(Role, { through: "role_admin" });
Role.belongsToMany(Admin, { through: "role_admin" });

Role.belongsToMany(Permission, { through: "role_permission" });
Permission.belongsToMany(Role, { through: "role_permission" });

Role.hasOne(Organization);
Organization.belongsTo(Role);

Organization.hasOne(Organization, { as: 'parentOrg' });
Organization.belongsTo(Organization);

Organization.hasMany(Project_Template);
Project_Template.belongsTo(Organization);


Flag.belongsTo(Admin);
Admin.hasMany(Flag, {
    foreignKey: "approved_by", 
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Flag.belongsTo(User);
User.hasMany(Flag, {
    foreignKey: "flagged_by", 
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Flag.belongsTo(Point);
Point.hasMany(Flag, {
    foreignKey: "point_id", 
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

// notif_to: {
//     type: DataTypes.INTEGER,
//         references: { model: "users", key: "s_id" },
//     onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//     },
// flag_id: {
//     type: DataTypes.INTEGER,
//         references: { model: "flags", key: "flag_id" },
//     onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//     },
// point_id: {
//     type: DataTypes.INTEGER,
//         references: { model: "points", key: "point_id" },
//     onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//     },
// request_id: {
//     type: DataTypes.INTEGER,
//         references: { model: "requests", key: "req_id" },
//     onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//     },


Notification.belongsTo(User);
User.hasMany(Notification, {foreignKey: "notif_to"});