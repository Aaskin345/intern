import mongooConnect from '../../../../utils/db';
import University from '../../../../models/University';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongooConnect(); // Connect to the database

      const { name } = req.body;

      const university = new University({
        name,
      });

      const createdUniversity = await university.save();

      res.status(201).json(createdUniversity);
    } catch (error) {
      console.error('Error creating university:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      await mongooConnect(); // Connect to the database

      // Register all the models before performing operations on them
      await University.init();

      const universities = await University.find().select('name').exec();

      res.status(200).json(universities);
    } catch (error) {
      console.error('Error fetching universities:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
