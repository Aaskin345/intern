import mongooConnect from '../../utils/db';
import Intern from '../../models/Intern';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongooConnect(); // Connect to the database

      const { name, course, university, department, startDate, endDate } =
        req.body;

      // Associate the authenticated user's ID with the intern
      const intern = new Intern({
        name,
        course,
        university,
        department,
        startDate,
        endDate,
      });

      const createdIntern = await intern.save();

      res.status(201).json(createdIntern);
    } catch (error) {
      console.error('Error creating intern:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      await mongooConnect(); // Connect to the database

      // Fetch interns associated with the authenticated user
      const interns = await Intern.find()
        .populate('course', 'name')
        .populate('university', 'name')
        .populate('department', 'name')
        .exec();

      res.status(200).json(interns);
    } catch (error) {
      console.error('Error fetching interns:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
