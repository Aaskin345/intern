import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import mongooConnect from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const { user } = req.session;
  const { name, email, password } = req.body;

  if (!user.isAdmin) {
    return res
      .status(403)
      .json({ message: 'Forbidden: Only admins can update credentials' });
  }

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    return res.status(422).json({
      message: 'Validation error',
    });
  }

  await mongooConnect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = name;
  toUpdateUser.email = email;

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  res.send({
    message: 'User updated',
  });
}

export default handler;
