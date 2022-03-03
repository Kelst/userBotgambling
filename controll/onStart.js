const removeMessage = require("../tools/removeMessage");
const messageId=require("../tools/messageId")

module.exports=async(id,state,bot,home_keyboard,messageId,flag=false)=>{
 const textMessage=`Меню`
    await bot.sendMessage(id, textMessage, {
        parse_mode: "HTML",

        reply_markup: JSON.stringify({ inline_keyboard: home_keyboard(state),hide_keyboard: true })
    }).then(async (e) => {
      

     
    if(flag)	{await removeMessage(id, bot,messageId);}else{
      if(state.msgCount>0){
        
        await removeMessage(id, bot,messageId-state.msgCount);
        state.msgCount=0;
      }else await removeMessage(id, bot,messageId-1);
    }
	}) 
     
}      