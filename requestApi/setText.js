const axios = require('axios').default;
const App=require("../models/App")
module.exports = async function (req) {
    App.findOne({_id:req.id},async function (err, doc){
        doc.notification_text=req.text.trim();
         try{
          await doc.save();
         return doc;
          }
          catch(err){
             
             return false;
          }
        });

}
