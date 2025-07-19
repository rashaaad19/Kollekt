import React from "react";
import Sidebar from "../components/home/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import useStore from "../store/store";

const Profile = () => {
  const currentUser = useStore(state=>state.currentUser)
  console.log(currentUser)
  return (
    <ProtectedRoute>
      <Sidebar>
        <div>Profile</div>
      </Sidebar>
    </ProtectedRoute>
  );
};

export default Profile;
