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

    const ttClick=`\`https://app.appsflyer.com/${choseApp[0]?.bundle}?pid=bytedanceglobal_int&af_siteid=__CSITE__&c=__CAMPAIGN_NAME__&af_channel=__PLACEMENT__&af_c_id=__CAMPAIGN_ID__&af_adset=__AID_NAME__&af_adset_id=__AID__&af_ad=__CID_NAME__&af_ad_id=__CID__&af_ad_type=__CTYPE__&af_click_lookback=7d&clickid=__CALLBACK_PARAM__&advertising_id=__GAID__&idfa=__IDFA__&os=__OS__&af_ip=__IP__&af_ua=__UA__&af_lang=__SL__&redirect=false\``
    const ttImpression=`\`https://impression.appsflyer.com/${choseApp[0]?.bundle}?pid=bytedanceglobal_int&af_siteid=__CSITE__&c=__CAMPAIGN_NAME__&af_channel=__PLACEMENT__&af_c_id=__CAMPAIGN_ID__&af_adset=__AID_NAME__&af_adset_id=__AID__&af_ad=__CID_NAME__&af_ad_id=__CID__&af_ad_type=__CTYPE__&af_viewthrough_lookback=24h&clickid=__CALLBACK_PARAM__&advertising_id=__GAID__&idfa=__IDFA__&os=__OS__&af_ip=__IP__&af_ua=__UA__&af_lang=__SL__&redirect=false\``;
    
    bot.sendMessage(id,`click:\n\n${ttClick}\n\nimpression:\n\n${ttImpression}`,{
        parse_mode:"Markdown",
        reply_markup: {
            inline_keyboard:[[{
                text: `⬅️  Назад`, callback_data: `show_my_app|${state.control.idApp}`
            }],nav_keyboard[1]]
        }
    }).then(async () => {
        await removeMessage(query.message.chat.id, bot, query.message.message_id); 
    });

}      