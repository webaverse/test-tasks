//node_modules
const { body } = require('express-validator');

const getExchange = () => {
  return [
    body('currency').exists(),
  ];
}

module.exports = {
  getExchange
};
