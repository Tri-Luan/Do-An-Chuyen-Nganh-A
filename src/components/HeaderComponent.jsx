import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { NavLink, Link,useNavigate } from "react-router-dom";
import { FingerPrintIcon } from "@heroicons/react/solid";

const HeaderComponent = () => {

  // Active navbar
  // let activeStyle = {
  //   textDecoration: "underline",
  // };

  let normalStyle =
    "nav-link text-white px-3 py-2 rounded-md text-base font-medium";
  let activeClassName =
    "nav-link hover:normal-case border-b-2 border-[#5089eb] text-[#5089eb] px-3 py-2 text-base font-medium";
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem("Access_token")
  );
  const role = sessionStorage.getItem("Role");
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    setIsLogin(false);
  };
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" flex items-center justify-between h-16">
            {/* Left elements start */}
            <div className="flex items-center">
              <div className="flex">
                <FingerPrintIcon className="mt-1 h-9 w-9 text-[#5089eb]"></FingerPrintIcon>
                <h1 className=" hover:text-[#5089eb]  text-white px-3 py-2 rounded-md text-xl font-medium">
                  Code <i className="font-normal text-[#5089eb]">Everyday</i>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    exact
                    to="/"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalStyle
                    }
                  >
                    Trang chủ
                  </NavLink>
                  <NavLink
                    to="/practice"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalStyle
                    }
                  >
                    Luyện tập
                  </NavLink>
                  {role === "Author" ? (
                    <NavLink
                      to="/post"
                      className={({ isActive }) =>
                        isActive ? activeClassName : normalStyle
                      }
                    >
                      Đăng bài
                    </NavLink>
                  ) : null}
                </div>
              </div>
            </div>
            {/* Left elements end */}
            {/* Reponsive navbar start*/}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            {/* Reponsive navbar end*/}
            {/* Right elements start */}
            {isLogin ? (
              <div class="flex items-center relative">
                <div className="dropdown relative">
                  <a
                    className="dropdown-toggle flex items-center hidden-arrow"
                    href="/"
                    id="dropdownMenuButton2"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                      className="rounded-full h-12 w-12 height: 25px; width: 25px"
                      alt=""
                    />
                  </a>
                  <ul
                    className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-3s m-0 bg-clip-padding border-none left-auto right-0"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                      Xin chào{" "}
                      <span className="text-blue-600">
                        {sessionStorage.getItem("Student_FullName")}
                      </span>
                    </li>
                    {sessionStorage.getItem("Role") === "Student" ? (
                      <li>
                        <Link
                          to="/history"
                          className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        >
                          Lịch sử nộp bài
                        </Link>
                      </li>
                    ) : null}

                    <li>
                      <button
                        onClick={() => handleLogout()}
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out"
                  data-bs-dismiss="modal"
                >
                  Đăng nhập
                </button>
              </Link>
            )}

            {/* Right elements end */}
          </div>
        </div>
        {/* Mobile navbar start*/}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Trang chủ
                </Link>
                <Link
                  to="/practice"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Luyện tập
                </Link>
                <Link
                  to="/post"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Đăng bài
                </Link>
              </div>
            </div>
          )}
        </Transition>
        {/* Mobile navbar end*/}
      </nav>
    </div>
  );
};

export default HeaderComponent;
