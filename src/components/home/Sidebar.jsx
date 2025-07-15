import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "./../icons/HomeIcon";
import FavsIcon from "./../icons/FavsIcon";
import BookmarksIcon from "./../icons/BookmarksIcon";
import ProfileIcon from "./../icons/ProfileIcon";

const Sidebar = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Toggle checkbox for small screens */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Grid container */}
      <div className="drawer-content">{children}</div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        {/* Overlay for small screens */}
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay lg:hidden"
        ></label>

        {/* Drawer List */}
        <ul className="menu p-4 w-65 min-h-full bg-base-100 text-base-content border-r border-solid border-base-300">
          <li>
            <NavLink
              to="/home"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            >
              {({ isActive }) => (
                <>
                  <HomeIcon active={isActive} className="w-5 h-5" />
                  <span
                    className={`${
                      isActive
                        ? "font-bold text-[oklch(71%_0.143_215.221)]"
                        : "font-medium text-base-content"
                    }`}
                  >
                    Home
                  </span>
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favourites"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            >
              {({ isActive }) => (
                <>
                  <FavsIcon
                    active={isActive}
                    color="current"
                    fillColor="oklch(71% 0.143 215.221)"
                  />
                  <span
                    className={`${
                      isActive
                        ? "font-bold text-[oklch(71%_0.143_215.221)]"
                        : "font-medium text-base-content"
                    }`}
                  >
                    Favourites
                  </span>
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/bookmarks"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            >
              {({ isActive }) => (
                <>
                  <BookmarksIcon
                    className="w-5 h-5"
                    active={isActive}
                    color="current"
                    fillColor="oklch(71% 0.143 215.221)"
                  />
                  <span
                    className={`${
                      isActive
                        ? "font-bold text-[oklch(71%_0.143_215.221)]"
                        : "font-medium text-base-content"
                    }`}
                  >
                    Bookmarks
                  </span>
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon className="w-5 h-5" active={isActive} />
                  <span
                    className={`${
                      isActive
                        ? "font-bold text-[oklch(71%_0.143_215.221)]"
                        : "font-medium text-base-content"
                    }`}
                  >
                    Profile
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
