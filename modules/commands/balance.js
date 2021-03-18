const {mongoInit, mention, monSep} = require('../export_other.js');

module.exports = async (vkId) => {
  const data = await mongoInit(vkId);
  const ment = await mention(vkId);
  return `${ment}, ваш баланс:
💳 >> ${monSep(data.balance)}₽
${(data.usd_balance >= 1) ? `💳 >> ${monSep(data.usd_balance)}$` : `` }
${(data.btc_balance >= 1) ? `💳 >> ${monSep(data.btc_balance)}₿` : `` }
${(data.dc_balance >= 1) ? `💰 >> ${monSep(data.dc_balance)}DC` : `` }`;
};
