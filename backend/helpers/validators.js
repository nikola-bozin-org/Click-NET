const statusCode = require('../statusCodes')
const jwt = require('../jwt')


const validate = (...validators) => async (req, res, next) => {
    for (const validator of validators) {
      const result = await validator(req);
      if (!result.valid) {
        return res.status(result.error.status).json({ error: result.error.message });
      }
    }
    next();
  };

const hasToken = (req) => ({
  valid: req.headers.token,
  error: { status: statusCode.UNAUTHORIZED, message: "Unauthorized." },
});


const tokenIsValid = (req) => {
  const verifyResult = jwt.verify(req.headers.token);
  return {
    valid: verifyResult,
    error: { status: statusCode.ERROR, message: "Invalid token." },
  };
};

// const userIsAdmin = (req) => {
//   const verifyResult = jwt.verify(req.headers.token);
//   return {
//     valid: verifyResult.role === userRoles.Admin,
//     error: { status: statusCode.ERROR, message: "You are not Admin!" },
//   };
// };

// const levelExists = async (req) => {
//   const { level } = req.body;
//   const foundLevel = await Levels.findOne({ level });
//   return {
//     valid: !!foundLevel,
//     error: {
//       status: statusCode.ERROR,
//       message: `Level ${level} does not exist.`,
//     },
//   };
// };


module.exports = {
    validate,hasToken,tokenIsValid
}
