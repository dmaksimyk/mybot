const {mongoInit} = require('../export_other.js');

module.exports = async (msg) => {
  const vkId = msg.senderId;
  const data = await mongoInit(vkId);

  if (data.mentioning) {
    data.mentioning = false;
  } else {
    data.mentioning = true;
  };

  const saveData = await mongoInit(vkId, data);

  if (saveData === 'ERR_CODE_1') return;
  const ment = (data.mentioning) ? `[id${vkId}|${data.tag}]` : `${data.tag}`;
  return msg.send(`${ment}, вы включили упоминание!`);
};
