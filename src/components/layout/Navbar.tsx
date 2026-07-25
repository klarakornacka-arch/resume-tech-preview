import { ArrowUpRight, Asterisk, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "./Container";

const navItems = [
  { label: "Works", to: "/works" },
  { label: "Studio", to: "/about" },
  { label: "Contact", to: "/contact" }
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [pastHero, setPastHero] = useState(false);
  const lightMode = isHome && !pastHero;

  useEffect(() => {
    function update() {
      setPastHero(window.scrollY > window.innerHeight * 0.72);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  if (isHome) return null;

  return (
    <motion.header
      data-retro-nav
      initial={reduceMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500 ${
        lightMode
          ? "border-black/0 bg-transparent text-[#11110f]"
          : "border-white/15 bg-[#070708]/82 text-[#F5F3F7] backdrop-blur-2xl"
      }`}
    >
      <Container className="grid h-[86px] grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-3">
        <Link to="/" className="flex min-w-0 items-center gap-2 font-sans text-[15px] font-semibold">
          <span className="truncate">Zhang Zhenyuan<sup className="ml-0.5 text-[8px]">®</sup></span>
          <Asterisk size={17} strokeWidth={1.6} className="shrink-0" />
        </Link>

        <nav className="hidden items-center justify-center gap-7 font-sans text-sm lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `border-b py-1 transition-colors ${
                  isActive
                    ? lightMode ? "border-black text-black" : "border-[#CB8DFF] text-white"
                    : lightMode ? "border-transparent text-black/68 hover:text-black" : "border-transparent text-white/58 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href="/resume/zhang-zhenyuan-cv.pdf" target="_blank" rel="noreferrer" title="查看个人简历" aria-label="查看个人简历" className="inline-flex items-center gap-1.5 opacity-65 transition-opacity hover:opacity-100">
            CV <FileText size={13} strokeWidth={1.7} />
          </a>
        </nav>

        <Link
          to="/contact"
          className={`group flex items-center justify-end gap-1.5 justify-self-end border-b pb-1 font-sans text-sm font-medium ${
            lightMode ? "border-black" : "border-[#CB8DFF]"
          }`}
        >
          Start a project
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </motion.header>
  );
}
