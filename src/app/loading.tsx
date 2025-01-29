import { Suspense } from 'react';

export default function RootLoading() {
  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Loading VaultVerify...</p>
      </div>
    </div>
  );
}