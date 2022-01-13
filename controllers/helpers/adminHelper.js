module.exports = class AdminService {
  constructor(user, orgs) {
    this.admin_id = user.user_id;
    this.name = user.name;
    this.admin_perm = orgs[0];
    delete orgs[0];
    this.org = orgs;
  }
  log() {
    let str = `Admin: ${this.name} has admin permissions for ${Object.keys(this.org).length
      } organizations.`;
    for (let org in this.org) {
      str += `\n\t ${org}: `;
      for (let perm_id of this.org[org]["perm"]) {
        str += `\t ${perm_id}`;
      }
    }
    console.log(str + `\n\n`);
  }
  detail() {
    let str = `Admin: ${this.name} has admin permissions for ${Object.keys(this.org).length
      } organizations.`;
    for (let org in this.org) {
      str += `\n\t ${org} : `;
      for (let perm_id of this.org[org]["perm"]) {
        str += `\n\t\t ${permIdToName(perm_id)}`;
      }
    }
    console.log(str + `\n\n`);
  }

  hasPermission(perm, org_id) {
    let perm_id;
    if (typeof perm == "string") perm_id = permNameToId(perm);
    else perm_id = perm;
    if (org_id == 0 || org_id == undefined) {
      return this.admin_perm.includes(perm_id);
    } else if (this.org[org_id] && this.org[org_id]["perm"]) {
      return this.org[org_id]["perm"].includes(perm_id);
    }
    return false;
  }

  canGivePermissionToAdmin(perm_id, org_id) {
    if (this.hasPermission(1)) return true; //God admin

    return this.hasPermission(perm_id, org_id);
  }

  canGivePermissionToRole(perm_id, role_level, org_id) {
    if (this.hasPermission(1)) return true; //God admin

    if (typeof perm_id == "string") perm_id = permNameToId(perm_id);

    if (org_id === undefined || role_level === undefined || role_level === 0)
      return false; //?: can Role exists without org?

    if (perm_id <= 200) return this.admin_perm.includes(perm_id);

    return (
      this.org[org_id]["perm"].includes(perm_id) &&
      this.org[org_id]["role_level"] <= role_level
    );
  }

  canCreateRole(perm, role_level, org_id) {
    if (this.hasPermission(1)) return true; //God admin

    if (!this.hasPermission("Add role", org_id)) return false;

    if (perm !== undefined && perm !== null)
      perm.forEach((perm_id) => {
        if (!this.canGivePermissionToRole(perm_id, role_level, org_id))
          return false;
      });

    return true;
  }
};

const permNameToId = (name) => {
  if (typeof name != "string") return -1;

  name.trim();

  switch (name) {
    case "Add points":
      return 301;
    case "Approve point":
      return 302;
    case "View flag":
      return 303;
    case "Add role":
      return 304;
    case "Approve flag":
      return 305;
    case "View requests":
      return 306;
    case "Approve requests":
      return 307;
    case "Change rights":
      return 308;
    case "All rights":
      return 1;
    case "View personal points":
      return 101;

    default:
      return -1;
  }
};

const permIdToName = (id) => {
  switch (id) {
    case 301:
      return "Add points";
    case 302:
      return "Approve point";
    case 303:
      return "View flag";
    case 304:
      return "Add role";
    case 305:
      return "Approve flag";
    case 306:
      return "View requests";
    case 307:
      return "Approve requests";
    case 308:
      return "Change rights";
    case 1:
      return "All rights";
    case 101:
      return "View personal points";
    default:
      return "No such permission exist";
  }
};
