module.exports = (count) => {
  if (+count && +count < 0) return +count;
  count = +count.replace(/k|к/gi, '000');
  count = count ? count : 'NOT_NUM';
  if (count <= 0) return 'ERR_NUM';
  return count;
};
