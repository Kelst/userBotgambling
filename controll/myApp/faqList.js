const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getCountCategory = require("../../requestApi/getCountCategory");
const getFAQ = require("../../tools/getFAQ");
const removeMessage = require("../../tools/removeMessage");


module.exports=async(id,bot,query)=>{

    const keyboardFAQ=getFAQ.map((e,i)=>{
        console.log(e);
      return   [
            {
                text:`${e[0].title}`, callback_data:`faqItem|${i}`
            }
        ]
    })
    removeMessage(query.message.chat.id, bot, query.message.message_id).then(()=>{
    bot.sendMessage(id,"FAQ",{
        reply_markup:{
            inline_keyboard:[...keyboardFAQ,nav_keyboard[1]]
        }
    })
    })	

}     