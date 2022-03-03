const TelegramApi = require('node-telegram-bot-api');
require('dotenv').config();
const bot_const_menu = require('./tools/modeApp');
const mongoose = require('mongoose');
const onStart = require('./controll/onStart');
const keyboard_home = require('./keyboard/keyboard_home');
const getStateApp = require('./requestApi/getStateApp');
const getCountCategory = require('./requestApi/getCountCategory');
const buyAppCategoryList = require('./controll/buyApp/buyAppCategoryList');
const buyAppGetCategoryListItem = require('./controll/buyApp/buyAppGetCategoryListItem');
const buyAppGetItem = require('./controll/buyApp/buyAppGetItem');
const removeMessage = require('./tools/removeMessage');
const buyApp = require('./controll/buyApp/buyApp');
const registerUser = require('./controll/registerUser');
const myAppStartLayout = require('./controll/myApp/myAppStartLayout');
const showMyApp = require('./controll/myApp/showMyApp');
const globalLink = require('./controll/myApp/globalLink');
const checkUrl = require('./tools/checkUrl');
const globalLinkSet = require('./controll/myApp/globalLinkSet');
const namingApp = require('./controll/myApp/namingApp');
const namingAppSet = require('./controll/myApp/namingAppSet');
const namingListDelete = require('./controll/myApp/namingListDelete');
const deleteThisNaming = require('./controll/myApp/deleteThisNaming');
const avtopushLayout = require('./controll/myApp/avtopushLayout');
const setTextApp = require('./controll/myApp/setTextApp');
const setTextAppReq = require('./controll/myApp/setTextAppReq');
const setAppISC = require('./controll/myApp/setAppISC');
const setTextAppISC = require('./controll/myApp/setTextAppISC');
const cacheLastPage = require('./controll/myApp/cacheLastPage');
const ttClickImpression = require('./controll/myApp/ttClickImpression');
const getFAQ = require('./tools/getFAQ');
const faqList = require('./controll/myApp/faqList');
const faqItem = require('./controll/myApp/faqItem');


let messageId =require("./tools/messageId")

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Connect DB'));
const bot = new TelegramApi(process.env.TOKKEN, { polling: true });
const state = {
	flagLink:false,
	flagNaming:false,
	appCount:{},
    counts:{},
	msgCount:0,
	
	userInfo:{
		userName:"",
		userIdTelegram:"",
		telegramUsername:""
	},
	mode: '',
	control: {
		idApp: '',
		type: ''
	}
};
const categoryApp=["gambling","betting","finances","crypto","dating","subscriptions","nutra"]
bot.on("message",async msg=>{
	const { id } = msg.chat;
	if(state.control.type!=bot_const_menu.globalRef||state.control.type!=bot_const_menu.setNaming||state.control.type!=bot_const_menu.setTitle||state.control.type!=bot_const_menu.setText||state.control.type!=bot_const_menu.setISC){
		state.msgCount=state.msgCount+1;
	setTimeout(async()=>{
		await removeMessage(id, bot,msg.message_id,msg.message_id);
	},200)	
		
	}
})

//старт бота
bot.onText(/\/start/, async (msg) => { 
	const { id } = msg.chat;
    state.mode=""
	state.userInfo.userName= msg.from.first_name+" "+ msg.from.last_name;
	state.userInfo.userIdTelegram=msg.from.id;
	state.userInfo.telegramUsername=msg.from.username;
	await registerUser(id,state,bot,msg)
	state.counts=await getStateApp(msg.from.id);
	state.control.type="";
	state.control.idApp="";
	messageId.id=msg.message_id;
    await onStart(id,state,bot,keyboard_home,msg.message_id);
    
}); 

//обробка головного меню

bot.on('callback_query', async (query) => {
	const id = query.message.chat.id; 
	const data = query.data;
	messageId.id=query.message.message_id;
	switch (data) {
	 
		//вивести список категорій
		case bot_const_menu.buyApp:
            state.mode=bot_const_menu.buyApp
			state.appCount=await getCountCategory();
			
			await buyAppCategoryList(id,state,bot,query)
			break;
				//мої апки
		case bot_const_menu.myApp:
            state.mode=bot_const_menu.myApp
			state.appCount=await getCountCategory();
			await myAppStartLayout(id,state,bot,query)
			break;

			//повернення на головну
			case bot_const_menu.home:

			state.mode="";
			state.control.type="";
			state.control.idApp="";
			state.flagLink=false;
			state.flagNaming=false;
			state.counts=await getStateApp(query.message.chat.id);
			state.count=await getStateApp(); 
            onStart(id,state,bot,keyboard_home, query.message.message_id,true);
			break; 
         
	} 
});

