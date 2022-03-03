const axios = require('axios').default;
const App=require("../models/App")
module.exports = async function (req) {
    let  appsCategory;
    try{
          appsCategory= await App.find({type:req,sold:false,status:"active",confirm_app:false,visibility_public:true})||[];
        return appsCategory
    }
    catch(e){
        return appsCategory
    }
    finally{
        return appsCategory
    }
 




}
