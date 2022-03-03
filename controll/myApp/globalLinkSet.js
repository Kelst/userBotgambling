const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const setUrl = require("../../requestApi/setUrl");
const checkUrl = require("../../tools/checkUrl");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");
const messageId=require("../../tools/messageId")

module.exports=async(id,state,bot,msg,text)=>{
	messageId.id=msg.message_id;
    
  const message_id = msg.message_id;
  const chat=msg.chat;

    if(!checkUrl(msg.text)) {
        bot.sendMessage(id,`Ошибка ввода, введите корректную ссылку.`,{
            reply_markup: {
                inline_keyboard:[[{
                    text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
                }],nav_keyboard[1]]
            }
        }).then(async () => {
             
            await removeMessage(id, bot,  msg.message_id-1); 
        });
		
	}else{
     
       state.flagLink=true;
        await setUrl({id:state.control.idApp,url:text})
        state.control.type=""
        bot.sendMessage(id,`Ваша глобальная ссылка изменена.`,{
            reply_markup: {
                inline_keyboard:[[{
                    text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
                }],nav_keyboard[1]]
            }
        }).then(async () => {
           
             await removeMessage(id, bot,  msg.message_id-1); 
        });
    }


}     