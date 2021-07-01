const convertMoney = (money) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD",
  });
  
  return formatter.format(money);
}

module.exports = convertMoney;