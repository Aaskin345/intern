import University from '../../../../models/University';
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
  const university = await University.findById(req.query.id);
  if (university) {
    await university.deleteOne(); // Use deleteOne() instead of remove()

    res.send({ message: 'Intern Deleted Successfully' });
  }
};

export default handler;
