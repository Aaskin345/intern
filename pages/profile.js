import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Layout from '@/components/Layout';
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
      await axios.put('/api/auth/update', {
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
    <Layout>
      <div title="Profile">
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
                        message: 'Password must be at least 6 characters',
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
                        message:
                          'Confirm password must be at least 6 characters',
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
                        Passwords do not match
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
    </Layout>
  );
}

ProfileScreen.auth = true;
