import React from 'react';
import { signOut, useSession } from 'next-auth/react';

const SignOutButton = () => {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      // Handle sign out error
      console.error('Sign out error:', error);
    }
  };

  if (status === 'loading') {
    // Show loading indicator while session data is being fetched
    return <div>Loading...</div>;
  }

  if (!session) {
    // If user is not in session, no need to show sign out button
    return null;
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-white bg-red-500 py-2 px-4 rounded-md"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
