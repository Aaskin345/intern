import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout2 from '@/components/Layout2';

const DataList = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
    fetchUniversities();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/admin/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/admin/department');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchUniversities = async () => {
    try {
      const response = await axios.get('/api/admin/university');
      setUniversities(response.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`/api/admin/course/${id}`);
      fetchCourses();
      toast.success('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`/api/admin/department/${id}`);
      fetchDepartments();
      toast.success('Department deleted successfully!');
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleDeleteUniversity = async (id) => {
    try {
      await axios.delete(`/api/admin/university/${id}`);
      fetchUniversities();
      toast.success('University deleted successfully!');
    } catch (error) {
      console.error('Error deleting university:', error);
    }
  };

  // Filter the data based on the search query
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout2 title="All ">
      <div className="bg-sky-500 min-h-screen">
        <div className="flex">
          <ToastContainer />
          <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
            <motion.div
              className="flex-grow p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/admin/add"
                className="bg-green-500 text-white px-2 py-1 rounded mb-4 inline-block"
              >
                Add
              </Link>

              <input
                type="text"
                placeholder="Search courses,departments,universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 px-2 py-1 rounded"
              />

              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left font-bold text-4xl">Courses</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <motion.tr
                      key={course._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <td className="px-4 py-2">{course.name}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left font-bold text-4xl">
                      Departments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartments.map((department) => (
                    <motion.tr
                      key={department._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <td className="px-4 py-2">{department.name}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteDepartment(department._id)}
                          className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left text-4xl font-extrabold">
                      Universities
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUniversities.map((university) => (
                    <motion.tr
                      key={university._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <td className="px-4 font-semibold tpy-2">
                        {university.name}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteUniversity(university._id)}
                          className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default DataList;
