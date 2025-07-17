import { useNavigate } from "react-router-dom";
import { handleSignout } from "../../handlers/formHandlers";
import DrawerIcon from "./../icons/DrawerIcon";
import LogoutIcon from "../icons/LogoutIcon";
import useStore from "../../store/store";

const Navbar = () => {
  const navigate = useNavigate();
  const signoutUser = useStore((state) => state.signoutUser);
  const currentUser = useStore((state) => state.currentUser);
  console.log(currentUser);
  return (
    <div className="navbar bg-primary text-primary-content shadow-sm">
      {/* Mobile drawer toggle button (hamburger icon) */}
      {currentUser && (
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
        <a className="pl-2 font-bold text-xl">Kollekt</a>
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
                <img
                  alt="User Avatar"
                  src="src/assets/avatar-placeholder.png"
                />
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
    </div>
  );
};

export default Navbar;
