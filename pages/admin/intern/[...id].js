import Layout from '@/components/Layout';
import axios from 'axios';
import Nav2 from '@/components/Nav2';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [coursesData, setCoursesData] = useState([]);
  const [universitiesData, setUniversitiesData] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [nameError, setNameError] = useState('');
  const [courseError, setCourseError] = useState('');
  const [universityError, setUniversityError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [temperatureError, setTemperatureError] = useState('');
  const [period, setPeriod] = useState('');
  const [periodError, setPeriodError] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch intern details
    axios
      .get(`/api/admin/intern?id=${id}`)
      .then((response) => {
        const internData = response.data;
        setName(internData.name);
        setCourse(internData.course._id);
        setUniversity(internData.university._id);
        setDepartment(internData.department._id);
        setStartDate(internData.startDate);
        setEndDate(internData.endDate);
        setTemperature(internData.temperature);
      })
      .catch((error) => {
        console.error('Error fetching intern:', error);
      });

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
  }, [id]);

  const convertToCelsius = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMilliseconds = Math.abs(end - start);
    const days = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const periodValue = `${days} days`;
    setPeriod(periodValue);

    // Reset error states
    setNameError('');
    setCourseError('');
    setUniversityError('');
    setDepartmentError('');
    setStartDateError('');
    setEndDateError('');
    setTemperatureError('');
    let hasError = false;
    // Check for empty fields
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
    if (!temperature) {
      setTemperatureError('Temperature is required');
      hasError = true;
    }
    if (hasError) {
      return;
    }

    try {
      // Update intern
      await axios.put(`/api/admin/intern?id=${id}`, {
        name,
        course,
        university,
        department,
        startDate,
        endDate,
        temperature,
        period: days,
      });

      // Redirect to interns page
      router.push('/admin/interns');
    } catch (error) {
      console.error('Error updating intern:', error);
    }
  };

  return (
    <Layout>
      <div className="bg-sky-500 flex min-h-screen">
        <Nav2 />
        <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
          <h1>Edit Intern</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <p className="error">{nameError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="course">Course:</label>
              <select
                id="course"
                name="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">-- Select Course --</option>
                {coursesData.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {courseError && <p className="error">{courseError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="university">University:</label>
              <select
                id="university"
                name="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              >
                <option value="">-- Select University --</option>
                {universitiesData.map((university) => (
                  <option key={university._id} value={university._id}>
                    {university.name}
                  </option>
                ))}
              </select>
              {universityError && <p className="error">{universityError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">-- Select Department --</option>
                {departmentsData.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
              {departmentError && <p className="error">{departmentError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {startDateError && <p className="error">{startDateError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {endDateError && <p className="error">{endDateError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="temperature">Temperature:</label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
              {temperatureError && <p className="error">{temperatureError}</p>}
            </div>
            <button type="submit">Update Intern</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
