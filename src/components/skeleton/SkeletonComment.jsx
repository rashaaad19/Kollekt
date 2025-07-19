import React from "react";

const SkeletonComment = () => {
  return (
    <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      <li className="flex items-start gap-3 bg-base-200 px-2 py-4 rounded-md">
        {/* Avatar Skeleton */}
        <div className="avatar">
          <div className="w-8 rounded-full bg-gray-300 animate-pulse"></div>
        </div>

        {/* Comment Content Skeleton */}
        <div className="flex-1 space-y-2">
          {/* Username Skeleton */}
          <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>

          {/* Comment Text Skeleton (2 lines) */}
          <div className="space-y-1">
            <div className="h-3 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-3 w-5/6 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Timestamp Skeleton */}
          <div className="h-3 w-1/2 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </li>
    </ul>
  );
};

export default SkeletonComment;
