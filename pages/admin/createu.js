import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getError } from '../../utils/error';
import Layout2 from '@/components/Layout2';

function AdminUsersScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    try {
      await axios.post('/api/admin/createuser', data);
      toast.success('User created successfully');
      // Reset the form after successful submission
      const credentials = {
        email: email,
        password: password,
      };
      await sendCredentialsToUser(email, credentials);
      reset();
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <Layout2 title="Create User">
        <div className="bg-sky-500 flex min-h-screen">
          <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
            <div className="container flex items-center justify-center h-screen">
              <div className="items flex flex-col items-center justify-center">
                <h1 className="mb-4 text-3xl text-sky-600">Create User</h1>

                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                      id="email"
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                      id="password"
                      {...register('password', {
                        required: 'Password is required',
                      })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create User
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Layout2>
    </>
  );
}

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
