const {mention, config} = require('../export_other.js');

module.exports = async (msg) => {
  const ment = await mention(msg.senderId);

  return msg.send(`${ment}, справка по игре:
  >> Ссылка: ${config.reference}`);
};
