interface BookmarkSkeletonProps {
  count?: number
  title?: string
  showHeader?: boolean
}

export default function BookmarkSkeleton({ 
  count = 8, 
  title = 'Loading...',
  showHeader = true 
}: BookmarkSkeletonProps) {
  return (
    <div className="w-full p-6">
      {showHeader && (
        <div className="flex items-center mt-3 mb-6 gap-3">
          <h2 className="text-xl font-medium text-gray-800">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

