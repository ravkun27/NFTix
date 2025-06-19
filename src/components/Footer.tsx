const Footer = () => {
  return (
    <footer className="w-full px-6 py-10 mt-20 border-t border-cyan-500/10 bg-black/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            NFTiX
          </h2>
          <p className="text-sm text-cyan-400/80">
            Secure. Verified. Decentralized.
          </p>
        </div>

        {/* Center Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a
            href="/"
            className="text-white/70 hover:text-cyan-400 transition-all"
          >
            Explore
          </a>
          <a
            href="/create"
            className="text-white/70 hover:text-cyan-400 transition-all"
          >
            Create Event
          </a>
          <a
            href="/tickets"
            className="text-white/70 hover:text-cyan-400 transition-all"
          >
            My Tickets
          </a>
          <a
            href="/market"
            className="text-white/70 hover:text-cyan-400 transition-all"
          >
            Resale Market
          </a>
        </div>

        {/* Right Attribution */}
        <div className="text-sm text-white/60 text-center md:text-right">
          <p>
            Made with 💜 by{" "}
            <span className="text-cyan-400 font-semibold hover:underline underline-offset-2 decoration-dotted cursor-default">
              Saurav Pandey
            </span>
          </p>
          <p className="text-xs text-white/30 mt-1">
            © {new Date().getFullYear()} NFTiX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
