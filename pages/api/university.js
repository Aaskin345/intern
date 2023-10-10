import University from '../../models/University';
import mongooConnect from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongooConnect();
      const universities = await University.find();
      res.status(200).json(universities);
    } catch (error) {
      console.error('Error fetching universities:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
