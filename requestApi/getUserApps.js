const axios = require('axios').default;
const User=require("../models/User")
module.exports = async function (req) {
    const userN= await User.find({userIdTelegram:req}).populate("apps")
    if(userN.length>0){
    return userN[0].apps;
    }else false;
}
  