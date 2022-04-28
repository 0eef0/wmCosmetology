const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"})//normally 10m - 25m
}
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)//normally 10m - 25m
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}