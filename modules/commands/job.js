const {mongoInit, mention, monSep, settings} = require('../export_other.js');

module.exports = async (msg) => {
  const data = await mongoInit(msg.senderId);
  const ment = await mention(msg.senderId);

  const jobMoney = {
    money: 5,
    lvl: ``,
    jexp: 1,
    money_factory: ``,
    jexp_factory: ``,
  };

  if (data.status >= 1) {
    jobMoney.jexp = 2;
    jobMoney.jexp_factory = `( x2 )`;
  };
  const expFactor = Math.floor(jobMoney.jexp * settings.jobFactor.exp);
  data.exp.job += expFactor;

  if (data.exp.job >= 10000) {
    jobMoney.lvl += `макс.`;
    jobMoney.money = 300;
  } else if (data.exp.job >= 1000) {
    jobMoney.lvl += `${monSep(data.exp.job)}/10.000 ( 4 lvl )`;
    jobMoney.money = 150;
  } else if (data.exp.job >= 100) {
    jobMoney.lvl += `${monSep(data.exp.job)}/1.000 ( 3 lvl )`;
    jobMoney.money = 75;
  } else if (data.exp.job >= 10) {
    jobMoney.lvl += `${monSep(data.exp.job)}/100 ( 2 lvl )`;
    jobMoney.money = 25;
  } else {
    jobMoney.lvl += `${monSep(data.exp.job)}/10 ( 1 lvl )`;
    jobMoney.money = 10;
  }

  if (data.status >= 1) {
    jobMoney.money = jobMoney.money * 2;
    jobMoney.money_factory = `( x2 )`;
  };

  const moneyFactor = Math.floor(jobMoney.money * settings.jobFactor.money);
  data.balance += moneyFactor;

  const saveData = await mongoInit(msg.senderId, data);
  if ( saveData === 'ERR_CODE_1' ) return;

  return msg.send(`${ment}, вы поработали:
>> Деньги: ${moneyFactor}₽ ${jobMoney.money_factory}
>> Уровень: ${jobMoney.lvl}
>> JEXP: ${expFactor}exp ${jobMoney.jexp_factory}`);
};
