"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setId, setLoginState } from "@/lib/features/user/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [clicked, setclicked] = useState(false);

  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [showPopUpNav, setshowPopUpNav] = useState(false);

  const title = useRef([]);
  const btn = useRef(null);
  const popNav = useRef(null);

  const logoutHandler = async () => {
    if (clicked) return;
    setclicked(true);
    try {
      let res = await axios.get("/api/logout");
      if (res.data.success) {
        toast.success(res.data.message);
      }

      displayPopUpNav();
      dispatch(setAdmin(false));
      dispatch(setLoginState(false));
      dispatch(setId(null));
      router.push("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const displayPopUpNav = () => {
    if (showPopUpNav) {
      document.body.style.overflow = "auto";
      gsap.to(popNav.current, {
        x: -1400,
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          setshowPopUpNav(false);
        },
      });
      return;
    }
    setshowPopUpNav(true);
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      popNav.current,
      { x: -1400 },
      { x: -1, opacity: 1, duration: 0.5 }
    );
    return;
  };

  useEffect(() => {
    gsap.fromTo(
      btn.current,
      { opacity: 0, y: -100 },
      { opacity: 1, duration: 1, y: 0, delay: 0.4 }
    );
    gsap.fromTo(
      title.current,
      { opacity: 0, y: -100 },
      { opacity: 1, duration: 0.6, y: 0, delay: 0.4 }
    );
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="NavbarPhone">
        <div className="flex justify-between items-center bg-cyan-400 h-[5rem] ">
          <h1
            className="titleFont Title ml-4 text-[1.4rem] sm:text-3xl font-bold text-white"
            ref={title}
          >
            <Link href="/home">Excellent Tution Center</Link>
          </h1>
          <button
            onClick={displayPopUpNav}
            ref={btn}
            className="flex items-center justify-center"
          >
            <div className="h-10 w-10 rounded-full flex items-center justify-center -translate-x-6">
              <IoMenu className="menu-icon rounded-2xl" size={35} />
            </div>
          </button>
          {/* popNav */}
          <div
            className={`popNav ${
              showPopUpNav ? "" : "hidden"
            } flex flex-col justify-center absolute top-0 h-screen w-screen sm:w-[60vw] bg-cyan-500 z-40`}
            ref={popNav}
          >
            <ul className="w-[50vw] sm:w-[40vw] flex flex-col p-6 gap-3 font-bold text-cyan-50 translate-x-[4rem] -translate-y-[8rem] text-2xl">
              {[
                { label: "Home", href: "/home" },
                { label: "Reviews", href: "/reviews" },
                { label: "About us", href: "/about" },
                { label: "Contact us", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:bg-cyan-600"
                  onClick={displayPopUpNav}
                >
                  <button>{item.label}</button>
                </Link>
              ))}

              {isLoggedIn ? (
                <div className="hover:bg-cyan-600" onClick={logoutHandler}>
                  <button>Logout</button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hover:bg-cyan-600"
                  onClick={displayPopUpNav}
                >
                  <button>Login</button>
                </Link>
              )}

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={displayPopUpNav}
                  className="hover:bg-cyan-600"
                >
                  <button>Dashboard</button>
                </Link>
              )}
            </ul>

            <MdClose
              size={37}
              className="absolute top-[1rem] right-[1rem] text-cyan-50 font-bold"
              onClick={displayPopUpNav}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
