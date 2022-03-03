const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const setUrl = require("../../requestApi/setUrl");
const checkUrl = require("../../tools/checkUrl");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");
const bot_const_menu=require("../../tools/modeApp")

module.exports=async(id,state,bot,query)=>{
    const choseApp=await getAppById(state.control.idApp);
   
    state.control.type="delete_this_naming"
   const keyboard_naming_list=choseApp[0].naming.map((e,index)=>{
       return [
           {
               text:`${e.name} : ${e.name_ref}`, callback_data:`delete_this_naming|${choseApp[0]._id}|${e.name}`
           }
       ]
   })
    bot.sendMessage(id,`Чтобы удалить нейминг, выберите его из списка:`,{
        reply_markup: {
            inline_keyboard:[...keyboard_naming_list,[{
                text: `⬅️  Назад`, callback_data: bot_const_menu.setNaming
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });



}     