const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getCountCategory = require("../../requestApi/getCountCategory");
const getListAppCategory = require("../../requestApi/getListAppCategory");
const getConst = require("../../tools/getConst");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");


module.exports=async(id,state,bot,query,data)=>{

        let appsCategory=await getListAppCategory(data);
        if (appsCategory.length>0) {
   
            const keyboard_category=appsCategory.map(el => {
                 return [
                     {
                         text: `${el.name}`, callback_data: `app_info|${el._id}|${el.type}`
                     }
                 ]
             })
             
     
             bot.sendMessage(id, ` Вы выбрали категорию ${getConst().get(data)}. Сейчас в наличии такие приложения:`, {
                 reply_markup: {
                     inline_keyboard: [...keyboard_category,
                        [{ text: `⬅️  Назад`, callback_data: `buy_app` }],
                        nav_keyboard[1]]
                 }
             }).then(async () => {
                 removeMessage(query.message.chat.id, bot, query.message.message_id);
             });
         } else {
             bot.sendMessage(id, "ПУСТО!", {
                 reply_markup: {
                     inline_keyboard: [nav_keyboard[1]]
                 }
             }).then(async () => {
                 removeMessage(query.message.chat.id, bot, query.message.message_id);
             });
         }

}     