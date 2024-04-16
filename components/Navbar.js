"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import gsap from "gsap";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState();
  const [visible, setVisible] = useState(false);
  const [buttonVisibility, setButtonVisibility] = useState({
    About: false,
    ContactUs: false,
  });
  const [popNavVisibility, setPopNavVisibility] = useState("hidden");
  const router = useRouter();

  const title = useRef([]);
  const btn = useRef(null);
  const popNav = useRef(null);

  const path = usePathname();
  const hiddenPaths = ["/", "/login", "/register", "/addreview", "/admin"];
  const isInHiddenPath = hiddenPaths.includes(path);
  console.log(path);

  useEffect(() => {
    // Dynamically import window.innerWidth when component mounts in the browser
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }

    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      gsap.fromTo(
        title.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
      );
      buttonAnimation();
    }
  }, []);

  const buttonAnimation = () => {
    if (windowWidth < 768) {
      gsap.fromTo(
        btn.current,
        { opacity: 0, x: 100 },
        { opacity: 1, duration: 1, x: 0, delay: 0.4 }
      );
    }
  };

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const logoutHandler = async () => {
    toggleMenu()
    let res = await axios.get("/api/logout");
    console.log(res.data.message);
    router.push("/")
  };

  useEffect(() => {
    if (visible) {
      setPopNavVisibility("visible");
      if (typeof window !== "undefined") {
        gsap.fromTo(
          popNav.current,
          { x: -360, opacity: 1 },
          { x: 0, opacity: 1, duration: 1 }
        );
      }
    } else {
      setPopNavVisibility("hidden");
    }
  }, [visible]);

  const renderNavbar = () => {
    if (windowWidth < 768) {
      return (
        <div className={`NavbarPhone ${isInHiddenPath ? "hidden" : ""}`}>
          <div className="flex justify-between items-center bg-cyan-400 h-[5rem] ">
            <h1
              className="titleFont Title ml-4 text-[1.4rem] font-bold text-white"
              ref={(e) => title.current.push(e)}
            >
              <Link href="/home">Excellent Tution Center</Link>
            </h1>
            <button onClick={toggleMenu} ref={btn}>
              <IoMenu
                className={`mr-3 menu-icon rounded-2xl p-2 ${
                  visible ? "bg-cyan-600" : null
                }`}
                size={47}
              />
            </button>

            <div
              className={`popNav flex flex-col justify-center absolute top-0 h-screen w-full bg-cyan-500 z-40 ${popNavVisibility} `}
              ref={popNav}
            >
              <ul className="flex flex-col p-7 gap-3 font-bold text-cyan-50 -translate-y-[9rem] text-2xl ">
                <Link
                  href="/home"
                  className="hover:bg-cyan-600"
                  onClick={toggleMenu}
                >
                  <button>Home</button>
                </Link>
                <Link
                  href="/reviews"
                  className="hover:bg-cyan-600"
                  onClick={toggleMenu}
                >
                  <button>Reviews</button>
                </Link>
                <Link
                  href="/about"
                  className="hover:bg-cyan-600"
                  onClick={toggleMenu}
                >
                  <button>About us</button>
                </Link>
                <Link
                  href="/contact"
                  className="hover:bg-cyan-600"
                  onClick={toggleMenu}
                >
                  <button>Contact us</button>
                </Link>
                <Link
                  href="/login"
                  className="hover:bg-cyan-600"
                  onClick={toggleMenu}
                >
                  <button>Login</button>
                </Link>
                <div
                  className="hover:bg-cyan-600"
                  onClick={logoutHandler}
                >
                  <button>Logout</button>
                </div>
              </ul>

              <MdClose
                size={37}
                className="absolute top-[0.9rem] right-[0.5rem] text-cyan-50 font-bold"
                onClick={toggleMenu}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="NavbarDesktop">
        <div className="flex justify-between items-center bg-cyan-400 h-[5rem] ">
          <Link href="/home">
            <h1
              className="titleFont Title ml-9 text-3xl font-extrabold text-white"
              ref={(e) => title.current.push(e)}
              onClick={() => {
                if (buttonVisibility.About) {
                  setButtonVisibility((preVisibility) => ({
                    ...preVisibility,
                    About: !preVisibility.About,
                  }));
                }
                if (buttonVisibility.ContactUs) {
                  setButtonVisibility((preVisibility) => ({
                    ...preVisibility,
                    ContactUs: !preVisibility.ContactUs,
                  }));
                }
              }}
            >
              Excellent Tution Center
            </h1>
          </Link>
          <ul
            className="flex items-center justify-center text-lg gap-10 mr-7 h-full 
          w-[15rem]"
          >
            <Link href="/about">
              <button
                className={`hover:bg-cyan-500 p-4 rounded-3xl ${
                  buttonVisibility.About ? "bg-cyan-500" : null
                }`}
                onClick={() => {
                  if (buttonVisibility.ContactUs) {
                    setButtonVisibility((preVisibility) => ({
                      ...preVisibility,
                      ContactUs: !preVisibility.ContactUs,
                    }));
                    console.log("rnd if");
                  }
                  setButtonVisibility((prevVisibility) => ({
                    ...prevVisibility,
                    About: !prevVisibility.About,
                  }));
                }}
                ref={(e) => title.current.push(e)}
              >
                About
              </button>
            </Link>
            <Link href="/contact">
              <button
                className={`hover:bg-cyan-500 p-4 w-[8rem] rounded-3xl ${
                  buttonVisibility.ContactUs ? "bg-cyan-500" : null
                }`}
                onClick={() => {
                  if (buttonVisibility.About) {
                    setButtonVisibility((prevVisibility) => ({
                      ...prevVisibility,
                      About: !prevVisibility.About,
                    }));
                  }
                  setButtonVisibility((prevVisibility) => ({
                    ...prevVisibility,
                    ContactUs: !prevVisibility.ContactUs,
                  }));
                }}
                ref={(e) => title.current.push(e)}
              >
                Contact us
              </button>
            </Link>
          </ul>
        </div>
      </div>
    );
  };

  return renderNavbar();
};

