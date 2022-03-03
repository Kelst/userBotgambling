
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const removeMessage = require("../../tools/removeMessage");



module.exports=async(id,state,bot,query)=>{
    const choseApp=await getAppById(state.control.idApp);
    state.control.idApp=choseApp[0]?._id;
    bot.sendMessage(id,`Введите данные в следующем формате:\nинтервал/старт/количество\nинтервал и старт вводятся в минутах\nПример: 400/60/10`,{
        reply_markup: {
            inline_keyboard:[[{
                text: `⬅️  Назад`, callback_data: `autopush`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });
       
    



}      