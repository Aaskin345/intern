import mongooConnect from '../../../../utils/db';
import Course from '../../../../models/Course';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongooConnect(); // Connect to the database

      const totalCount = await Course.countDocuments(); // Count the total number of documents in the Course collection

      res.status(200).json({ totalCount });
    } catch (error) {
      console.error('Error fetching total number of courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
