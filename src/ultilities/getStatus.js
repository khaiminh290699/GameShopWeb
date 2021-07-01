const ORDER_STATUS = {
  0: "waiting",
  1: "pending",
  2: "finish",
  3: "reject"
}

const getStatus = (status) => {
  return ORDER_STATUS[status];
}

module.exports = getStatus;