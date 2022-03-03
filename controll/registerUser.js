const addNewUser = require("../requestApi/addNewUser");
const checkUser = require("../requestApi/checkUser");
const getUser = require("../requestApi/getUser");
const removeMessage = require("../tools/removeMessage");

module.exports=async(id,state,bot,msg)=>{
const firstName=msg.from.first_name||"";
const lastName= msg.from.last_name||"";
    let user = {
        userName:firstName+" "+lastName,
        userIdTelegram:msg.from.id,
        telegramUsername: msg.from.username
    };

    console.log(user);
   let isUser=await checkUser(user.userIdTelegram);

   if(isUser===false){
      await  addNewUser(user)
      state.userInfo=await getUser(user.userIdTelegram);
   }else  state.userInfo=user;
}     