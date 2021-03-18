const Intl = require('intl');

module.exports = (num) => {
  num = Number(num);
  return new Intl.NumberFormat('de-DE').format(Number(num));
};
