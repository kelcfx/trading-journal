'use client';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';

export default function Dashboard() {
  const { user, loading, signInWithGoogle, signInAsGuest, logout } = useAuth();

  if (loading) return <Layout><div>Loading...</div></Layout>;

  if (!user) {
    return (
      <Layout>
        <div className="text-center space-y-4 mt-20">
          <h1 className="text-2xl font-semibold">Sign In to Your Trading Journal</h1>
          <button onClick={signInWithGoogle} className="px-4 py-2 bg-blue-600 text-white rounded">Sign In with Google</button>
          <button onClick={signInAsGuest} className="px-4 py-2 bg-gray-600 text-white rounded">Continue as Guest</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Welcome, {user.displayName || 'Guest'}</h1>
        <button onClick={logout} className="text-red-500">Logout</button>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">📈 Trade Logs Section</div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">📊 Analytics Charts</div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">📅 Calendar View</div>
      </div>
    </Layout>
  );
}
