import React from "react";

const SkeletonProfile = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-box">
      <div className="flex flex-col items-center text-center">
        {/* Avatar Skeleton */}
        <div className="w-24 h-24 rounded-full skeleton mb-4"></div>

        {/* Name Skeleton */}
        <div className="h-6 w-40 skeleton rounded mb-2"></div>

        {/* Email Skeleton */}
        <div className="h-4 w-52 skeleton rounded mb-3"></div>

        {/* Badge Skeleton */}
        <div className="tooltip tooltip-right" data-tip="Join date">
          <div className="badge badge-outline badge-accent mt-2 text-sm gap-1 items-center font-semibold">
            <div className="w-4 h-4 skeleton rounded"></div>
            <div className="h-4 w-24 skeleton rounded"></div>
          </div>
        </div>

        <div className="divider my-4" />

        {/* Stats Skeleton */}
        <div className="flex gap-5 items-center">
          <div className="text-center">
            <div className="h-6 w-10 skeleton rounded mb-1 mx-auto"></div>
            <div className="h-4 w-16 skeleton rounded mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="h-6 w-10 skeleton rounded mb-1 mx-auto"></div>
            <div className="h-4 w-16 skeleton rounded mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="h-6 w-10 skeleton rounded mb-1 mx-auto"></div>
            <div className="h-4 w-16 skeleton rounded mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
