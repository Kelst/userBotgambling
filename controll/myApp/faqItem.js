const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getCountCategory = require("../../requestApi/getCountCategory");
const getFAQ = require("../../tools/getFAQ");
const removeMessage = require("../../tools/removeMessage");


module.exports=async(id,bot,query,data)=>{
    const index=data.split("|")[1];
    const faqItem=getFAQ.find((e,i)=>i==index)
    
    const keyboardFAQ=getFAQ.map((e,i)=>{
        console.log(e);
      return   [
            {
                text:`${e[0].title}`, callback_data:`faqItem|${i}`
            }
        ] 
    })
    const new_keyboarf=keyboardFAQ.filter((e,i)=>index!=i)
    removeMessage(query.message.chat.id, bot, query.message.message_id).then(()=>{
    bot.sendMessage(id,`FAQ\n\nВопрос: ${faqItem[0]?.title}\nОтвет: ${faqItem[0]?.answer}`,{
        reply_markup:{
            inline_keyboard:[...new_keyboarf,nav_keyboard[1]]
        }
    })
    })	
 
}      