export default Navbar;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { IoMenu } from "react-icons/io5";
// import gsap from "gsap";
// import { MdClose } from "react-icons/md";
// import Link from "next/link";

// const Navbar = () => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [visible, setVisible] = useState(false);
//   const [buttonVisibility, setbuttonVisibility] = useState({
//     About: false,
//     ContactUs: false,
//   });
//   const [popNavVisibility, setpopNavVisibility] = useState("hidden");

//   // const menuNav = useRef(null);
//   const title = useRef([]);
//   const btn = useRef(null);
//   const popNav = useRef(null);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const buttonAnimation = () => {
//     gsap.fromTo(
//       btn.current,
//       { opacity: 0, x: 100 },
//       { opacity: 1, duration: 1, x: 0, delay: 0.4 }
//     );
//   };
//   useEffect(() => {
//     gsap.fromTo(
//       title.current,
//       { opacity: 0, y: -100 },
//       { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
//     );
//     buttonAnimation();
//   }, []);

//   const toggleMenu = () => {
//     setVisible(!visible);
//   };

//   useEffect(() => {
//     if (visible) {
//       setpopNavVisibility("visible");
//       gsap.fromTo(
//         popNav.current,
//         { x: -360, opacity: 1 },
//         { x: 0, opacity: 1, duration: 1 }
//       );
//     } else {
//       setpopNavVisibility("hidden");
//     }
//   }, [visible]);

//   const renderNavbar = () => {
//     if (windowWidth < 768) {
//       return (
//         <div className="NavbarPhone">
//           <div className="flex justify-between items-center bg-cyan-400 h-[5rem] ">
//             <h1
//               className="titleFont Title ml-4 text-[1.4rem] font-bold text-white"
//               ref={(e) => title.current.push(e)}
//             >
//               <Link href="/home">Excellent Tution Center</Link>
//             </h1>
//             <button onClick={toggleMenu} ref={btn}>
//               <IoMenu
//                 className={`mr-3 menu-icon rounded-2xl p-2 ${
//                   visible ? "bg-cyan-600" : null
//                 }`}
//                 size={47}
//               />
//             </button>

