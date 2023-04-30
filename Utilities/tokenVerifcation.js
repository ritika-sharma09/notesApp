require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.tokenGenerated = (userData, res) => {
  try {
    const jwtPayload = {
      userName: userData.userName,
      iat: Math.floor(Date.now() / 1000) - 60,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const accessToken = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      message: `${userData.userName} logged in successfully`,
      accessToken: accessToken,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    console.log('req: ', req);
    const authHeader = req.headers.authorization;
    console.log('authHeader: ', authHeader);
    const accessToken = authHeader && authHeader.split(' ')[1];
    console.log('accessToken: ', accessToken);
    if (!accessToken) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid Request',
      });
    } else {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            res.status(404).json({
              status: 'fail',
              message: 'Token Expired! Please login to continue',
            });
          } else {
            req.currentUser = payload;
          }
        }
      );
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
};
