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
        bot.sendMessage(id,`Нейминги:${naming} \n\nНэйминг (сокр. название рекламной компании в используемом источнике) нужен для использования приложения несколькими людьми. Для этого, каждому нужно создать свой уникальный нэйминг и соответствующую ему ссылку. Дальше, прописав его в названии РК - у целевого пользователя будет окрываться та ссылка, которая соответствует уникальному нэймингу.\n\nНа пример, alexander111*https://www.youtube.com/ — это значит, что при установке приложения, если название РК = alexander111, то будет открываться https://www.youtube.com/\n\nНа данный момент, нэйминги можно использовать в Tiktok и Facebook.\n\nЧтобы добавить свой нэйминг, введите его в формате нэйминг*ссылка: `,{
            disable_web_page_preview:true,
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
        text:`Удалить нэйминг`, callback_data:`delete_naming|${choseApp[0]?._id}`
    }]]
    bot.sendMessage(id,`Нейминги:${naming} \n\nНэйминг (сокр. название рекламной компании в используемом источнике) нужен для использования приложения несколькими людьми. Для этого, каждому нужно создать свой уникальный нэйминг и соответствующую ему ссылку. Дальше, прописав его в названии РК - у целевого пользователя будет окрываться та ссылка, которая соответствует уникальному нэймингу.\n\nНа пример, alexander111*https://www.youtube.com/ — это значит, что при установке приложения, если название РК = alexander111, то будет открываться https://www.youtube.com/\n\nНа данный момент, нэйминги можно использовать в Tiktok и Facebook.\n\nЧтобы добавить свой нэйминг, введите его в формате нэйминг*ссылка: `,{
        disable_web_page_preview:true,
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