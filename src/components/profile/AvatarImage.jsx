import React from "react";

const AvatarImage = ({
  handleAvatarClick,
  userDoc,
  userAvatar,
  fileInputRef,
  handleImageChange,
}) => {
  return (
    <div className="avatar mb-4 relative group">
      {/* <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      /> */}

      <div
        className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 
                transition-all duration-200"
        // onClick={handleAvatarClick}
      >
        <img
          src={userDoc?.photoURL || userAvatar}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
        {/* Semi-transparent overlay with fully opaque text */}
        {/* <div className="absolute inset-0 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200 rounded-full"></div>
          <span className="text-white text-xs font-medium relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Change Photo
          </span>
        </div> */}
      </div>

      {/* Persistent camera icon badge */}
      {/* <div
        onClick={handleAvatarClick}
        className="absolute -bottom-1 -right-1 bg-primary p-2 rounded-full border-2 border-base-100 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div> */}
    </div>
  );
};

export default AvatarImage;
