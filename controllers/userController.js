const { User} = require("../models"); 
const { Organization } = require("../models");

module.exports = {
  fetchUserById: async (req, res) => {
    if(req.params['user_id']!=null){
        const user = await User.findByPk(req.params['user_id']);
        res.send(user);
        // console.log(user);
    }
    else {
        res.status(404).send('Error while fetching user');
    }
  },
}