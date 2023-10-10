import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const CustomerLayout = ({ title, children }) => {
  const { data: session } = useSession(); // Get the session data
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        {title && <title>{title + ' - Admin Dashboard'}</title>}
        <meta name="description" content="Admin Dashboard" />
      </Head>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-green-300 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-lg text-white font-bold">
                Admin Dashboard
              </span>
            </Link>
          </div>
          {session ? ( // Check if user is authenticated
            <nav>
              <ul className="flex space-x-4">
                {/* Regular customer navigation links */}

                {/* Admin-specific navigation links */}
                {session.user.isAdmin && (
                  <>
                    <li>
                      <Link
                        href="/admin/dashboard"
                        className="text-white hover:text-gray-200"
                      >
                        Admin Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/user"
                        className="text-white hover:text-gray-200"
                      >
                        Manage Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/createu"
                        className="text-white hover:text-gray-200"
                      >
                        Create user
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/all"
                        className="text-white hover:text-gray-200"
                      >
                        All
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/add"
                        className="text-white hover:text-gray-200"
                      >
                        Add
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/details"
                        className="text-white hover:text-gray-200"
                      >
                        Details
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/newintern"
                        className="text-white hover:text-gray-200"
                      >
                        New intern
                      </Link>
                    </li>

                    {/* Add more admin-specific links as needed */}
                  </>
                )}
                <li>
                  <div className="relative">
                    <button
                      className="text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={handleClick}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {isClicked ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        )}
                      </svg>
                    </button>
                    {isClicked && (
                      <div className="absolute top-12 right-0 mt-2 w-48 bg-sky-300 rounded-md shadow-lg">
                        <div className="py-1">
                          <Link
                            href="/admin/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={logoutClickHandler}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </nav>
          ) : (
            <div className="text-white text-center">
              <Link href="/login">User Login</Link>
            </div>
          )}
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <footer className="bg-green-300 p-4 text-white text-center">
          &copy; {new Date().getFullYear()} Intern system. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default CustomerLayout;
