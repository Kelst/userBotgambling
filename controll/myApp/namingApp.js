const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getAppById = require("../../requestApi/getAppById");
const getUserApps = require("../../requestApi/getUserApps");
const setUrl = require("../../requestApi/setUrl");
const checkUrl = require("../../tools/checkUrl");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");


module.exports=async(id,state,bot,query)=>{
    const choseApp=await getAppById(state.control.idApp);
    state.control.idApp=choseApp[0]?._id;
    const naming=choseApp[0]?.naming.length!=0?choseApp[0]?.naming.map(el=>{
        return `\n${el.name}: ${el.name_ref}`

    }):" -";
    state.control.type="set_naming"
    if(choseApp[0]?.naming.length===0){
        bot.sendMessage(id,`Нейминги:${naming} \n\nВведите нейминг рекламной кампании и ссылку в следующем формате:\nnaming * link`,{
            reply_markup: {
                inline_keyboard:[[{
                    text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
                }],nav_keyboard[1]]
            }
        }).then(async () => {
            await removeMessage(query.message.chat.id, bot, query.message.message_id); 
        });
    }else {
    const keyboard=[[{
        text:`Удалить нейминги`, callback_data:`delete_naming|${choseApp[0]?._id}`
    }]]
    bot.sendMessage(id,`Нейминги:${naming} \n\nВведите нейминг рекламной кампании и ссылку в следующем формате:\nnaming * link`,{
        reply_markup: {
            inline_keyboard:[...keyboard,[{
                text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });
}
 


}      