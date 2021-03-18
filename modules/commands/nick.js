/* eslint-disable max-len */
const {mongoInit, mention, settings} = require('../export_other.js');

module.exports = async (msg) => {
  const data = await mongoInit(msg.senderId);
  const ment = await mention(msg.senderId);

  if (msg.$match[1].length > settings.lengthName.to) return msg.send(`${ment}, ник не может быть больше ${settings.lengthName.to}-ти символов.`);
  if (msg.$match[1].length < settings.lengthName.from) return msg.send(`${ment}, ник не может быть меньше ${settings.lengthName.from}-х символов.`);

  data.tag = msg.$match[1];
  const saveData = await mongoInit(msg.senderId, data);
  if ( saveData === 'ERR_CODE_1' ) return;
  return msg.send(`${ment}, вы сменили никнейм на "${msg.$match[1]}"`);
};