//обробка вибору категорії апки:
bot.on('callback_query', async (query) => {
		messageId.id=query.message.message_id;

	const id = query.message.chat.id; 
	const data = query.data;console.log(data);
	if (categoryApp.includes(data)&&(state.mode===bot_const_menu.buyApp)) {
		await buyAppGetCategoryListItem(id,state,bot,query,data)
		
	}

	//вивід інформації про апку
	if (data.indexOf("app_info|") != -1){
		state.control.idApp=data.split("|")[1];
		state.control.type=data.split("|")[2];
		await buyAppGetItem(id,state,bot,query)
		
	}
	if(data===bot_const_menu.buyThisApp){
		await buyApp(id,state,bot,query);
	}
	//обробка мої апки

if (data.indexOf("show_my_app|") != -1){
		state.control.idApp=data.split("|")[1];
		await	showMyApp(id,state,bot,query)
		
 } 
 //вхід глобальний лінк
 if(data==bot_const_menu.globalRef){
     await globalLink(id,state,bot,query)
 } 
 //вхід неймінги
 if(data==bot_const_menu.setNaming){
	state.control.type=bot_const_menu.setNaming;
	console.log(state.control.type,"Set Naming") 
	await namingApp(id,state,bot,query)
} 
//вхід видалення неймінга
if (data.indexOf("delete_naming|") != -1&&state.control.type===bot_const_menu.setNaming){
	state.control.idApp=data.split("|")[1];
	state.control.type=bot_const_menu.deleteThisNaming;
	await	namingListDelete(id,state,bot,query)
	
}
if(data.indexOf("delete_this_naming|") != -1){
	const appId=data.split("|")[1];
	const namingName=data.split("|")[2];
   await deleteThisNaming(id,state,bot,query,appId,namingName)
}
//вхід в автопуші
if(data==bot_const_menu.autopush){
	state.control.type=bot_const_menu.autopush;
	await avtopushLayout(id,state,bot,query)


	
} 

//встановити титулку повідомлення вхід
if(data.split("|")[0]==bot_const_menu.setTitle){
	state.control.type=bot_const_menu.setTitle;
	
	await setTextApp(id,state,bot,query)

	
} 
//встановити титулку повідомлення вхід
if(data.split("|")[0]==bot_const_menu.setText){
	state.control.type=bot_const_menu.setText;
	await setTextApp(id,state,bot,query,true)	
}
//встановити інтервал, старт кількість
if(data.split("|")[0]==bot_const_menu.setISC){
	state.control.type=bot_const_menu.setISC;
	await setAppISC(id,state,bot,query)
}
//кешування останньої сторінки
if(data==bot_const_menu.cachePage){
	state.control.type=bot_const_menu.cachePage;
  await  cacheLastPage(id,state,bot,query)
}
//
//вхід автопуші

if(data==bot_const_menu.ttClickImpression){
	state.control.type=bot_const_menu.ttClickImpression;
 await ttClickImpression(id,state,bot,query)
}
//faq
if(data==bot_const_menu.faq){
	state.control.type=bot_const_menu.faq;
	await faqList(id,bot,query)
}
if(data.split("|")[0]=="faqItem"){
	state.control.type=bot_const_menu.faq;
	await faqItem(id,bot,query,data)
}
 
}); 
//....................................................... 


bot.on("message",async msg => {
    messageId = msg.chat
	const text=msg.text;
   const { id } = msg.chat;
   //обробка встановлення url силки
   if(state.control.type===bot_const_menu.globalRef&&text!="/start"){
	await globalLinkSet(id,state,bot,msg,text)  
   } 
   //обробка встановлення неймингу

  if(state.control.type===bot_const_menu.setNaming){
await	namingAppSet(id,state,bot,msg,text) 
   } 
   //обробка встановити title
   if(state.control.type===bot_const_menu.setTitle&&text!="/start"){
	await setTextAppReq(id,state,bot,msg,text)
   }
    //обробка встановити text
	if(state.control.type===bot_const_menu.setText&&text!="/start"){
		await setTextAppReq(id,state,bot,msg,text,true)
	   }
	     //обробка встановити interval/start/cout_max
	if(state.control.type===bot_const_menu.setISC){
		await setTextAppISC(id,state,bot,msg,text)
	   }
}) 