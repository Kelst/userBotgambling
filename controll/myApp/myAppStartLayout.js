const keyboard_buy = require("../../keyboard/keyboard_buy");
const nav_keyboard = require("../../keyboard/nav_keyboard");
const getUserApps = require("../../requestApi/getUserApps");
const getConst = require("../../tools/getConst");
const removeMessage = require("../../tools/removeMessage");
const ucFirst = require("../../tools/ucFirst");


module.exports=async(id,state,bot,query)=>{
const appsUser=await getUserApps(query.message.chat.id)
const constAB=new Map();
constAB.set("active","Активно")
.set("ban","Бан")
    if(appsUser?.length>0){ 
        const mapName= getConst();
        const actBanApp={
            act:0,
            ban:0
        }

        const keyboard=appsUser.map(e=>{
            if(e.status==="active"){
                actBanApp.act=actBanApp.act+1;
            }else if(e.status==="ban"){
                actBanApp.ban=actBanApp.ban+1;
            }
            return [
                {
                    text:`${e.name} (${mapName.get(e.type)}) - ${constAB.get(e.status)}`,callback_data:`show_my_app|${e._id}`
                }
            ]
        })
        bot.sendMessage(id,`Мои приложения\n\nАктивные - ${actBanApp.act}\nБан - ${actBanApp.ban}`, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [...keyboard, nav_keyboard[1]]
            }
        }).then(async () => {
            await removeMessage(query.message.chat.id, bot, query.message.message_id); 
        }); 
    }else{
        bot.sendMessage(id,`Как только вы оплатите приложение, вся его конфигурация будет происходить здесь.`, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [nav_keyboard[1]] 
            }
        }).then(async () => {
            await removeMessage(query.message.chat.id, bot, query.message.message_id); 
        }); 
    }


}     