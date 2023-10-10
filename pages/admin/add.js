import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

import Layout2 from '@/components/Layout2';

export default function AddScreen() {
  const [departmentName, setDepartmentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [universityName, setUniversityName] = useState('');

  const handleDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/department', {
        name: departmentName,
      });
      console.log(response.data); // Optional: Handle the response data
      // Clear the input field
      setDepartmentName('');
      // Show toast notification
      toast.success('Department added successfully!');
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  const handleCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/course', {
        name: courseName,
      });
      console.log(response.data); // Optional: Handle the response data
      // Clear the input field
      setCourseName('');
      // Show toast notification
      toast.success('Course added successfully!');
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleUniversity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/university', {
        name: universityName,
      });
      console.log(response.data); // Optional: Handle the response data
      // Clear the input field
      setUniversityName('');
      // Show toast notification
      toast.success('University added successfully!');
    } catch (error) {
      console.error('Error saving university:', error);
    }
  };

  return (
    <Layout2 title="Add Fields">
      <div className="bg-sky-500 flex min-h-screen">
        <ToastContainer />

        <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3 items-center">
          <div className="container flex items-center justify-center h-screen">
            <div className="items flex flex-col items-center justify-center">
              <motion.h1
                className="text-center text-sky-700 text-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                ADD COURSE, UNIVERSITY, DEPARTMENT
              </motion.h1>
              <label className="text-lg font-bold mb-2">
                Add a new department:
              </label>
              <motion.form
                onSubmit={handleDepartment}
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="text"
                  id="department"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  placeholder="Enter department name"
                  className="w-64 mr-2 bg-slate-400"
                />
                <motion.button
                  type="submit"
                  className="rounded bg-indigo-600 hover:bg-green-700 text-white font-bold py-2 px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </motion.form>

              <label className="text-lg font-bold mb-2">
                Add a new course:
              </label>
              <motion.form
                onSubmit={handleCourse}
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <input
                  type="text"
                  id="course"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Enter course name"
                  className="w-64 mr-2 bg-slate-400"
                />
                <motion.button
                  type="submit"
                  className="rounded bg-indigo-600 hover:bg-green-700 text-white font-bold py-2 px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </motion.form>

              <label className="text-lg font-bold mb-2">
                Add a new university:
              </label>
              <motion.form
                onSubmit={handleUniversity}
                className="flex items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <input
                  type="text"
                  id="university"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  placeholder="Enter university name"
                  className="w-64 mr-2 bg-slate-400"
                />
                <motion.button
                  type="submit"
                  className="rounded bg-indigo-600 hover:bg-green-700 text-white font-bold py-2 px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
}
