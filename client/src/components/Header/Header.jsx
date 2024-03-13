import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import Buttons from "../Button/Button";
import { LuLogOut } from "react-icons/lu";
import { logo } from "../ImagePath/Img";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user.name);
    }
  }, []);

  const links = [
    {
      id: 1,
      link: (
        <>
          <div className="flex items-center justify-center gap-2 text-2xl text-[#030360] ">
            <FaCircleUser className="text-4xl" />
            <p>{loginUser}</p>
          </div>
        </>
      ),
    },
    {
      id: 2,
      link: (
        <>
          <Buttons
            className="bg-red-500 text-2xl"
            icon={<LuLogOut />}
            onClick={logoutHandler}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center w-full bg-cyan-100 border-b-2 border-gray-300  pb-3  text-white fixed px-4 z-50">
        <figure>
          <img
            src={logo}
            alt=""
            className=" object-cover object-center z-20 py-2"
          />
        </figure>

        <ul className=" hidden md:flex">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200 flex items-center justify-center"
            >
              {link}
            </li>
          ))}
        </ul>
        <div
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
          onClick={() => setToggleBtn(!toggleBtn)}
        >
          {toggleBtn ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {toggleBtn && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
            {links.map(({ id, link }) => (
              <li
                key={id}
                className="px-4 cursor-pointer capitalize py-6 text-4xl"
              >
                <button onClick={() => setToggleBtn(!toggleBtn)}>{link}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Header;
