import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSubmit, register } = useForm();

  const submitHandler = async () => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (response.ok) {
        const session = await getSession();

        if (session && session.user.isAdmin) {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch (err) {
      // Handle errors if needed
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
      <form
        className="bg-white p-8 rounded-md shadow-md w-96"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-4 flex items-center">
          <label htmlFor="email" className="text-gray-700 font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              },
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="password" className="text-gray-700 font-semibold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
}
