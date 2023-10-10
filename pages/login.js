import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form'; // Added this import
import { toast } from 'react-toastify';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm(); // Using the useForm hook

  const submitHandler = async () => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!response.ok) {
        setAuthError('Invalid email or password');
        return;
      }

      // Fetch the user session after successful login
      const session = await getSession();

      if (session && session.user.isAdmin) {
        // Redirect admin to admin dashboard
        window.location.href = '/admin/dashboard';
      } else {
        // Redirect regular user to user dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form
        className="bg-white p-8 rounded-md shadow-md"
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
                message: 'Please enter a valid email',
              },
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

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

        {errors.password && (
          <div className="text-red-500 ">{errors.password.message}</div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
