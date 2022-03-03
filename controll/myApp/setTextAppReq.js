const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const setNaming = require("../../requestApi/setNaming");
const setText = require("../../requestApi/setText");
const setTitle = require("../../requestApi/setTitle");
const setUrl = require("../../requestApi/setUrl");
const checkNaming = require("../../tools/checkNaming");
const checkUrl = require("../../tools/checkUrl");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");
const messageId=require("../../tools/messageId")


module.exports=async(id,state,bot,msg,text,type=false)=>{
	messageId.id=msg.message_id;

    if(type===false) {
      await setTitle({id:state.control.idApp,title:text});
     
      state.control.type=""
      bot.sendMessage(id,`Заглавление установлено`,{
          reply_markup: {
              inline_keyboard:[[{
                  text: `⬅️  Назад`, callback_data: `autopush`
              }],nav_keyboard[1]]
          }
      }).then(async () => {
         
           await removeMessage(id, bot,  msg.message_id-1); 
      });

		
	}else{
        await setText({id:state.control.idApp,text:text});
     
      state.control.type=""
      bot.sendMessage(id,`Текст push-уведомления установлен.`,{
          reply_markup: {
              inline_keyboard:[[{
                  text: `⬅️  Назад`, callback_data: `autopush`
              }],nav_keyboard[1]]
          }
      }).then(async () => {
         
           await removeMessage(id, bot,  msg.message_id-1); 
      });

    }


}     