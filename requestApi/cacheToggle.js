const axios = require('axios').default;
const App=require("../models/App")
module.exports = async function (req) {
    const app= await App.findOne({_id:req.id})
    
    app.save_last_url=!app.save_last_url;
 

    try{
        await app.save();

        return true;
    }
    catch(e){
        return false;
    }
   

}
 