import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { handleSignout } from "../../handlers/formHandlers";
import DrawerIcon from "./../icons/DrawerIcon";
import LogoutIcon from "../icons/LogoutIcon";

const Navbar = () => {
  const user = auth.currentUser;
  console.log(user)
  const navigate = useNavigate();

  return (
    <div className="navbar bg-primary text-primary-content shadow-sm">
      {/* Mobile drawer toggle button (hamburger icon) */}
      {user && (
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

      {user && (
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
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
                  onClick={() => handleSignout(navigate)}
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
