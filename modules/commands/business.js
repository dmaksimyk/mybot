const {mongoInit, mention, monSep, shop,
  convTime} = require('../export_other.js');

module.exports = async (msg) => {
  const data = await mongoInit(msg.senderId);
  const ment = await mention(msg.senderId);

  if (!data.purchases.business) {
    return msg.send(`${ment}, у вас нет бизнеса!
>> Введите <<бизнесы>> для просмотра списка доступных бизнесов!`);
  };

  const bsns = shop.business.find((x) => x.id === data.purchases.business.id);

  const bsnsFctr = convTime(data.purchases.business.earningTime, 'HOURS_BSNS');
  const bsnsTwoFctr = convTime(data.purchases.business.buyDate, 'HOURS_BSNS');
  const bsnsFctry = ~~bsnsFctr;
  const bsnsTwoFctry = ~~bsnsTwoFctr;

  const business = {
    income: 0,
    income_status: ``,
    tax: 0,
    tax_status: ``,
    balance: 0,
    payback: 0,
    upgrades: ``,
  };

  if (data.purchases.business.upgrades.factoryMoney) {
    business.income = bsns.profit + (bsns.profit * 0.5);
    business.income_status = `( +x0.5 )`;
  } else {
    business.income = bsns.profit;
    business.income_status = ``;
  }

  if (data.purchases.business.upgrades.halfTax) {
    business.tax = bsns.tax - (bsns.tax * 0.4);
    business.tax_status = `( -40% )`;
  } else {
    business.tax = bsns.tax;
    business.tax_status = ``;
  }

  if (!data.purchases.business.upgrades.halfTax) {
    business.upgrades = `\n>> Улучшение: "Меньше налог".
>> Цена улучшения: ${monSep(~~(bsns.price_rub * 0.3))}₽
>> Команда: "Бизнес улучшить"`;
  }

  if (!data.purchases.business.upgrades.factoryMoney) {
    business.upgrades = `\n>> Улучшения: "Увеличить доход".
>> Цена улучшения: ${monSep(~~(bsns.price_rub * 0.2))}₽
>> Команда: "Бизнес улучшить"`;
  }

  if (
    data.purchases.business.upgrades.halfTax &&
    data.purchases.business.upgrades.factoryMoney
  ) business.upgrades = '';

  business.balance = bsnsFctry * (business.income - business.tax);
  business.payback = bsnsTwoFctry * (business.income - business.tax);

  return msg.send(`${ment} статистика бизнеса:
>> Доход: ${monSep(~~(business.income))}₽/ч ${business.income_status}
>> Налог: ${monSep(~~(business.tax))}₽/ч ${business.tax_status}
>> Баланс: ${monSep(~~(business.balance))}₽
>> Окупаемость: ${monSep(~~(business.payback))}₽
${business.upgrades}`);
};
