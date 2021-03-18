const {mongoInit, mention, monSep, shop} = require('../export_other.js');

module.exports = async (msg) => {
  const data = await mongoInit(msg.senderId);
  const ment = await mention(msg.senderId);

  if (!data.purchases.business) return msg.send(`${ment}, у вас нет бизнеса!`);
  const bsns = shop.business.find((x) => x.id === data.purchases.business.id);
  data.balance += bsns.price_rub * 0.5;
  delete data.purchases.business;
  const saveData = await mongoInit(msg.senderId, data);
  if (saveData === 'ERR_CODE_1') return;
  return msg.send(`${ment}, вы успешно продали бизнес за 50% от его стоимости!
\n>> Деньги за продажу: ${monSep(bsns.price_rub * 0.5)}₽`);
};
