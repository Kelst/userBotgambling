const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const setNaming = require("../../requestApi/setNaming");
const setUrl = require("../../requestApi/setUrl");
const checkNaming = require("../../tools/checkNaming");
const checkUrl = require("../../tools/checkUrl");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");
const messageId=require("../../tools/messageId")


module.exports=async(id,state,bot,msg,text)=>{
	messageId.id=msg.message_id;

    if(!checkNaming(msg.text)) {
        bot.sendMessage(id,`Неправильный формат ввода нейминга\nпопробуйте еще раз`,{
            reply_markup: {
                inline_keyboard:[[{
                    text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
                }],nav_keyboard[1]]
            }
        }).then(async () => {
              await removeMessage(id, bot,  msg.message_id-1); 
        });
		
	}else{
        await setNaming({id:state.control.idApp,naming:text})
        state.control.type=""
        state.flagNaming=true;
        bot.sendMessage(id,`Нейминг добавлен`,{
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