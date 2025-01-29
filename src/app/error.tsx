'use client';

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorComponentProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops!</h1>
        <p className="text-xl text-gray-600 mb-8">
          {error.message || 'Something went wrong'}
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try again
          </button>
          <a
            href="/"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to home
          </a>
        </div>
      </div>
    </div>
  );
}