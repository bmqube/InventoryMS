const authMW = (v) => {
  return async (req, res, next) => {
    next();
  };
};

export default authMW;
