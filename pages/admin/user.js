import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';

import { getError } from '../../utils/error';
import Link from 'next/link';
import Layout2 from '@/components/Layout2';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
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
    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: '',
    });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/user`);
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

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/user/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('User deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Layout2 title="Users">
        <div className="bg-sky-500 flex min-h-screen">
          <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
            <div className="grid md:grid-cols-4 md:gap-5">
              <div className="overflow-x-auto md:col-span-3">
                <h1 className="mb-4 text-3xl text-sky-600">Users</h1>
                {loadingDelete && <div>Deleting...</div>}
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div className="alert-error">{error}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-4 px-2 py-1 rounded"
                    />

                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="px-5 text-left">ID</th>
                          <th className="p-5 text-left">NAME</th>
                          <th className="p-5 text-left">EMAIL</th>
                          <th className="p-5 text-left">ADMIN</th>
                          <th className="p-5 text-left">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user._id} className="border-b">
                            <td className=" p-5 ">
                              {user._id.substring(20, 24)}
                            </td>
                            <td className=" p-5 ">{user.name}</td>
                            <td className=" p-5 ">{user.email}</td>
                            <td className=" p-5 ">
                              {user.isAdmin ? 'YES' : 'NO'}
                            </td>
                            <td className=" p-5 ">
                              {/* <Link href={`/admin/user/${user._id}`} passHref>
                                <a type="button" className="default-button">
                                  <span className="pr-2 text-green-700 hover:font-bold">
                                    Edit
                                  </span>
                                </a>
                              </Link>
                              &nbsp; */}
                              <button
                                type="button"
                                onClick={() => deleteHandler(user._id)}
                                className="text-rose-700 hover:font-blue"
                              >
                                Delete
                              </button>
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
