const { User } = require("../models");

class SessionsController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    
    if (!user) {
        return res.status(401).json({ message: 'User Not found' });
    }
    
    if (!(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'User Not found' });
    }

    return res.status(200).json({
      user,
      token: user.generatedToken(),
    });
  }
}

module.exports = new SessionsController();
