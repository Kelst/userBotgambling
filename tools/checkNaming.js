const checkUrl = require("./checkUrl");

module.exports=(str)=> {

    const arrReq=str.split("*");
    if(arrReq.length===2){
        if(checkUrl(arrReq[1]))
        {
        return true;
        
        }else false
    } else false

}