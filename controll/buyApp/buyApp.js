const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getCountCategory = require("../../requestApi/getCountCategory");
const getAppById = require("../../requestApi/getAppById");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");
const getApp = require("../../requestApi/getApp");


module.exports=async(id,state,bot,query)=>{
    const choseApp=await getApp(state.control.idApp); 
bot.sendMessage(id, `Чтобы купить это приложение, напишите @robinhooddev c приметкой “\`#купить @${choseApp[0]?.name}\`”`, {
    reply_markup: {
        inline_keyboard: [[{text:"Купити",url:"https://t.me/robinhooddev"}],[{
            text: `⬅️  Назад`, callback_data: `app_info|${state.control.idApp}|${state.control.type}`
        }], nav_keyboard[1]]
    }
}).then(async () => {
    await removeMessage(query.message.chat.id, bot, query.message.message_id); 
});
}     