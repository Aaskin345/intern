import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout2 from '@/components/Layout2';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [totalInterns, setTotalInterns] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [internsByDepartment, setInternsByDepartment] = useState([]);

  useEffect(() => {
    fetch('/api/admin/report1')
      .then((response) => response.json())
      .then((data) => setTotalInterns(data.totalInterns))
      .catch((error) => console.error('Error fetching total interns:', error));

    fetch('/api/admin/report3')
      .then((response) => response.json())
      .then((data) => setTotalCourses(data.totalCourses))
      .catch((error) => console.error('Error fetching total courses:', error));

    fetch('/api/admin/report2')
      .then((response) => response.json())
      .then((data) => setTotalUniversities(data.totalUniversities))
      .catch((error) =>
        console.error('Error fetching total universities:', error)
      );

    fetch('/api/admin/report4')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInternsByDepartment(data);
        } else {
          console.error('Data fetched is not an array:', data);
        }
      })
      .catch((error) =>
        console.error('Error fetching interns by department:', error)
      );
  }, []);

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
            <h3>Interns by Department:</h3>
            <ul>
              {internsByDepartment.map((department) => (
                <li key={department._id}>
                  {department._id}: {department.count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout2>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
