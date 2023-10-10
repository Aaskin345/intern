import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';

import { getError } from '../../utils/error';
import Layout2 from '@/components/Layout2';
import { useRouter } from 'next/router';
import Link from 'next/link';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, interns: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTER_PERIOD':
      return { ...state, filterPeriod: action.payload };
    case 'SET_FILTER_DEPARTMENT':
      return { ...state, filterDepartment: action.payload };
    case 'SET_FILTER_COURSE':
      return { ...state, filterCourse: action.payload };
    case 'SET_FILTER_UNIVERSITY':
      return { ...state, filterUniversity: action.payload };
    case 'SET_FILTER_START_DATE':
      return { ...state, filterStartDate: action.payload };
    case 'SET_FILTER_END_DATE':
      return { ...state, filterEndDate: action.payload };
    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [
    {
      loading,
      error,
      interns,
      successDelete,
      loadingDelete,
      searchQuery,
      filterPeriod,
      filterDepartment,
      filterCourse,
      filterUniversity,
      filterStartDate,
      filterEndDate,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    interns: [],
    error: '',
    searchQuery: '',
    filterPeriod: '',
    filterDepartment: '',
    filterCourse: '',
    filterUniversity: '',
    filterStartDate: '',
    filterEndDate: '',
  });
  const router = useRouter();
  const handleDownload = async () => {
    try {
      const response = await axios.get('/api/admin/download');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'interns.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      toast.error('Failed to download interns');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/intern`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (internId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/intern/${internId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Intern deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  const handleSearch = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const handleFilterPeriod = (e) => {
    dispatch({ type: 'SET_FILTER_PERIOD', payload: e.target.value });
  };

  const handleFilterDepartment = (e) => {
    dispatch({ type: 'SET_FILTER_DEPARTMENT', payload: e.target.value });
  };

  const handleFilterCourse = (e) => {
    dispatch({ type: 'SET_FILTER_COURSE', payload: e.target.value });
  };

  const handleFilterUniversity = (e) => {
    dispatch({ type: 'SET_FILTER_UNIVERSITY', payload: e.target.value });
  };

  const handleFilterStartDate = (e) => {
    dispatch({ type: 'SET_FILTER_START_DATE', payload: e.target.value });
  };

  const handleFilterEndDate = (e) => {
    dispatch({ type: 'SET_FILTER_END_DATE', payload: e.target.value });
  };

  const filteredInterns = interns.filter((intern) => {
    const { name, course, university, department, startDate, endDate } = intern;

    if (
      name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      course.name.toLowerCase().includes(filterCourse.toLowerCase()) &&
      university.name.toLowerCase().includes(filterUniversity.toLowerCase()) &&
      department.name.toLowerCase().includes(filterDepartment.toLowerCase()) &&
      startDate.toLowerCase().includes(filterStartDate.toLowerCase()) &&
      endDate.toLowerCase().includes(filterEndDate.toLowerCase())
    ) {
      if (filterPeriod === 'current') {
        // Filter for current interns based on start and end date
        const currentDate = new Date();
        return (
          new Date(startDate) <= currentDate && new Date(endDate) >= currentDate
        );
      } else if (filterPeriod === 'past') {
        // Filter for past interns based on end date
        const currentDate = new Date();
        return new Date(endDate) < currentDate;
      } else if (filterPeriod === 'future') {
        // Filter for future interns based on start date
        const currentDate = new Date();
        return new Date(startDate) > currentDate;
      } else {
        return true;
      }
    }

    return false;
  });

  return (
    <>
      <Layout2 title="Details">
        <div className="bg-sky-500 flex min-h-screen">
          <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
            <div className="grid md:grid-cols-4 md:gap-5">
              <div className="overflow-x-auto md:col-span-3">
                <h1 className="mb-4 text-centre font-semibold text-3xl text-sky-600">
                  Interns
                </h1>
                {loadingDelete && <div>Deleting...</div>}
                <div className="flex items-center mb-4">
                  <label className="mr-2">Search:</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by name..."
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <label className="mr-2">Period:</label>
                  <select
                    value={filterPeriod}
                    onChange={handleFilterPeriod}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">All</option>
                    <option value="current">Current</option>
                    <option value="past">Past</option>
                    <option value="future">Future</option>
                  </select>
                </div>
                <div className="flex items-center mb-4">
                  <label className="mr-2">Department:</label>
                  <input
                    type="text"
                    value={filterDepartment}
                    onChange={handleFilterDepartment}
                    placeholder="Filter by department"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <label className="mr-2">Course:</label>
                  <input
                    type="text"
                    value={filterCourse}
                    onChange={handleFilterCourse}
                    placeholder="Filter by course"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <label className="mr-2">University:</label>
                  <input
                    type="text"
                    value={filterUniversity}
                    onChange={handleFilterUniversity}
                    placeholder="Filter by university"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <label className="mr-2">Start Date:</label>
                  <input
                    type="text"
                    value={filterStartDate}
                    onChange={handleFilterStartDate}
                    placeholder="Filter by start date"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <label className="mr-2">End Date:</label>
                  <input
                    type="text"
                    value={filterEndDate}
                    onChange={handleFilterEndDate}
                    placeholder="Filter by end date"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div className="alert-error">{error}</div>
                ) : filteredInterns.length === 0 ? (
                  <div>No results found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="px-5 text-left">ID</th>
                          <th className="p-5 text-left">NAME</th>
                          <th className="p-5 text-left">COURSE</th>
                          <th className="p-5 text-left">UNIVERSITY</th>
                          <th className="p-5 text-left">DEPARTMENT</th>
                          <th className="p-5 text-left">STARTDATE</th>
                          <th className="p-5 text-left">ENDDATE</th>
                          <th className="p-5 text-left">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInterns.map((intern) => (
                          <tr key={intern._id} className="border-b">
                            <td className="p-5 ">
                              {intern._id.substring(20, 24)}
                            </td>
                            <td className="p-5 ">{intern.name}</td>
                            <td className="p-5 ">{intern.course.name}</td>
                            <td className="p-5 ">{intern.university.name}</td>
                            <td className="p-5 ">{intern.department.name}</td>
                            <td className="p-5 ">{intern.startDate}</td>
                            <td className="p-5 ">{intern.endDate}</td>

                            <td className="p-5 ">
                              <button
                                type="button"
                                onClick={() => deleteHandler(intern._id)}
                                className=" bg-red-500 hover:bg-red-700 font-bold py-2 px-4 text-white rounded"
                              >
                                Delete
                              </button>
                            </td>
                            <td className="p-5">
                              <button
                                onClick={handleDownload}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Download
                              </button>
                            </td>
                            <td>
                              <Link href={'/admin/intern/' + intern._id}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout2>
    </>
  );
}

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
