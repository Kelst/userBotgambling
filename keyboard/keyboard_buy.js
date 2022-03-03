const getConst = require("../tools/getConst");
const { map } = require("./nav_keyboard");

module.exports = function(appCount ) {
	const mapName= getConst();
    let keyboard_buy=[]
	function ucFirst(str){
		if (!str) return str;
		return str[0].toUpperCase() + str.slice(1);
	}
	for (const [key, value] of Object.entries(appCount)) {
		if(value!=0){
			keyboard_buy.push([
				{
					text: `${mapName.get(key)} (${value})`, callback_data: `${key}`	
				}
			])
		}
	  }
	return keyboard_buy;
	
};

