import User from '../models/User';

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Invalid Email and Password Combination.' });
    }

    const checkPassword = await user.checkPassword(password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ error: 'Invalid Email and Password Combination 2' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: user.generateToken(),
    });
  }
}

export default new AuthController();
