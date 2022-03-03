module.exports = function({ counts}) {
	return [
		[
			{
				text: `Купить приложение ${counts.count===0?"":"("+counts.count+")"}`,
				callback_data: 'buy_app'
			}
		],
		[
			{
				text: `Мои приложения ${counts.myApp===0?"":"("+counts.myApp+")"}`,
				callback_data: 'my_app'
			}
		],
		[
			{
				text: `FAQ`,
				url: 'https://telegra.ph/FAQ-02-28-7'
			}
		],
		[
			{
				text: `Сотрудничество`,
				callback_data: 'cooperation',
				url:"https://t.me/robinhooddev"
			}
		],

		

	];
};
