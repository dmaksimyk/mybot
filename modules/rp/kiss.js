/* eslint-disable max-len */
const {mongoInit, mention, config} = require('../export_other.js');
const {VK} = require('vk-io');
const vk = new VK({token: config.token});

module.exports = async (msg) => {
  const ment = await mention(msg.senderId);
  if (!msg.replyMessage) return msg.send(`${ment}, перешлите сообщение.`);
  if (msg.replyMessage.senderId < 0) return;
  if (msg.senderId === msg.replyMessage.senderId) return msg.send(`${ment}, вы не можете поцеловать себя!`);
  const data = await mongoInit(msg.replyMessage.senderId);
  const user = await vk.api.users.get({
    user_ids: msg.replyMessage.senderId,
  });
  const replyUser = await vk.api.users.get({
    user_ids: msg.replyMessage.senderId, name_case: 'acc',
  });
  if (data.tag === user[0].first_name) return msg.send(`${ment}, вы поцеловали ${(data.mentioning === true) ? `[id${replyUser[0].id}|${replyUser[0].first_name}]` : `${replyUser[0].first_name}`}!`);
  return msg.send(`${ment}, вы поцеловали ${(data.mentioning === true) ? `[id${data.vk_id}|${data.tag}]` : `${data.tag}` }!`);
};
