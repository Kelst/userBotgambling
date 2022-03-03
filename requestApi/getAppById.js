const axios = require('axios').default;
const App=require("../models/App")
module.exports = async function (req) {
   try{
        const app= await App.find({_id:req,sold:true,visibility_public:false});
        if(app.length!=0){
            return app
        }else return false
    }
    catch(e){
        return false;
        console.log(e);
    }


}
