"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";

const JobErrorFallback = ({ error }: { error: Error }) => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center bg-red-50 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-700 mb-4">
          We couldn&apos;t load the job details at this moment.
        </p>
        <details className="text-sm text-gray-500 max-w-full overflow-auto">
          <summary>View Error Details</summary>
          <pre className="bg-red-100 p-3 rounded mt-2 text-left">
            {error.message}
          </pre>
        </details>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </MaxWidthWrapper>
  );
};

export default JobErrorFallback;
