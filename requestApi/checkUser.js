const axios = require('axios').default;
const User=require("../models/User")
module.exports = async function (req) {
   try{
        const user= await User.find({userIdTelegram:req});
        if(user.length!=0){
            return true
        }else return false
    }
    catch(e){
        return false;
        console.log(e);
    }


}
