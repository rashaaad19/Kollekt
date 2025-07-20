import React from "react";
import Sidebar from "../components/home/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import useStore from "../store/store";
import ProfileLayout from "../components/profile/ProfileLayout";

const Profile = () => {
  const currentUser = useStore(state=>state.currentUser)
  console.log(currentUser)
  return (
    <ProtectedRoute>
      <Sidebar>
       <ProfileLayout user={currentUser}/>
      </Sidebar>
    </ProtectedRoute>
  );
};

export default Profile;
