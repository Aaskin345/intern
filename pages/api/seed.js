import User from '../../models/User';
import data from '../../utils/data';
import { mongooConnect } from '../../utils/db'; // Update the import statement
import Department from '../../models/Department';
import Course from '../../models/Course';
import University from '../../models/University';

const handler = async (req, res) => {
  await mongooConnect(); // Update the connection method

  // Delete existing data
  await User.deleteMany();
  await Department.deleteMany();
  await Course.deleteMany();
  await University.deleteMany();

  // Insert new data
  await User.insertMany(data.users);
  await Department.insertMany(data.departments);
  await Course.insertMany(data.courses);
  await University.insertMany(data.universities);

  // Disconnect from MongoDB

  res.send({ message: 'Seeded successfully' });
};

export default handler;
