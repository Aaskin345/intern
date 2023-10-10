import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import mongooConnect from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  await mongooConnect();
  const users = await User.find({});
  res.send(users);
};

export default handler;
