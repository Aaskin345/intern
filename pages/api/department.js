import Department from '../../models/Department';
import mongooConnect from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongooConnect();
      const departments = await Department.find();
      res.status(200).json(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
