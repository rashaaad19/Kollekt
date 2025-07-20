import userAvatar from "../../assets/avatar-placeholder.png";
import { useEffect, useRef } from "react";
import useStore from "../../store/store";
import { getJoinDate } from "./../../../util/DateConverter";
import AvatarImage from "./AvatarImage";
import SkeletonProfile from "../skeleton/SkeletonProfile";

const ProfilePage = ({ user }) => {
  const initializeUserDoc = useStore((state) => state.initializeUserDoc);
  const userDoc = useStore((state) => state.userDoc);
  const isLoadingUserDoc = useStore((state) => state.isLoadingUserDoc);
  const isLoadingUserImg = useStore((state) => state.isLoadingUserImg);

  const updateUserDocImg = useStore((state) => state.updateUserDocImg);

  const fileInputRef = useRef(null);

  useEffect(() => {
    initializeUserDoc(user.uid);
  }, [initializeUserDoc, user.uid]);

  // const handleAvatarClick = () => {
  //   fileInputRef.current.click();
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        updateUserDocImg(imageUrl, user.uid);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {!isLoadingUserDoc ? (
        <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-box">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {isLoadingUserImg ? (
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                  <p className="text-xs mt-2 text-gray-500">
                    Uploading image...
                  </p>
                </div>
              ) : (
                <AvatarImage
                  // handleAvatarClick={handleAvatarClick}
                  userAvatar={userAvatar}
                  user={user}
                  userDoc={userDoc}
                  fileInputRef={fileInputRef}
                  handleImageChange={handleImageChange}
                />
              )}
            </div>

            <h2 className="text-xl font-bold">
              {user.displayName || "No Name Provided"}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="tooltip tooltip-right" data-tip="Join date">
              <div className="badge badge-outline badge-accent mt-2 text-sm gap-1 items-center font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {getJoinDate(userDoc?.createdAt)}
              </div>
            </div>
            <div className="divider my-4" />
            <div className="flex gap-5 items-center ">
              <div>
                <p className="text-xl font-bold">
                  {userDoc?.bookmarks.length | 0}
                </p>
                <p className="text-sm text-neutral">Bookmarks</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {userDoc?.favourites.length || 0}
                </p>
                <p className="text-sm text-neutral">Favourites</p>
              </div>
              <div>
                <p className="text-xl font-bold">{userDoc?.postsNumber || 0}</p>
                <p className="text-sm text-neutral">Posts</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonProfile />
      )}
    </>
  );
};

export default ProfilePage;
