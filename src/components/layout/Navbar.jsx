import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { handleSignout } from "../../handlers/formHandlers";
import DrawerIcon from "./../icons/DrawerIcon";
import LogoutIcon from "../icons/LogoutIcon";
import useStore from "../../store/store";
import userAvatar from "../../assets/avatar-placeholder.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const signoutUser = useStore((state) => state.signoutUser);
  const currentUser = useStore((state) => state.currentUser);
  console.log(currentUser);
  return (
    <div className="navbar bg-primary text-primary-content shadow-sm">
      {/* Mobile drawer toggle button (hamburger icon) */}

      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <div className="lg:hidden">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost btn-square no-animation bg-transparent hover:bg-transparent hover:text-primary-content hover:border-transparent active:bg-transparent focus:outline-none focus:ring-0 shadow-none"
          >
            <DrawerIcon />
          </label>
        </div>
      )}
      <div className="flex-1 text-left">
        <NavLink to={"/"} className="pl-2 font-bold text-xl">
          Kollekt
        </NavLink>
      </div>

      {currentUser && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={userAvatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="font-bold"
                  onClick={() => handleSignout(navigate, signoutUser)}
                >
                  <LogoutIcon /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      {!currentUser && (
        <div className="flex gap-2">
          <NavLink to="/signup" className="btn bg-primary text-primary-content">
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className="btn btn-outline bg-white text-primary"
          >
            Log In
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
