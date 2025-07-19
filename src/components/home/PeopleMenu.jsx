import React from "react";

const PeopleMenu = () => {
  return (
    <div className="hidden xl:block h-full col-start-3 col-end-4  right-4 w-full max-w-[22rem] ">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-md font-bold opacity-60 tracking-wide">
          People you may know
        </li>
        <li className="list-row text-start font-semibold items-center">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Dio Lupa</div>
          </div>
        </li>
        <li className="list-row text-start font-semibold items-center">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
            />
          </div>
          <div>
            <div>Spider-Person</div>
          </div>
        </li>
        <li className="list-row text-start font-semibold items-center">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/3@94.webp"
            />
          </div>
          <div>
            <div>Sabrino Gardener</div>
          </div>
        </li>
        <li className="list-row text-start font-semibold items-center">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
            />
          </div>
          <div>
            <div>Elon Tusk</div>
          </div>
        </li>{" "}
        <li className="list-row text-start font-semibold items-center">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/4@94.webp"
            />
          </div>
          <div>
            <div>Ellie Beilish</div>
          </div>
        </li>
        <li className="list-row text-start font-semibold items-center">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://watanimg.elwatannews.com/image_archive/original_lower_quality/7676253311727495028.jpg"
            />
          </div>
          <div>
            <div>Nasser Mansi</div>
          </div>
        </li>{" "}
        <li className="list-row text-start font-semibold items-center">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp"
            />
          </div>
          <div>
            <div>Average Hulk</div>
          </div>
        </li>{" "}
      </ul>
    </div>
  );
};

export default PeopleMenu;
