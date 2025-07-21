import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Explore", path: "/" },
    { name: "My Tickets", path: "/tickets" },
    { name: "About", path: "/about" },
  ];

  const isExpanded = !isScrolled;

  return (
    <motion.nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-4 left-1/2 z-50 border border-gray-600 backdrop-blur-md rounded-full"
      style={{ x: "-50%" }}
      animate={{
        width: isExpanded ? "90%" : "55%",
        height: isExpanded ? "60px" : "60px",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center h-full px-6">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
            animate={{ x: isExpanded ? 0 : -10 }}
            transition={{ duration: 0.3, delay: isExpanded ? 0.1 : 0 }}
          >
            <div className="text-3xl font-bold tracking-tight whitespace-nowrap shimmer-text font-['Orbitron']">
              NFTiX
            </div>
          </motion.div>

          {/* Navigation Items */}
          <AnimatePresence>
            <motion.div className="flex items-center ml-8 space-x-6">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <span
                    className={`text-sm transition-colors duration-200 whitespace-nowrap ${
                      location.pathname === item.path
                        ? "text-primary font-medium"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 h-px bg-primary"
                      layoutId="navUnderline"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {isConnected ? (
                  <div className="flex items-center gap-3">
                    <div className="relative group cursor-pointer text-sm font-mono bg-white/5 px-3 py-1 rounded-full">
                      {`${address?.slice(0, 6)}...${address?.slice(-4)}`}

                      {/* Tooltip on hover */}
                      <p className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap border border-cyan-400 px-3 py-1 text-cyan-400 text-xs rounded-full bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        {address}
                      </p>
                    </div>

                    <motion.button
                      onClick={() => disconnect()}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Disconnect
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.button
                      onClick={() => connect({ connector: injected() })}
                      className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Connect Wallet
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Hover Effects */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/5 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
