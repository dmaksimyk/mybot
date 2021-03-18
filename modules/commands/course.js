const fetch = require('node-fetch');
const {mention, monSep} = require('../export_other.js');

module.exports = async (vkId) => {
  const bts = await fetch('https://blockchain.info/ru/ticker');
  const usd = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const ment = await mention(vkId);
  bts = await bts.json();
  usd = await usd.json();
  return `${ment}, актуальные курсы: 
〽 BTC - USD: ${monSep(+(bts.RUB['15m'].toFixed('')))}$
〽 USD - RUB: ${ ~~(usd.Valute.USD.Value) }₽

💰 Комиссия на вывод: \n >> 15% + коммиссия платежной системы.`;
};

// 〽 DC - USD: ${ (~~(+('0.'+ ~~(usd.Valute.USD.Value)) * 5)
// <= 1 ) ? 1 : ~~(+('0.'+ ~~(usd.Valute.USD.Value)) * 5) }$
