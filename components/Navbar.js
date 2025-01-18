"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import gsap from "gsap";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setId, setLoginState } from "@/lib/features/user/userSlice";

const Navbar = () => {
  
  const showPopUpNav = useRef(false);
  const [buttonVisibility, setButtonVisibility] = useState({
    About: false,
    ContactUs: false,
  });
  const [popNavVisibility, setPopNavVisibility] = useState("hidden");
  const router = useRouter();

  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const title = useRef([]);
  const btn = useRef(null);
  const popNav = useRef(null);

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    displayPopUpNav()
    dispatch(setAdmin(false));
    dispatch(setLoginState(false));
    dispatch(setId(null));
    let res = await axios.get("/api/logout");
    console.log(res.data.message);
    router.push("/");
  };

  const displayPopUpNav = () => {
    if (showPopUpNav.current) {
      showPopUpNav.current = false;
      gsap.to(popNav.current, { x: -890, opacity: 1, duration: 0.8 });
      return;
    }
    showPopUpNav.current = true;
    gsap.to(popNav.current, { x: 0, opacity: 1, duration: 0.8 });
    return;
  };

  useEffect(() => {
    (function () {
      gsap.fromTo(
        btn.current,
        { opacity: 0, x: 100 },
        { opacity: 1, duration: 1, x: 0, delay: 0.4 }
      );
    })();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="NavbarPhone">
        <div className="flex justify-between items-center bg-cyan-400 h-[5rem] ">
          <h1
            className="titleFont Title ml-4 text-[1.4rem] sm:text-3xl font-bold text-white"
            ref={(e) => title.current.push(e)}
          >
            <Link href="/home">Excellent Tution Center</Link>
          </h1>
          <button
            onClick={() => displayPopUpNav()}
            ref={btn}
            className="flex items-center justify-center"
          >
            <div className="h-10 w-10 rounded-full flex items-center justify-center -translate-x-6">
              <IoMenu className="menu-icon rounded-2xl" size={35} />
            </div>
          </button>

          <div
            className={`popNav sm:-translate-x-[64vw] flex flex-col justify-center absolute top-0 h-screen w-screen sm:w-[60vw] bg-cyan-500 z-40`}
            ref={popNav}
          >
            <ul className="w-[50vw] sm:w-[40vw] flex flex-col p-6` gap-3 font-bold text-cyan-50 translate-x-[4rem] -translate-y-[8rem] text-2xl">
              <Link
                href="/home"
                className="hover:bg-cyan-600"
                onClick={() => displayPopUpNav()}
              >
                <button>Home</button>
              </Link>
              <Link
                href="/reviews"
                className="hover:bg-cyan-600"
                onClick={() => displayPopUpNav()}
              >
                <button>Reviews</button>
              </Link>
              <Link
                href="/about"
                className="hover:bg-cyan-600"
                onClick={() => displayPopUpNav()}
              >
                <button>About us</button>
              </Link>
              <Link
                href="/contact"
                className="hover:bg-cyan-600"
                onClick={() => displayPopUpNav()}
              >
                <button>Contact us</button>
              </Link>
              {isLoggedIn ? (
                <div className="hover:bg-cyan-600" onClick={logoutHandler}>
                  <button>Logout</button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hover:bg-cyan-600"
                  onClick={() => displayPopUpNav()}
                >
                  <button>Login</button>
                </Link>
              )}
              {isAdmin && (
                <Link href="/admin" className="hover:bg-cyan-600">
                  <button>Dashboard</button>
                </Link>
              )}
            </ul>

            <MdClose
              size={37}
              className="absolute top-[1rem] right-[1rem] text-cyan-50 font-bold"
              onClick={() => displayPopUpNav()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;