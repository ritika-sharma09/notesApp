const userModel = require('../Model/userSchema');
const token = require('../Utilities/tokenVerifcation');

exports.userRegister = async (req, res) => {
  try {
    console.log('req.body', req.body);
    await userModel.create(req.body);
    res.status(201).json({
      message: `${req.userName} registered successfully`,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const userData = await userModel.findOne({ userName: req.body.userName });
    if (!userData) {
      res.status(404).json({
        status: 'error',
        message: `${req.body.userName} this user is not registered`,
      });

    } else if (userData.password !== req.body.password) {
      res.status(404).json({
        status: 'error',
        message: `Invalid Password`,
      });
    } else {
      await token.tokenGenerated(userData, res);
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
};
