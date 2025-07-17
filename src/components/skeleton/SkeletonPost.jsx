
const SkeletonPost = () => {
  return (
    <div className="animate-pulse p-4  rounded-xl shadow-md bg-base-100 space-y-4 max-w-xl w-full">
      {/* Header: Avatar + Name */}
      <div className="flex items-center gap-3">
        <div className="bg-base-300 rounded-full w-10 h-10" />
        <div className="space-y-1 w-full">
          <div className="bg-base-300 h-3 w-1/3 rounded" />
          <div className="bg-base-300 h-2 w-1/4 rounded" />
        </div>
      </div>

      {/* Post image placeholder */}
      <div className="bg-base-300 h-96 w-full rounded-xl" />

      {/* Text content */}
      <div className="space-y-2">
        <div className="bg-base-300 h-3 w-full rounded" />
        <div className="bg-base-300 h-3 w-5/6 rounded" />
        <div className="bg-base-300 h-3 w-2/3 rounded" />
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-2">
        <div className="bg-base-300 h-6 w-16 rounded-full" />
        <div className="bg-base-300 h-6 w-16 rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonPost;
