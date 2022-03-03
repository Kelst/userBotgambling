const axios = require('axios').default;
const App=require("../models/App")
const User=require("../models/User")
module.exports = async function (req) {
    const app= await App.find({});
    const userN= await User.find({userIdTelegram:req}).populate("apps")
    console.log(userN);
       let activeApp=[];
    try{
    activeApp=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true)||[];
    }
    catch(e){
        return [];
        console.log(e);
    }
   return {count:activeApp.length||0,myApp: userN[0]?.apps?.length||0};




}
 