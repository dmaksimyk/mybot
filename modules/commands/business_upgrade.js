const {mongoInit, mention, shop} = require('../export_other.js');

module.exports = async (msg) => {
  const data = await mongoInit(msg.senderId);
  const ment = await mention(msg.senderId);
  const bsns = shop.business.find((x) => x.id === data.purchases.business.id);

  if (!data.purchases.business) return msg.send(`${ment}, у вас нет бизнеса!`);
  if (data.purchases.business.upgrades.factoryMoney === false) {
    if (data.balance < Math.ceil(bsns.price_rub * 0.2)) {
      return msg.send(`${ment}, у вас не хватает денег на балансе!`);
    };
    data.balance -= Math.ceil(bsns.price_rub * 0.2);
    data.purchases.business.upgrades.factoryMoney = true;
    const saveData = await mongoInit(msg.senderId, data);
    if ( saveData === 'ERR_CODE_1' ) return;
    return msg.send(`${ment}, вы купили улучшение:
>> Увеличить доход!`);
  }
  if (data.purchases.business.upgrades.halfTax === false) {
    if (data.balance < Math.ceil(bsns.price_rub * 0.3)) {
      return msg.send(`${ment}, у вас не хватает денег на балансе!`);
    };
    data.balance -= Math.ceil(bsns.price_rub * 0.3);
    data.purchases.business.upgrades.halfTax = true;
    const saveData = await mongoInit(msg.senderId, data);
    if ( saveData === 'ERR_CODE_1' ) return;
    return msg.send(`${ment}, вы купили улучшение:
>> Меньше налог!`);
  }
  if (
    data.purchases.business.upgrades.factoryMoney === true &&
    data.purchases.business.upgrades.halfTax === true ) {
    return msg.send(`${ment}, у вас куплены все улучшения!`);
  }
  return;
};
