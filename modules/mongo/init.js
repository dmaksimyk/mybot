const {VK} = require('vk-io');
// eslint-disable-next-line max-len
const vk = new VK({token: '048a7880ced88137f2069b8521714187aaae4fad1fb6f12af2497fe7a9c8663c15bb632033c12864a8322'});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dd_bot', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

const SaveUser = new mongoose.Schema({
  vk_id: Number,
  tag: String,
  mentioning: Boolean,
  balance: Number,
  usd_balance: Number,
  btc_balance: Number,
  dc_balance: Number,
  bonus: Number,
  exp: {
    user: Number,
    job: Number,
  },
  status: Number,
  purchases: {
    type: Object,
    default: {},
  },
  updates: {
    type: Object,
    default: {},
  },
}, {
  collection: 'Users',
  minimize: false,
});

const SavedUser = mongoose.model('UserReg', SaveUser);

module.exports = async (vkId, newDate, type) => {
  if (type === 'SAVE') {
    const checkUser = await SavedUser.findOne({vk_id: vkId, __v: newDate.__v});
    if ( checkUser ) {
      const value = 3000000000000000;
      if ( newDate.balance >= value) newDate.balance = value;
      await SavedUser.updateOne(checkUser, {
        balance: newDate.balance,
        __v: newDate.__v += 1,
      });
      return 'SUCESSFUL';
    }
    return 'ERR_CODE_1';
  }

  if (vkId === 'NOT_NUM' || vkId === 'ERR_NUM') return 'ERR_ID';

  const name = await vk.api.users.get({user_ids: vkId});
  if (!name[0].first_name) return 'ERR_ID';

  if ( newDate ) {
    const checkUser = await SavedUser.findOne({vk_id: vkId, __v: newDate.__v});
    if ( checkUser ) {
      const value = 3000000000000000;
      if ( newDate.balance >= value) newDate.balance = value;
      newDate.__v += 1;
      await SavedUser.updateOne(newDate);
      return 'SUCESSFUL';
    }
    return 'ERR_CODE_1';
  }
  const checkUser = await SavedUser.findOne({vk_id: vkId});
  if ( checkUser ) return checkUser;

  const user = {
    vk_id: vkId,
    tag: String(name[0].first_name),
    mentioning: true,
    balance: 1000,
    usd_balance: 0,
    btc_balance: 0,
    dc_balance: 0,
    bonus: Date.now(),
    exp: {
      user: 0,
      job: 0,
    },
    status: 0,
    purchases: {},
    updates: {},
  };

  return await new SavedUser(user).save();
};
