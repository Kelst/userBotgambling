const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const setISC = require("../../requestApi/setISC");
const setNaming = require("../../requestApi/setNaming");
const setText = require("../../requestApi/setText");
const setTitle = require("../../requestApi/setTitle");
const setUrl = require("../../requestApi/setUrl");
const checkNaming = require("../../tools/checkNaming");
const checkUrl = require("../../tools/checkUrl");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");
const messageId=require("../../tools/messageId")


module.exports=async(id,state,bot,msg,text)=>{
    messageId.id=msg.message_id;

    let interval
    let start
    let count
 

    function checkNumber(x) {
      if(isNaN(Number(x))){
          return false
      }else true
      
    }
  function returnWrongRequest(){
    bot.sendMessage(id,`Неверный формат ввода, попробуйте еще раз`,{
        reply_markup: {
            inline_keyboard:[[{
                text: `⬅️  Назад`, callback_data: `autopush`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
       
         await removeMessage(id, bot,  msg.message_id-1); 
    });
   
  }



    if(text.split("/").length===3){
    
        interval=text.split("/")[0]
        start=text.split("/")[1]
        count=text.split("/")[2]
        if(checkNumber(interval)===false||checkNumber(start)===false||checkNumber(count)===false){
            returnWrongRequest()
            return
        }
      
    }else if(text.split("/").length===2){
        interval=text.split("/")[0]
        start=text.split("/")[1]
        count=10
        if(checkNumber(interval)===false||checkNumber(start)===false||checkNumber(count)===false){
            returnWrongRequest()
            return
        }
    }else if(text.split("/").length===1){
        interval=text.split("/")[0]
        start=0;
        count=10;
        if(checkNumber(interval)===false||checkNumber(start)===false||checkNumber(count)===false){
            returnWrongRequest()
            return
        }
    }else{
        bot.sendMessage(id,`Неверный формат ввода, попробуйте еще раз`,{
            reply_markup: {
                inline_keyboard:[[{
                    text: `⬅️  Назад`, callback_data: `autopush`
                }],nav_keyboard[1]]
            }
        }).then(async () => {
           
             await removeMessage(id, bot,  msg.message_id-1); 
        });
        return
    }
    await setISC({id:state.control.idApp,interval:interval,start:start,count:count})
      state.control.type=""
      bot.sendMessage(id,`Интервал старт и количество пушей изменены`,{
          reply_markup: {
              inline_keyboard:[[{
                  text: `⬅️  Назад`, callback_data: `autopush`
              }],nav_keyboard[1]]
          }
      }).then(async () => {
         
           await removeMessage(id, bot,  msg.message_id-1); 
      });

		
	


}   