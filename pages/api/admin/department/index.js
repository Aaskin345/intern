import mongooConnect from '../../../../utils/db';
import Department from '../../../../models/Department';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongooConnect(); // Connect to the database

      const { name } = req.body;

      const department = new Department({
        name,
      });

      const createdDepartment = await department.save();

      res.status(201).json(createdDepartment);
    } catch (error) {
      console.error('Error creating department:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      await mongooConnect(); // Connect to the database

      // Register all the models before performing operations on them
      await Department.init();

      const departments = await Department.find().select('name').exec();

      res.status(200).json(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
