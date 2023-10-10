import Course from '../../models/Course';
import mongooConnect from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongooConnect();
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
