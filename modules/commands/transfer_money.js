const {mongoInit, mention, monSep,
  convMonKZ, settings} = require('../export_other.js');

module.exports = async (msg) => {
  const data = await mongoInit(msg.senderId);
  const idTransferUser = convMonKZ(msg.$match[1]);
  const dataTransferUser = await mongoInit(idTransferUser);
  const ment = await mention(msg.senderId);
  const mentTransferUser = await mention(idTransferUser);

  if (dataTransferUser === 'ERR_ID') {
    return msg.send(`${ment}, укажите правильный ID`);
  };

  const count = convMonKZ(msg.$match[2]);
  if (!+count) return msg.send(`${ment}, укажите сумму!`);
  const transferCount = convMonKZ(settings.transfer);
  if (count > transferCount) {
    return msg.send(`${ment}, сумму до ${monSep(transferCount)}₽`);
  }
  if (count > data.balance) {
    return msg.send(`${ment}, у Вас недостаточно средств!`);
  }

  data.balance -= count;
  dataTransferUser.balance += count;

  const saveData = await mongoInit(msg.senderId, data);
  const saveDataTU = await mongoInit(idTransferUser, dataTransferUser, 'SAVE');
  if (saveData === 'ERR_CODE_1') return console.log(saveData);
  if (saveDataTU === 'ERR_CODE_1') return console.log(saveDataTU);

  return msg.send(`${ment}, перевод денежных средств:
  >> Кому: ${mentTransferUser}
  >> Сумма: ${monSep(count)}₽
  >> Ваш баланс: ${monSep(data.balance)}₽`);
};
