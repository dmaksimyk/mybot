const {mention, monSep, shop} = require('../export_other.js');

module.exports = async (vkId) => {
  const ment = await mention(vkId);
  let bus = '';

  for (let i = 0; i < shop.business.length; i++) {
    bus += `\n
${shop.business[i].id}. ${shop.business[i].name}.
>> Доход: ${monSep(shop.business[i].profit)}₽/час
>> Налог: ${monSep(shop.business[i].tax)}₽/час
>> Цена: ${monSep(shop.business[i].price_rub)}₽`;
  };

  return `${ment}, список бизнесов: ${bus} 
  
  >> Для покупки, введите: <<Бизнесы "ID">>`;
};
