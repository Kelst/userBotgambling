const axios = require('axios').default;
const User=require("../models/User")
module.exports = async function (req) {
    const newUser=new User({
        userName:req.userName,
        userIdTelegram:req.userIdTelegram,
        userTelegram_nik:req.telegramUsername
    })
    try{
        await newUser.save()
        return true
        }
        catch(er){
        
            console.log(er)
            return false
        }

}
