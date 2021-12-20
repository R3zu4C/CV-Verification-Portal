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



User.hasOne(Admin, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Admin.belongsTo(User);

Admin.belongsToMany(Permission, {
    through: "admin_permissions",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Permission.belongsToMany(Admin, {
    through: "admin_permissions",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Admin.belongsToMany(Role, {
    through: "role_admin",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Role.belongsToMany(Admin, {
    through: "role_admin",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Role.belongsToMany(Permission, {
    through: "role_permission",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Permission.belongsToMany(Role, {
    through: "role_permission",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Role.belongsTo(Organization, {
    foreignKey: 'org_id',
});
Organization.hasMany(Role, {
    foreignKey: 'org_id',
    // foreignKey: "org_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Organization.hasOne(Organization, {
    foreignKey: 'parent_org_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Organization.belongsTo(Organization, {
    foreignKey: 'parent_org_id',
});

Organization.hasMany(Project_Template, {
    foreignKey: 'org_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Project_Template.belongsTo(Organization, {
    foreignKey: 'org_id',
});


Flag.belongsTo(Admin, {
    foreignKey: 'approved_by'
});
Admin.hasMany(Flag, {
    foreignKey: "approved_by",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Flag.belongsTo(User, {
    foreignKey: 'flagged_by'
});
User.hasMany(Flag, {
    foreignKey: "flagged_by",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Flag.belongsTo(Point, {
    foreignKey: 'point_id'
});
Point.hasMany(Flag, {
    foreignKey: "point_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});



Notification.belongsTo(User, {
    foreignKey: 'notif_to'
});
User.hasMany(Notification, {
    foreignKey: "notif_to",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Notification.belongsTo(Flag, {
    foreignKey: 'flag_id'
});
Flag.hasMany(Notification, {
    foreignKey: "flag_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Notification.belongsTo(Point, {
    foreignKey: 'point_id'
});
Point.hasMany(Notification, {
    foreignKey: "point_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Notification.belongsTo(Request, {
    foreignKey: 'request_id'
});
Request.hasMany(Notification, {
    foreignKey: "request_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});



User.hasMany(Request, {
    foreignKey: "req_by",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Request.belongsTo(User, {
    foreignKey: "req_by",
});

Point.hasMany(Request, {
    foreignKey: "point_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Request.belongsTo(Point, {
    foreignKey: "point_id",
});

Admin.hasMany(Request, {
    foreignKey: "req_to",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Request.belongsTo(Admin, {
    foreignKey: "req_to",
});



User.hasMany(Point, {
    foreignKey: "s_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
User.hasMany(Point, {
    foreignKey: "added_by",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Point.belongsTo(User, {
    foreignKey: "added_by",
});

Organization.hasMany(Point, {
    as: 'points',
    foreignKey: 'org_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Point.belongsTo(Organization, {
    foreignKey: 'org_id',
});

Admin.hasMany(Point, {
    foreignKey: "approved_by",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});
Point.belongsTo(Admin , {
    foreignKey: "approved_by",
});