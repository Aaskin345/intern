import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { getError } from '../../utils/error';
import axios from 'axios';

import Layout2 from '@/components/Layout2';

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session) {
      setValue('name', session.user?.name);
      setValue('email', session.user?.email);
    }
  }, [session, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/admin/update', {
        name,
        email,
        password,
      });
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <Layout2>
        <div title=" Admin Profile">
          <div className="bg-sky-500 flex min-h-screen">
            <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
              <div className="flex justify-center pt-20">
                <form
                  className="max-w-screen-sm bg-white shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4"
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <h1 className="mb-4 text-2xl font-bold text-green-600">
                    Update Profile
                  </h1>

                  <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-400"
                      id="name"
                      autoFocus
                      {...register('name', {
                        required: 'Please enter name',
                      })}
                    />
                    {errors.name && (
                      <div className="text-red-500">{errors.name.message}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="w-full bg-slate-400"
                      id="email"
                      {...register('email', {
                        required: 'Please enter email',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                          message: 'Please enter valid email',
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="text-red-500">{errors.email.message}</div>
                    )}
                  </div>

                  <div className="mb-4 ">
                    <label htmlFor="password">Password</label>
                    <input
                      className="w-full bg-slate-400"
                      type="password"
                      id="password"
                      {...register('password', {
                        minLength: {
                          value: 6,
                          message: 'password is more than 5 chars',
                        },
                      })}
                    />
                    {errors.password && (
                      <div className="text-red-500 ">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      className="w-full bg-slate-400"
                      type="password"
                      id="confirmPassword"
                      {...register('confirmPassword', {
                        validate: (value) => value === getValues('password'),
                        minLength: {
                          value: 6,
                          message: 'confirm password is more than 5 chars',
                        },
                      })}
                    />
                    {errors.confirmPassword && (
                      <div className="text-red-500 ">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === 'validate' && (
                        <div className="text-red-500 ">
                          Password do not match
                        </div>
                      )}
                  </div>

                  <div className="mb-4">
                    <button className="rounded bg-indigo-600 hover:bg-green-700 text-white font-bold py-2 px-4 w-full">
                      Update Profile
                    </button>
                  </div>
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

ProfileScreen.auth = true;
