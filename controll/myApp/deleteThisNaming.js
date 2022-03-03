const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const deleteNamingbyName = require("../../requestApi/deleteNamingbyName");
const removeMessage = require("../../tools/removeMessage");
const bot_const_menu=require("../../tools/modeApp");


module.exports=async(id,state,bot,query,appId,namingName)=>{
  
    const { chat, message_id, text } = query.message
    
    if(await deleteNamingbyName({id:appId,name:namingName})){
        const choseApp=await getAppById(state.control.idApp);
        const keyboard_naming_list=choseApp[0].naming.map((e,index)=>{
            return [
                {
                    text:`- ${e.name} : ${e.name_ref}`, callback_data:`delete_this_naming|${choseApp[0]._id}|${e.name}`
                }
            ]
        })
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            text: "Нейминг удален"
        })
        bot.editMessageText(`Чтобы удалить нейминг, выберите его из списка:`, {
            chat_id: chat.id,
            message_id: message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard:[...keyboard_naming_list,[{
                    text: `⬅️  Назад`, callback_data: bot_const_menu.setNaming
                }],nav_keyboard[1]]
            } 
        })

    }
    
    



}     