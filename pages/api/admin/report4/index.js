import mongooConnect from '../../../../utils/db';
import Intern from '../../../../models/Intern';
import Department from '../../../../models/Department'; // Import the Department model

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongooConnect(); // Connect to the database

      const internsByDepartment = await Intern.aggregate([
        {
          $group: {
            _id: '$department',
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: Department.collection.name, // Use the actual name of your Department collection
            localField: '_id',
            foreignField: '_id',
            as: 'departmentInfo',
          },
        },
        {
          $unwind: '$departmentInfo',
        },
        {
          $project: {
            _id: 1,
            count: 1,
            departmentName: '$departmentInfo.name', // Assuming department name field is 'name'
          },
        },
      ]);

      res.status(200).json(internsByDepartment);
    } catch (error) {
      console.error('Error fetching interns by department:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
