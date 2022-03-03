const axios = require('axios').default;
const App=require("../models/App")
module.exports = async function () {
    const app= await App.find({});
       let appCount={
        gambling:0,
        betting:0,
        finances:0,
        crypto:0,
        dating:0,
        subscriptions:0,
        nutra:0
       };
    try{
        appCount.gambling=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true&&el.type==="gambling").length||0;
        appCount.betting=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true&&el.type==="betting").length||0;
        appCount.finances=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true&&el.type==="finances").length||0;
        appCount.crypto=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true&&el.type==="crypto").length||0;
        appCount.dating=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true&&el.type==="dating").length||0;
        appCount.subscriptions=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true&&el.type==="subscriptions").length||0;
        appCount.subscriptions=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true&&el.type==="subscriptions").length||0;
    }
    catch(e){
        return appCount;
        console.log(e);
    }
   return appCount;




}
