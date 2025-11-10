export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg">
      <div className="animate-pulse border p-6 rounded-lg">
        <header className="flex relative items-start justify-between mb-4">
          <div className="w-64 h-80 flex items-center justify-center relative">
            <div className="h-full w-full bg-gray-200 rounded-lg"></div>
          </div>
        </header>

        <div className="bg-gray-200 h-6 w-3/4 mb-2 rounded"></div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span className="bg-gray-200 h-4 w-1/2 rounded"></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span className="bg-gray-200 h-4 w-1/3 rounded"></span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-300 rounded-lg">
          <div>
            <p className="bg-gray-200 h-4 w-1/4 mb-1 rounded"></p>
            <p className="bg-gray-200 h-4 w-1/2 rounded"></p>
          </div>
          <div className="text-right">
            <p className="bg-gray-200 h-4 w-1/4 mb-1 rounded"></p>
            <p className="bg-gray-200 h-4 w-1/3 rounded"></p>
          </div>
        </div>

        <div className="w-full cursor-pointer mt-5 bg-gray-200 h-10 rounded"></div>
      </div>
    </div>
  );
}
