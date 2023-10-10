import bcryptjs from 'bcryptjs';
import User from '../../../../models/User';
import mongooConnect from '../../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await mongooConnect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  const hashedPassword = bcryptjs.hashSync(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
  });

  const user = await newUser.save();
  res.status(201).send({
    message: 'Created user successfully!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    password: password, // Include the password in the response
  });
}

export default handler;