//             <div
//               className={`popNav flex flex-col justify-center absolute top-0 h-screen w-full bg-cyan-500 z-40 ${popNavVisibility} `}
//               ref={popNav}
//             >
//               <ul className="flex flex-col p-7 gap-3 font-bold text-cyan-50 -translate-y-[9rem] text-2xl ">
//                 <Link
//                   href="/home"
//                   className="hover:bg-cyan-600"
//                   onClick={toggleMenu}
//                 >
//                   <button>Home</button>
//                 </Link>
//                 <Link
//                   href="/reviews"
//                   className="hover:bg-cyan-600"
//                   onClick={toggleMenu}
//                 >
//                   <button>Reviews</button>
//                 </Link>
//                 <Link
//                   href="/about"
//                   className="hover:bg-cyan-600"
//                   onClick={toggleMenu}
//                 >
//                   <button>About us</button>
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="hover:bg-cyan-600"
//                   onClick={toggleMenu}
//                 >
//                   <button>Contact us</button>
//                 </Link>
//                 <Link
//                   href="/login"
//                   className="hover:bg-cyan-600"
//                   onClick={toggleMenu}
//                 >
//                   <button>Login</button>
//                 </Link>
//               </ul>

//               <MdClose
//                 size={37}
//                 className="absolute top-[0.9rem] right-[0.5rem] text-cyan-50 font-bold"
//                 onClick={toggleMenu}
//               />
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="NavbarDesktop">
//         <div className="flex justify-between items-center bg-cyan-400 h-[5rem] ">
//           <Link href="/home">
//             <h1
//               className="titleFont Title ml-9 text-3xl font-extrabold text-white"
//               ref={(e) => title.current.push(e)}
//               onClick={() => {
//                 if (buttonVisibility.About) {
//                   setbuttonVisibility((preVisibility) => ({
//                     ...preVisibility,
//                     About: !preVisibility.About,
//                   }));
//                 }
//                 if (buttonVisibility.ContactUs) {
//                   setbuttonVisibility((preVisibility) => ({
//                     ...preVisibility,
//                     ContactUs: !preVisibility.ContactUs,
//                   }));
//                 }
//               }}
//             >
//               Excellent Tution Center
//             </h1>
//           </Link>
//           <ul
//             className="flex items-center justify-center text-lg gap-10 mr-7 h-full
//           w-[15rem]"
//           >
//             <Link href="/about">
//               <button
//                 className={`hover:bg-cyan-500 p-4 rounded-3xl ${
//                   buttonVisibility.About ? "bg-cyan-500" : null
//                 }`}
//                 onClick={() => {
//                   if (buttonVisibility.ContactUs) {
//                     setbuttonVisibility((preVisibility) => ({
//                       ...preVisibility,
//                       ContactUs: !preVisibility.ContactUs,
//                     }));
//                     console.log("rnd if");
//                   }
//                   setbuttonVisibility((prevVisibility) => ({
//                     ...prevVisibility,
//                     About: !prevVisibility.About,
//                   }));
//                 }}
//                 ref={(e) => title.current.push(e)}
//               >
//                 About
//               </button>
//             </Link>
//             <Link href="/contact">
//               <button
//                 className={`hover:bg-cyan-500 p-4 w-[8rem] rounded-3xl ${
//                   buttonVisibility.ContactUs ? "bg-cyan-500" : null
//                 }`}
//                 onClick={() => {
//                   if (buttonVisibility.About) {
//                     setbuttonVisibility((prevVisibility) => ({
//                       ...prevVisibility,
//                       About: !prevVisibility.About,
//                     }));
//                   }
//                   setbuttonVisibility((prevVisibility) => ({
//                     ...prevVisibility,
//                     ContactUs: !prevVisibility.ContactUs,
//                   }));
//                 }}
//                 ref={(e) => title.current.push(e)}
//               >
//                 Contact us
//               </button>
//             </Link>
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   return renderNavbar();
// };

// export default Navbar;
