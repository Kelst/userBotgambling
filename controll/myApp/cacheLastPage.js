const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const deleteNamingbyName = require("../../requestApi/deleteNamingbyName");
const removeMessage = require("../../tools/removeMessage");
const bot_const_menu=require("../../tools/modeApp");
const cacheToggle = require("../../requestApi/cacheToggle");
const ucFirst = require("../../tools/ucFirst");
const getConst = require("../../tools/getConst");


module.exports=async(id,state,bot,query)=>{
  
    const { chat, message_id, text } = query.message
    
    if(await cacheToggle({id:state.control.idApp})){
        const choseApp=await getAppById(state.control.idApp);
    
    
        const naming=choseApp[0]?.naming.length!=0?choseApp[0]?.naming.map(el=>{
            return `\n${el.name}: ${el.name_ref}`
    
        }):"не установлены";
    const keyboard=[
        [{
            text:"Изменить глобальную ссылку",callback_data:"global_ref"
        }], 
        [{
            text:"Нэйминги",callback_data:"set_naming"
        }],
        [{
            text:"Автопуши",callback_data:"autopush" 
        }],
        [{
            text:`Кэширование последней страницы (${choseApp[0]?.save_last_url===true?"Да":"Нет"})`,callback_data:"cache_page"
        }],
        [{
            text:"TT (click & impression)",callback_data:"tt_click_impression"
        }],

        

    ]
    console.log(query.id,"IDDDD");
    bot.answerCallbackQuery({
        callback_query_id: query.id,
        text: `${choseApp[0]?.save_last_url===true?"Кэшировать страницу":"Не кэшировать страницу"}`
    })   
       
    const textMessage=`${choseApp[0]?.name} (${getConst().get(choseApp[0]?.type)}) - ${choseApp[0]?.price}$\n\nРежим работы: ${choseApp[0]?.naming.length!=0?" нейминги":" глобальная ссылка"}\n\nГлобальная ссылка: ${choseApp[0]?.url===""?"не установлена":choseApp[0]?.url}\nНейминги - ${naming}\n\n${choseApp[0]?.google_play_url}`

    
        bot.editMessageText(textMessage, {
            chat_id: chat.id,
            message_id: message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [...keyboard,[{
                    text: `⬅️  Назад`, callback_data: `my_app`
                }], nav_keyboard[1]]
            }
        })

    }
    
    



}     