const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getCountCategory = require("../../requestApi/getCountCategory");
const getAppById = require("../../requestApi/getAppById");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");
const getApp = require("../../requestApi/getApp");
const getConst = require("../../tools/getConst");


module.exports=async(id,state,bot,query)=>{
    const choseApp=await getApp (state.control.idApp);
    const keyboardApp = [
        [{text:"Купить",url:"https://t.me/robinhooddev"}],
]


if(choseApp.length>0)
  { await bot.sendMessage(id, `${choseApp[0]?.name} (${getConst().get(choseApp[0]?.type)})\n\nСтоимость: ${choseApp[0]?.price}$\n\nЧтобы получить доступ к этому приложению, нажмите “Купить” и напишите об этом главному разработчику — тут можно задать интересующие вопросы и сделать оплату. После оплаты вы получаете полный доступ к настройке и использованию этого приложения.\n\nПодробную информацию о возможностях нашего сервиса можно узнать в разделе “FAQ” на главной странице.\n\n${choseApp[0].image_link}`, {
        reply_markup: {
            inline_keyboard: [...keyboardApp, [{
                text: `⬅️  Назад`, callback_data: `${state.control.type}`
            }], nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });
}else {
    await bot.sendMessage(id, `к сожалению, прила продана, или заблокирована.`, {
        reply_markup: {
            inline_keyboard: [ [{
                text: `⬅️  Назад`, callback_data: `${state.control.type}`
            }], nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    }); 
}

}     