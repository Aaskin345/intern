import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
export default function DashboardPage() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="bg-sky-500 flex min-h-screen">
        <div className="bg-gray-200 flex-grow rounded-lg mt-2 mr-3">
          <div className="flex justify-end p-4"></div>
          <h2>Hello {session?.user?.name}</h2>
          Your statistics
        </div>
      </div>
    </Layout>
  );
}
