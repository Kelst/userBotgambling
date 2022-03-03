const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getCountCategory = require("../../requestApi/getCountCategory");
const removeMessage = require("../../tools/removeMessage");
const messageId=require("../../tools/messageId")

module.exports=async(id,state,bot,query)=>{
    messageId.id=query.message.message_id
console.log(state.appCount);
const checkAppcount=(app)=>{
    for (const [key, value] of Object.entries(app)) {
		if(value!=0){
			return true
		}
	  }
}	 

    
        if(!checkAppcount(state.appCount)){
            bot.sendMessage(id,"На данный момент, нету приложений, готовых к продаже. Мы отправим уведомление, когда будет новая партия.",{
                reply_markup:{
                    inline_keyboard:[...keyboard_buy(state.appCount),nav_keyboard[1]]
                }
            }).then(e=>{
                removeMessage(query.message.chat.id, bot, query.message.message_id)
            })
        }else{   bot.sendMessage(id,"Выберите категорию:",{
        reply_markup:{ 
            inline_keyboard:[...keyboard_buy(state.appCount),nav_keyboard[1]]
        }
    }).then(e=>{
        removeMessage(query.message.chat.id, bot, query.message.message_id)
    })
}
    

}     