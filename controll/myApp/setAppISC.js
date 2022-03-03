
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const removeMessage = require("../../tools/removeMessage");



module.exports=async(id,state,bot,query)=>{
    const choseApp=await getAppById(state.control.idApp);
    state.control.idApp=choseApp[0]?._id;
    bot.sendMessage(id,`Введите время старта, интервал, максимальное к-во уведомлений в формате времяСтарта*интервал*максКоличество.\n\nНа пример, 60*240*7  — это значит, что первое уведомление будет показано через 60 минут после установки, следующие — через 240 минут. При этом, всего будет отправлено 7 уведомлений.`,{
        reply_markup: {
            inline_keyboard:[[{
                text: `⬅️  Назад`, callback_data: `autopush`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });
       
    



}      