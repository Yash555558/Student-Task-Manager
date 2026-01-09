export default function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-card grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="w-64 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl p-5 shadow-card">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}