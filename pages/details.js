import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
export default function DetailsPage() {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    // Fetch interns data
    axios
      .get('/api/intern')
      .then((response) => {
        setInterns(response.data);
      })
      .catch((error) => {
        console.error('Error fetching interns:', error);
      });
  }, []);

  return (
    <Layout>
      <div className="bg-sky-500 flex min-h-screen">
        <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
          <div className="flex justify-end p-4"></div>
          <table className="basic mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>University</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern._id}>
                  <td>{intern.name}</td>
                  <td>{intern.course.name}</td>
                  <td>{intern.university.name}</td>
                  <td>{intern.department.name}</td>
                  <td>{intern.startDate}</td>
                  <td>{intern.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
