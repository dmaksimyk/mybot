const {mongoInit, mention, monSep, shop} = require('../export_other.js');

module.exports = async (vkId) => {
  const data = await mongoInit(vkId);
  const ment = await mention(vkId);

  let purchases = `>> Покупки: \n`;
  if (data.purchases.business) {
    const bsns = shop.business.find((x) => x.id === data.purchases.business.id);
    purchases += `>> Бизнес: ${bsns.name}.\n`;
  }
  if (!data.purchases.business) purchases = `>> Покупок нет.`;

  let status = '';
  if (data.status === 0) status = 'Обычный';
  if (data.status === 1) status = 'VIP';
  if (data.status === 2) status = 'Platinum';

  return `${ment}, ваш профиль:
>> Ваш ID: ${data.vk_id}.
>> Ваш баланс: ${monSep(data.balance)}₽
>> Статус: ${status}.
>> User Exp: ${monSep(data.exp.user)}.
>> Job Exp: ${monSep(data.exp.job)}.

${purchases}`;
};
