import jsonexport from 'jsonexport/dist';
import Intern from '../../../models/Intern';
import { mongooConnect } from '../../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Connect to the database
    await mongooConnect();

    // Fetch the interns from the database and populate the referenced fields
    const interns = await Intern.find()
      .populate('course', 'name')
      .populate('university', 'name')
      .populate('department', 'name');

    // Extract nested property values and map the intern data to the desired CSV format
    const csvData = interns.map((intern) => {
      const courseName = intern.course ? intern.course.name : '';
      const universityName = intern.university ? intern.university.name : '';
      const departmentName = intern.department ? intern.department.name : '';

      return {
        ID: intern._id,
        Name: intern.name,
        Course: courseName,
        University: universityName,
        Department: departmentName,
        StartDate: intern.startDate,
        EndDate: intern.endDate,
      };
    });

    // Convert the CSV data to a string
    const csvString = await new Promise((resolve, reject) => {
      jsonexport(csvData, (err, csv) => {
        if (err) {
          reject(err);
        } else {
          resolve(csv);
        }
      });
    });

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });

    // Set the response headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename=interns.csv');
    res.setHeader('Content-Type', 'text/csv');

    // Send the file as a response
    res.send(blob);
  } catch (error) {
    console.error('Error downloading interns:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
