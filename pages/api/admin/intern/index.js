import mongooConnect from '../../../../utils/db';
import Intern from '../../../../models/Intern';
import Course from '../../../../models/Course';
import University from '../../../../models/University';
import Department from '../../../../models/Department';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongooConnect(); // Connect to the database

      const { name, course, university, department, startDate, endDate } =
        req.body;

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

      // Register all the models before performing operations on them
      await Course.init();
      await University.init();
      await Department.init();

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
  } else if (req.method === 'PUT') {
    try {
      await mongooConnect(); // Connect to the database

      const { id, name, course, university, department, startDate, endDate } =
        req.body;

      const updatedIntern = await Intern.findByIdAndUpdate(
        id,
        {
          name,
          course,
          university,
          department,
          startDate,
          endDate,
        },
        { new: true } // Return the updated intern document
      )
        .populate('course', 'name')
        .populate('university', 'name')
        .populate('department', 'name')
        .exec();

      if (!updatedIntern) {
        return res.status(404).json({ error: 'Intern not found' });
      }

      res.status(200).json(updatedIntern);
    } catch (error) {
      console.error('Error updating intern:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
