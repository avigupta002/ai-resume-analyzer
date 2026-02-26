export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <div className="relative w-72 h-96 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">

        <div className="space-y-3 p-6">
          <div className="h-3 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />

          <div className="mt-6 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 right-0 h-1 bg-teal-500/70 animate-scan" />
        </div>
      </div>
      <p className="mt-6 text-lg text-gray-600 tracking-wide">
        Analyzing resume…
      </p>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: -5%;
          }
          100% {
            top: 105%;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}