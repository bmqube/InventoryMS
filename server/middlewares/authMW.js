const authMW = (v) => {
  return async (req, res, next) => {
    next();
  };
};

module.exports = authMW;
