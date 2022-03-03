const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const getConst = require("../../tools/getConst");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");


module.exports=async(id,state,bot,query)=>{
    console.log(query.id,"IDDDD1");

    const idApp=query.data.split("|")[1];
    const choseApp=await getAppById(idApp); 
    const naming=choseApp[0]?.naming.length!=0?choseApp[0]?.naming.map(el=>{
        return `\n${el.name}: ${el.name_ref}`

    }):"не установлены";
    // \n\nАвтопуши: ${choseApp[0]?.notification_text===""?"*нет текста автопуша*":choseApp[0]?.notification_text} - через 60 мин после первого открытия\nприложения с интервалом 480 мин. Будет отправлено 10 push уведомлений.\nКеширование последней загруженной страницы: ${choseApp[0]?.save_last_url===true?"Да":"Нет"
    state.control.idApp=query.data.split("|")[1];
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
    if( state.flagLink===true){
        state.flagLink=false;
        bot.answerCallbackQuery( query.id, {text: 'Ваша глобальная ссылка изменена.'});
    }
    if( state.flagNaming===true){
        state.flagNaming=false;
        bot.answerCallbackQuery( query.id, {text: 'Вы добавили нейминг'});
    }
    const mapName= getConst();
    const textMessage=`${choseApp[0]?.name} (${mapName.get(choseApp[0]?.type)}) - ${choseApp[0]?.price}$\n\nРежим работы: ${choseApp[0]?.naming.length!=0?" нейминги":" глобальная ссылка"}\n\nГлобальная ссылка: ${choseApp[0]?.url===""?"не установлена":choseApp[0]?.url}\nНейминги: ${naming}\n\n${choseApp[0]?.google_play_url}`
    bot.sendMessage(id,textMessage, {
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [...keyboard,[{
                text: `⬅️  Назад`, callback_data: `my_app`
            }], nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    }); 


}     