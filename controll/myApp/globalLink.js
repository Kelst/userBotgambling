const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");


module.exports=async(id,state,bot,query)=>{
    const choseApp=await getAppById(state.control.idApp);
state.control.type="global_ref"
if(choseApp[0]?.url==""){
    bot.sendMessage(id,`Глобальная ссылка — это страница, которая будет отображаться пользователю. Вставьте и оправьте в бот если хотите ее изменить.`,{
        reply_markup: {
            inline_keyboard:[[{
                text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });


}else{
    bot.sendMessage(id,`Глобальная ссылка — это страница, которая будет отображаться пользователю. Вставьте и оправьте в бот если хотите ее изменить.`,{
        reply_markup: {
            inline_keyboard:[[{
                text:`Удалить ссылку`, callback_data:`delete_global|${choseApp[0]?._id}`
            }],[{
                text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });
}


}     