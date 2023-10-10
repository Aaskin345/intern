import User from '../../../../models/User';
import mongooConnect from '../../../../utils/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const deleteHandler = async (req, res) => {
  await mongooConnect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (
      user.email === 'admin01@gmail.com' ||
      user.email === 'admin02@example.com'
    ) {
      return res.status(400).send({ message: 'Cannot delete admin' });
    }
    await user.deleteOne();
    res.send({ message: 'User Deleted Successfully' });
  }
};

export default handler;
