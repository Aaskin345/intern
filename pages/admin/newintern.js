import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Layout2 from '@/components/Layout2';

export default function FormPage() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [coursesData, setCoursesData] = useState([]);
  const [universitiesData, setUniversitiesData] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [nameError, setNameError] = useState('');
  const [courseError, setCourseError] = useState('');
  const [universityError, setUniversityError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Fetch courses
    axios
      .get('/api/course')
      .then((response) => {
        setCoursesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });

    // Fetch universities
    axios
      .get('/api/university')
      .then((response) => {
        setUniversitiesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching universities:', error);
      });

    // Fetch departments
    axios
      .get('/api/department')
      .then((response) => {
        setDepartmentsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    // Reset error states
    setNameError('');
    setCourseError('');
    setUniversityError('');
    setDepartmentError('');
    setStartDateError('');
    setEndDateError('');

    // Check for empty fields
    let hasError = false;
    if (!name) {
      setNameError('Name is required');
      hasError = true;
    }
    if (!course) {
      setCourseError('Course is required');
      hasError = true;
    }
    if (!university) {
      setUniversityError('University is required');
      hasError = true;
    }
    if (!department) {
      setDepartmentError('Department is required');
      hasError = true;
    }
    if (!startDate) {
      setStartDateError('Start date is required');
      hasError = true;
    }
    if (!endDate) {
      setEndDateError('End date is required');
      hasError = true;
    }
    if (hasError) {
      console.error('Error: Some fields are empty');
      return;
    }

    const data = {
      name,
      course,
      university,
      department,
      startDate,
      endDate,
    };

    try {
      const response = await axios.post('/api/admin/intern', data);
      console.log('Intern created:', response.data);
      router.push('/admin/details');
    } catch (error) {
      console.error('Error creating intern:', error);
      // Handle the error message as needed, e.g., set an error state variable or display a toast notification
    }
  };

  return (
    <Layout2 title="New Intern">
      <div className="bg-sky-500 min-h-screen flex">
        <div className="bg-gray-200 flex-grow rounded-lg  mr-3 container mt-5">
          <h1 className="mb-4 text-centre font-semibold text-3xl text-sky-600">
            Add Intern{' '}
          </h1>
          <div className="justify-between">
            <form onSubmit={handleSubmit} className="pt-5 flex flex-col">
              <label htmlFor="name">Enter full name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
              />
              {nameError && <span className="error">{nameError}</span>}
              <label htmlFor="course">Choose course:</label>
              <select
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="border border-gray-300 px-2 py-1 m-3"
              >
                <option value="">-- Choose your course --</option>
                {coursesData.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {courseError && <span className="error">{courseError}</span>}
              <label htmlFor="university">Choose university:</label>
              <select
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="border border-gray-300 px-2 py-1 m-3"
              >
                <option value="">-- Choose your university --</option>
                {universitiesData.map((university) => (
                  <option key={university._id} value={university._id}>
                    {university.name}
                  </option>
                ))}
              </select>
              {universityError && (
                <span className="error">{universityError}</span>
              )}
              <label htmlFor="department">Choose department:</label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border border-gray-300 px-2 py-1 m-3"
              >
                <option value="">
                  -- Choose the department you are posted to --
                </option>
                {departmentsData.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
              {departmentError && (
                <span className="error">{departmentError}</span>
              )}
              <div className="flex flex-col mb-4">
                <label htmlFor="startDate" className="mb-1 font-bold">
                  Start date:
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 px-2 py-1"
                />
                {startDateError && (
                  <span className="error">{startDateError}</span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="endDate" className="mb-1 mr-1 font-bold">
                  End date:
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 px-2 py-1"
                />
                {endDateError && (
                  <span className="error text-red">{endDateError}</span>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout2>
  );
}
