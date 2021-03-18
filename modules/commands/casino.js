const {mongoInit, mention, monSep,
  rands, convMonKZ} = require('../export_other.js');

module.exports = async (msg) => {
  const data = await mongoInit(msg.senderId);
  const ment = await mention(msg.senderId);

  const count = convMonKZ(msg.$match[2].split(' ')[0]);
  if (!+count) return msg.send(`${ment}, укажите ставку!`);
  if (count > data.balance) {
    return msg.send(`${ment}, у Вас недостаточно средств!`);
  }

  let random = 0;
  if (data.balance >= convMonKZ('10k')) random = rands(1, 50);
  if (data.balance >= convMonKZ('100k')) random = rands(1, 100);
  if (data.balance >= convMonKZ('1kk')) random = rands(1, 200);
  if (data.balance >= convMonKZ('5kk')) random = rands(1, 300);

  const schance = random >= 35 ? 0.7 : 2;
  const win = schance * count;

  data.balance = schance < 1 ? data.balance -= win : data.balance += win;

  const saveData = await mongoInit(msg.senderId, data);
  if (saveData === 'ERR_CODE_1') return;

  return msg.send(`${ment}, игра в казино:
  >> Результат: ${schance < 1 ? '-' : '+'}${monSep(win)}₽
  >> Ваш баланс: ${monSep(data.balance)}₽`);
};
