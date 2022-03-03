const axios = require('axios').default;
const App=require("../models/App")
module.exports = async function (req) {
    const app= await App.findOne({_id:req.id})
    
    const newNamingArray=app.naming.filter(e=>e.name!=req.name)
    app.naming=newNamingArray;
 

    try{
        await app.save();

        return true;
    }
    catch(e){
        return false;
    }
   

}
 