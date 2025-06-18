import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full border border-gray-600 bg-black/40 backdrop-blur-sm hover:bg-gray-800/60 transition-colors duration-200 flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-300"
          >
            <path
              d="M21.75 12.79A9 9 0 1 1 11.21 2.25 7 7 0 0 0 21.75 12.79Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-300"
          >
            <circle
              cx="12"
              cy="12"
              r="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Collections", "Marketplace", "Analytics", "About"];

  const isExpanded = !isScrolled || isHovered;

  return (
    <>
      {/* Navbar */}
      <motion.nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-4 left-1/2 z-50 border border-gray-600 backdrop-blur-md rounded-full"
        style={{
          x: "-50%",
        }}
        animate={{
          width: isExpanded ? "90%" : "50%",
          height: isExpanded ? "60px" : "60px",
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          className="relative h-full rounded-full border border-gray-800 bg-black/30 backdrop-blur-md"
          animate={{
            backgroundColor: isScrolled
              ? "rgba(0, 0, 0, 0.95)"
              : "rgba(0, 0, 0, 0.8)",
            borderColor: isScrolled
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.08)",
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        >
          <div className="flex justify-between items-center h-full px-6">
            {/* Logo - Always visible */}
            <motion.div
              className="flex items-center justify-center relative mx-2"
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="text-2xl font-bold tracking-tight whitespace-nowrap text-white"
                animate={{
                  x: isExpanded ? 0 : -10,
                }}
                transition={{ duration: 0.3, delay: isExpanded ? 0.1 : 0 }}
              >
                NFTiX
              </motion.div>
            </motion.div>

            {/* Navigation Items - Only visible when expanded */}
            <AnimatePresence>
              <motion.div
                className="flex items-center ml-8 space-x-6"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                  >
                    <span className="text-sm text-white hover:text-foreground transition-colors duration-200 whitespace-nowrap">
                      {item}
                    </span>
                    <motion.div
                      className="absolute -bottom-1 left-0 h-px bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center">
              {/* Connect Wallet Button - Only visible when expanded */}
              <AnimatePresence>
                <motion.div
                  className="ml-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                >
                  <motion.button
                    className="btn btn-primary btn-sm rounded-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Connect Wallet
                  </motion.button>
                </motion.div>
              </AnimatePresence>
              {/* Theme Toggle - Only visible when expanded */}
              <AnimatePresence>
                <motion.div
                  className="ml-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <ThemeToggle />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtle glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/5 opacity-0 pointer-events-none"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;
