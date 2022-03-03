const axios = require('axios').default;
const App=require("../models/App")
module.exports = async function (req) {
    const naming=req.naming;
    let flag=false;
    const name=naming.split("*")[0].trim();
    const name_ref=naming.split("*")[1].trim();
                       
                        App.findOne({_id:req.id},async function (err, doc){
                            const findNaming=doc.naming.filter(e=>e.name===name);
                            if(findNaming.length===0)
                            {

                                doc.naming.push({
                                    name:name,
                                    name_ref:name_ref
                                   })
                                    try{
                                     await doc.save();
                                     flag=true;
                                     }
                                     catch(err){ 
                                         console.log(err);
                                        
                                         
                                     }

                            }else{ 
                                console.log("HERE"); 
                                doc.naming.forEach(async element => {
                                    if(element.name===findNaming[0].name){
                                        element.name_ref=name_ref;
                                       
                                    }
                                });
                                try{
                                    await doc.save();
                                    flag=true;
                                    }
                                    catch(err){ 
                                        console.log(err);
                                      
                                       
                                    }

                            }
                         
                           });
                         
return flag;
}
