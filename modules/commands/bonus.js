/* eslint-disable max-len */
const {mongoInit, mention, monSep, convTime,
  rands, settings} = require('../export_other.js');

module.exports = async (msg) => {
  const data = await mongoInit(msg.senderId);
  const ment = await mention(msg.senderId);

  const setBonus = settings.bonus;
  const randMoney = rands(setBonus.randMoney[0], setBonus.randMoney[1]);
  const randMoneyDouble = rands(setBonus.randMoneyDouble[0], setBonus.randMoneyDouble[1]);
  const randExp = rands(setBonus.randExp[0], setBonus.randExp[1]);

  if (data.bonus > Date.now()) {
    return msg.send(`${ment}, вы уже получали бонус за этот час!`);
  };

  data.bonus = convTime(1, 'IN_HOURS');
  data.balance += randMoney;
  data.exp.user += randMoney;
  if (data.exp.user >= 1000) data.balance += randMoneyDouble;

  const saveData = await mongoInit(msg.senderId, data);
  if (saveData === 'ERR_CODE_1') return;

  const rmn = monSep(Number(randMoneyDouble));
  const money = (data.exp.user >= 1000) ? `( +${rmn}₽ )` : ``;

  msg.send(`${ment}, вы получили: 
>> Деньги: ${monSep(Number(randMoney))}₽ ${money}
>> UEXP: + ${randExp} UEXP`);
  return msg.send({sticker_id: (randExp === 1) ? 50437 : 51581});
};
