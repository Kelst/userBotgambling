const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const setUrl = require("../../requestApi/setUrl");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");


module.exports=async(id,state,bot,query)=>{
    const choseApp=await getAppById(state.control.idApp);
    const { chat, message_id, text } = query.message

state.control.type="";
await setUrl({id:state.control.idApp,url:""})

bot.answerCallbackQuery( query.id, {text: 'Глобальная ссылка удалена.'});

bot.editMessageText(`Глобальная ссылка — это страница, которая будет отображаться пользователю. Вставьте и оправьте в бот если хотите ее изменить.`, {
    chat_id: chat.id,
    message_id: message_id,
    reply_markup: {
        inline_keyboard:[[{
            text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
        }],nav_keyboard[1]]
    } 
})

    


}     