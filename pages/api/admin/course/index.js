import mongooConnect from '../../../../utils/db';
import Course from '../../../../models/Course';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongooConnect(); // Connect to the database

      const { name } = req.body;

      const course = new Course({
        name,
      });

      const createdCourse = await course.save();

      res.status(201).json(createdCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      await mongooConnect(); // Connect to the database

      // Register all the models before performing operations on them
      await Course.init();

      const courses = await Course.find().select('name').exec();

      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
