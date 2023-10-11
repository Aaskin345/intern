import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout2 from '@/components/Layout2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [totalInterns, setTotalInterns] = useState([]);
  const [totalCourses, setTotalCourses] = useState([]);
  const [totalUniversities, setTotalUniversities] = useState([]);
  const [internsByDepartment, setInternsByDepartment] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('/api/admin/report1');
        setTotalInterns(response1.data.totalInterns);

        const response3 = await axios.get('/api/admin/report3');
        setTotalCourses(response3.data.totalCourses);

        const response2 = await axios.get('/api/admin/report2');
        setTotalUniversities(response2.data.totalUniversities);

        const response4 = await axios.get('/api/admin/report4');
        if (Array.isArray(response4.data)) {
          setInternsByDepartment(response4.data);
        } else {
          console.error('Data fetched is not an array:', response4.data);
        }

        setLoading(false); // Data has been loaded, set loading to false
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Handle errors and set loading to false
      }
    };

    fetchData();
  }, []);

  // Conditional rendering while data is loading
  if (loading) {
    return (
      <Layout2 title="Admin Page">
        <div className="bg-sky-500 flex min-h-screen">
          <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
            <p>Loading...</p>
          </div>
        </div>
      </Layout2>
    );
  }

  return (
    <Layout2 title="Admin Page">
      <div className="bg-sky-500 flex min-h-screen">
        <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
          <h2>Hello {session?.user?.name}</h2>
          <div>
            <h3>Total Interns: {totalInterns}</h3>
            <h3>Total Courses: {totalCourses}</h3>
            <h3>Total Universities: {totalUniversities}</h3>
          </div>
          <div>
            <h3 className="text-center font-bold text-2xl">
              Interns by Department:
            </h3>
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 font-semibold text-left">
                    Department Name
                  </th>
                  <th className="py-2 px-4 font-semibold text-left">Count</th>
                  <th className="py-2 px-4 font-semibold text-left">
                    <button className="bg-slate rounded-md">Action</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {internsByDepartment.map((department) => (
                  <tr key={department._id} className="border-t border-gray-300">
                    <td className="py-2 px-4">{department.departmentName}</td>
                    <td className="py-2 px-4">{department.count}</td>
                    <Link href="/admin/all">
                      <td className="py-2 px-4 font-semibold text-left">
                        <button className="bg-sky-400 text-white px-2 py-1 rounded mb-4 text-centre">
                          View
                        </button>
                      </td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout2>
  );
}
