const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");


module.exports=async(id,state,bot,query)=>{
    const choseApp=await getAppById(state.control.idApp);
    
  const keyboarAvtopush=[
     
      [ {
        text:"Установить текст",callback_data:`set_text|${state.control.idApp}`
    } ],
    [ {
        text:"Установить время",callback_data:`set_interval_start_count|${state.control.idApp}`
    } ],

]
// Автопуши:\nТекст: ${choseApp[0]?.notification_text===""?"нет текста":choseApp[0]?.notification_text}\n Интервал: ${choseApp[0]?.notification_interval}\n Старт: ${choseApp[0]?.notification_start}\n Количество push уведомлений: ${choseApp[0]?.max_count}
    bot.sendMessage(id,`Текст push-уведомления: ${choseApp[0]?.notification_text===""?"не установлен":choseApp[0]?.notification_text}\n\nВремя старта — через ${choseApp[0]?.notification_start} мин после установки приложения, с интервалом ${choseApp[0]?.notification_interval} мин, максимальное к-во — ${choseApp[0]?.max_count} раз. `,{                                              
        reply_markup: {
            inline_keyboard:[...keyboarAvtopush,[{
                text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });

}       