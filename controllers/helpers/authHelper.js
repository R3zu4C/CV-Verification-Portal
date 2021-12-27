class Admin
{
    constructor(user, orgs)
    {
        this.admin_id = user.user_id;
        this.name = user.name;
        this.admin_perm = orgs.admin;
        delete orgs.admin;
        this.org = orgs;
        
    }
    log() {
        let str = `Admin: ${this.name} has admin permissions for ${Object.keys(this.org).length} organizations.`;
        for (let org in this.org) {
            str += `\n\t${org}: ${JSON.stringify(this.org[org])}`;
        }
        console.log(str);
    }
}

module.exports = Admin;