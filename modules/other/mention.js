const mongoInit = require('../mongo/init.js');

module.exports = async (vkId) => {
  const data = await mongoInit(vkId);
  return (data.mentioning) ? `[id${data.vk_id}|${data.tag}]` : `${data.tag}`;
};
