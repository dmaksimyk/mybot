const {mongoInit, mention, shop} = require('../export_other.js');

module.exports = async (msg) => {
  const bussId = msg.$match[1];
  const data = await mongoInit(msg.senderId);
  const ment = await mention(msg.senderId);
  const bsns = shop.business.find((x) => x.id === Number(bussId));

  // eslint-disable-next-line max-len
  if (!bsns||!Number(bussId)) return msg.send(`${ment}, введите правильный "ID" бизнеса!`);
  // eslint-disable-next-line max-len
  if (data.purchases.business) return msg.send(`${ment}, у вас уже есть бизнес!`);
  // eslint-disable-next-line max-len
  if (data.balance < bsns.price_rub) return msg.send(`${ment}, на вашем балансе не хватает денег.`);

  data.balance -= bsns.price_rub;
  data.purchases.business = {
    id: bsns.id,
    earningTime: Date.now(),
    buyDate: Date.now(),
    upgrades: {
      factoryMoney: false,
      halfTax: false,
    },
  };

  const saveData = await mongoInit(msg.senderId, data);
  if (saveData === 'ERR_CODE_1') return;

  return msg.send(`${ment}, вы успешно купили бизнес. 
>> Введите: "Бизнес" для открытия меню управления!`);
};
