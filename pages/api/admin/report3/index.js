import mongooConnect from '../../../../utils/db';
import University from '../../../../models/University';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongooConnect(); // Connect to the database

      const totalCount = await University.countDocuments(); // Count the total number of documents in the University collection

      res.status(200).json({ totalCount });
    } catch (error) {
      console.error('Error fetching total number of universities:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
