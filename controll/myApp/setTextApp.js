const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const setUrl = require("../../requestApi/setUrl");
const checkUrl = require("../../tools/checkUrl");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");


module.exports=async(id,state,bot,query,mode=false)=>{
    const choseApp=await getAppById(state.control.idApp);
    state.control.idApp=choseApp[0]?._id;

 if(mode===false)
    {bot.sendMessage(id,`Введите title push сообщение:`,{
        reply_markup: {
            inline_keyboard:[[{
                text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });}else {
        bot.sendMessage(id,`Введите текст push сообщение:`,{
            reply_markup: {
                inline_keyboard:[[{
                    text: `⬅️  Назад`, callback_data: `autopush`
                }],nav_keyboard[1]]
            }
        }).then(async () => { 
            await removeMessage(query.message.chat.id, bot, query.message.message_id); 
        });
        
    }



}      