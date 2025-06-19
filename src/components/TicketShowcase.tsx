import NFTTicketCard from "./NFTTicketCard";

const TicketShowcaseSection = () => {
  return (
    <section className="w-full min-h-screen text-white px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-16">
      {/* Left - Description */}
      <div className="max-w-xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6">
          Your Ticket to the Future
        </h2>
        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          NFTiX cards are your digital access tokens to events, concerts, and
          experiences like never before. Each ticket is verifiable on-chain,
          beautifully animated, and uniquely yours.
        </p>
        <ul className="space-y-3 text-gray-400 text-sm font-mono">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
            Real-time countdown to event start
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
            Click to flip and reveal secure ticket details
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
            Fully animated with holographic visual effects
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
            Bound to your wallet address on mint
          </li>
        </ul>
      </div>

      {/* Right - 3D Card */}
      <div className="flex justify-center md:justify-end">
        <NFTTicketCard
          eventName="CyberRift Expo 2025"
          eventDate={new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 5)} // 5 days later
          location="NeoTokyo Dome, Sector 7"
          ticketId="042A9F"
          ownerAddress="0xA19b...93f1"
          gradientId={1}
        />
      </div>
    </section>
  );
};

export default TicketShowcaseSection;
