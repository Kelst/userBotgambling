const axios = require('axios').default;
const User=require("../models/User")
module.exports = async function (req) {
    const userInfo={
        userName:"",
        telegramId:"",
        telegramUsername:""
      
    }
   try{
        const user= await User.findOne({userIdTelegram:req});
      
            userInfo.userName=user.userName;
            userInfo.telegramId=user.userIdTelegram;
            userInfo.telegramUsername=user.userTelegram_nik;
           return userInfo;
           
    
    }
    catch(e){
        return false;
        console.log(e);
    }


}
