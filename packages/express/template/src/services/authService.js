const jwt = require("jsonwebtoken");

function generateUserToken(user) {
    //Example
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRY), issuer: "", audience: user }
  );
}


module.exports = {
    generateUserToken,
  };