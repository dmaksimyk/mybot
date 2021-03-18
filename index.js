const {VK} = require('vk-io');
const {HearManager} = require('@vk-io/hear');

const {mongoInit, config} = require('./modules/export_other.js');

const {balance, bonus, course, help, job, nick, nickMent,
  rpCmds, business, businessBuy, businessSell,
  businesses, businessUpgrade,
  casino, transfer, profile,
  reference, rules} = require('./modules/export_modules.js');

const {bite, castrate, cover, fuck,
  giveFive, hit, kiss, knock, lick,
  poison, pressTo, sex, toEmbrace, toKick,
  toLove, toStroke} = require('./modules/rp/export_rp.js');

const vk = new VK({token: config.token});
const bot = new HearManager();
const mentionPattern = new RegExp(
    String.raw`^(?:\[club${config.group_id}\|[^\]]+\])(?:[\s.,\'\"!?\-+]+|$)`,
    'i',
);

vk.updates.on('message', async (context, next) => {
  if (context.text) context.text = context.text.replace(mentionPattern, '');
  if (context.senderId < 0) return;
  const data = await mongoInit(context.senderId);
  console.log(`ID: ${data.vk_id}, NM: ${data.tag}, CMD: ${context.text}`);
  return next();
});

vk.updates.on('message_new', bot.middleware);

// Основные команды
bot.hear(/^Профиль$/i, async (msg) => {
  return msg.send(`${ await profile(msg.senderId) }`);
});

bot.hear(/^Перевод\s([^\s]+)\s([^\s]+)/i, async (msg) => {
  return await transfer(msg);
});

bot.hear(/^Баланс$/i, async (msg) => {
  return msg.send(`${ await balance(msg.senderId) }`);
});

bot.hear(/^Курс$/i, async (msg) => {
  return msg.send(`${ await course(msg.senderId) }`);
});


// Развлечения
bot.hear(/^Бонус$/i, async (msg) => {
  return await bonus(msg);
});

bot.hear(/^(Казино|Азино) (.*)/i, async (msg) => {
  return await casino(msg);
});


// Заработок
bot.hear(/^Работать$/i, async (msg) => {
  return await job(msg);
});


// Бизнес
bot.hear(/^Бизнес$/i, async (msg) => {
  return await business(msg);
});

bot.hear(/^Бизнесы$/i, async (msg) => {
  return msg.send(`${await businesses(msg.senderId)}`);
});

bot.hear(/^Продать бизнес$/i, async (msg) => {
  return await businessSell(msg);
});

bot.hear(/^Бизнесы (.*)/i, async (msg) => {
  return await businessBuy(msg);
});

bot.hear(/^Бизнес улучшить$/i, async (msg) => {
  return await businessUpgrade(msg);
});


// Другое
bot.hear(/^Помощь$/i, async (msg) => {
  return msg.send(`${ await help(msg.senderId) }`);
});

bot.hear(/^Рп$/i, async (msg) => {
  return msg.send(`${ await rpCmds(msg.senderId) }`);
});

bot.hear(/^Правила$/i, async (msg) => {
  return await rules(msg);
});

bot.hear(/^Справка$/i, async (msg) => {
  return await reference(msg);
});

bot.hear(/^погладили$/i, async (msg) => {
  return await toStroke(msg);
});

bot.hear(/^признаться в любви$/i, async (msg) => {
  return await toLove(msg);
});

bot.hear(/^Пнуть$/i, async (msg) => {
  return await toKick(msg);
});

bot.hear(/^Обнять$/i, async (msg) => {
  return await toEmbrace(msg);
});

bot.hear(/^Заняться сексом$/i, async (msg) => {
  return await sex(msg);
});

bot.hear(/^Прижать к себе$/i, async (msg) => {
  return await pressTo(msg);
});

bot.hear(/^Отравить$/i, async (msg) => {
  return await poison(msg);
});

bot.hear(/^Лизь$/i, async (msg) => {
  return await lick(msg);
});

bot.hear(/^Стукнуть$/i, async (msg) => {
  return await knock(msg);
});

bot.hear(/^Поцеловать$/i, async (msg) => {
  return await kiss(msg);
});

bot.hear(/^Ударить$/i, async (msg) => {
  return await hit(msg);
});

bot.hear(/^Дать пять$/i, async (msg) => {
  return await giveFive(msg);
});

bot.hear(/^Трахнуть$/i, async (msg) => {
  return await fuck(msg);
});

bot.hear(/^Укрыть пледиком$/i, async (msg) => {
  return await cover(msg);
});

bot.hear(/^Кастрировать$/i, async (msg) => {
  return await castrate(msg);
});

bot.hear(/^Кусь$/i, async (msg) => {
  return await bite(msg);
});

bot.hear(/^Ник (.*)/i, async (msg) => {
  return await nick(msg);
});

bot.hear(/^Упоминание$/i, async (msg) => {
  return await nickMent(msg);
});

bot.onFallback(async (context)=>{
  if (context.isChat) return;
  if (context.senderId < 0) return;
  await context.send('Такой команды не существует.');
});

console.log('im job!');
vk.updates.start().catch(console.error);

/* bot.hear(/^раздача$/i, async (msg) => {
  if(msg.senderId !== 419149056) return;
  promos[0].case[0].value += (Math.round(users.length * 0.005) + 5);
  token_usr.api.wall.post({
    owner_id: "-193680478",
    from_group: "1",
message: `Раздача на ${promos[0].case[0].value} кейсов!
Пиши боту: "Получить кейсы"!`,
    attachments: 0,
})
return msg.send(`Создан промокод на кейсы: ${promos[0].case[0].value}`);
}) */
