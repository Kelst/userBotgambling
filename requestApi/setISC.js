const axios = require('axios').default;
const App=require("../models/App")
module.exports = async function (req) {
    console.log(req.interval);
    App.findOne({_id:req.id},async function (err, doc){
        doc.notification_interval=Number(req.interval);
        doc.notification_start=Number(req.start);
        doc.max_count=Number(req.count);
         try{
          await doc.save();
         return doc;
          }
          catch(err){
             
             return false;
          }
        });

}
