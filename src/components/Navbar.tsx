import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";

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

  const navItems = [
    "My NFTs",
    "Collections",
    "Marketplace",
    "Analytics",
    "About",
  ];

  const isExpanded = !isScrolled || isHovered;

  return (
    <motion.nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-6 left-1/2 z-50 border shadow-2xl"
      style={{
        x: "-50%",
      }}
      animate={{
        width: isExpanded ? "90%" : "auto",
        borderRadius: isExpanded ? "44px" : "60px",
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.90)",
        backdropFilter: "blur(20px)",
        borderColor: isScrolled ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.05)",
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Custom bezier for ultra smooth animation
      }}
    >
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo - Always visible */}
        <motion.div
          className="relative text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 whitespace-nowrap select-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.08,
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6))",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* The visible logo text */}
          NFTix
        </motion.div>

        {/* Center Navigation - Only visible when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="hidden lg:flex items-center gap-8 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.5,
                staggerChildren: 0.05,
                delayChildren: 0.1,
              }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  className="relative cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Right Side - Always visible */}
        <div className="flex items-center gap-4">
          <Button className="rounded-full relative overflow-hidden group whitespace-nowrap">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Connect Wallet</span>
          </Button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ThemeToggle />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Elements - Only when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 4, repeat: Infinity, ease: "linear" },
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              }}
            />

            <motion.div
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.3, 1],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Indicator - Only visible when collapsed */}
      <AnimatePresence>
        {isScrolled && !isHovered && (
          <motion.div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 lg:hidden"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
