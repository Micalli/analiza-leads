export function HistorySkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div className="bg-[#121212]">
          <div className="bg-[#1F1F1F] p-4 rounded-lg shadow-md animate-pulse">
            <div className="h-6 w-32 bg-gray-700 rounded mb-4"></div>

            <div className="">
              <div key={idx} className="pb-3">
                <div className="flex items-center ">
                  <div>
                    <div className="h-4 w-32 bg-gray-700 rounded mb-4"></div>
                    <div className="h-3 w-20 bg-gray-800 rounded mb-4"></div>
                  </div>
                </div>
                <div className="h-8 w-full bg-[#00DBD5]/40 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
