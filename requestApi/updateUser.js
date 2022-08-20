const User=require("../models/User")
module.exports = async function (req) {
   try{
    const filter={userIdTelegram:req.userIdTelegram};

    console.log("MYLOOOG",req.telegramUsername,req.userIdTelegram,req.userName);
     let doc=  await User.findOneAndUpdate (filter,{
        userTelegram_nik:req.telegramUsername,
        userName:req.userName,
       },{
        new:true
       })
       return doc;
    }
    catch(e){
        return false;
        console.log(e);
    }



}
