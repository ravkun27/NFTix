import { useEffect, useState } from "react";
import NFTTicketCard from "./NFTTicketCard";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      eventName: "CYBER NEXUS 2025",
      eventDate: new Date("2025-08-15T19:00:00"),
      location: "Neo Tokyo Dome",
      ticketId: "CX001",
      ownerAddress: "0x742d35cc6cf0459c6f26aa3b3c68e0c0e08b8a52",
      gradientId: 0,
    },
    {
      eventName: "QUANTUM SUMMIT",
      eventDate: new Date("2025-07-20T10:00:00"),
      location: "Virtual Matrix",
      ticketId: "QS042",
      ownerAddress: "0x8ba1f109551bd432803012645hac136c0c74d",
      gradientId: 1,
    },
    {
      eventName: "DIGITAL UPRISING",
      eventDate: new Date("2025-09-05T14:30:00"),
      location: "Cyber District 7",
      ticketId: "DU188",
      ownerAddress: "0x8ba1f109551bd432803012645hac136c0c74d",
      gradientId: 2,
    },
  ];

  const getCardClass = (index: number) => {
    if (index === current) return "z-30 scale-100 blur-0 opacity-100";
    if ((index + 1) % cards.length === current)
      return "z-20 scale-90 blur-sm opacity-60 -translate-x-32 rotate-y-12";
    if ((index + cards.length - 1) % cards.length === current)
      return "z-20 scale-90 blur-sm opacity-60 translate-x-32 rotate-y-12";
    return "opacity-0 scale-75 z-10";
  };

  return (
    <div
      className="min-h-screen w-full bg-black relative overflow-hidden"
      style={{
        background: `
             radial-gradient(circle at 10% 20%, rgba(0,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 90% 80%, rgba(255,0,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 50% 50%, rgba(0,100,255,0.05) 0%, transparent 70%),
             linear-gradient(135deg, #000000 0%, #001122 100%)
           `,
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-8 py-16">
        <div className="flex flex-col lg:flex-row items-start justify-between min-h-screen mt-12">
          {/* Left Side - Hero Text */}
          <div
            className={`flex-1 lg:pr-16 mb-16 lg:mb-0 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Main Title */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mr-4"></div>
                <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
                  NEXT-GEN TICKETING
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold leading-tight mb-6">
                <span className="block bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                  NFT
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  TICKET
                </span>
                <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  SYSTEM
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-8 max-w-2xl">
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6">
                Experience the future of event access with blockchain-powered
                digital tickets.
                <span className="block text-cyan-400 font-mono text-lg mt-2">
                  &gt; Secure • Verifiable • Collectible
                </span>
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 border-2 border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Blockchain Verified
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Immutable proof of ownership and authenticity
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 border-2 border-blue-500/50 bg-blue-500/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Digital Collectible
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Keep your memories as valuable NFTs
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 border-2 border-purple-500/50 bg-purple-500/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Instant Transfer
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Seamless ticket transfers between wallets
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 border-2 border-pink-500/50 bg-pink-500/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-400 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Zero Fraud</h3>
                  <p className="text-gray-400 text-sm">
                    Eliminate counterfeits with crypto security
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 text-sm font-mono">
              <div>
                <div className="text-cyan-400 text-2xl font-bold">10K+</div>
                <div className="text-gray-500 uppercase tracking-wider">
                  Tickets Minted
                </div>
              </div>
              <div>
                <div className="text-blue-400 text-2xl font-bold">500+</div>
                <div className="text-gray-500 uppercase tracking-wider">
                  Events Hosted
                </div>
              </div>
              <div>
                <div className="text-purple-400 text-2xl font-bold">99.9%</div>
                <div className="text-gray-500 uppercase tracking-wider">
                  Uptime
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Card Carousel */}
          <div
            className={`flex-1 flex justify-center items-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative w-full max-w-lg h-96 flex justify-center items-center">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`absolute transition-all duration-700 ease-out ${getCardClass(
                    index
                  )}`}
                  style={{
                    transform: `
                      ${
                        getCardClass(index).includes("translate-x-32")
                          ? "translateX(128px) rotateY(-15deg)"
                          : getCardClass(index).includes("-translate-x-32")
                          ? "translateX(-128px) rotateY(15deg)"
                          : "translateX(0) rotateY(0deg)"
                      }
                      ${
                        getCardClass(index).includes("scale-90")
                          ? "scale(0.9)"
                          : getCardClass(index).includes("scale-75")
                          ? "scale(0.75)"
                          : "scale(1)"
                      }
                    `,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <NFTTicketCard
                    eventName={card.eventName}
                    eventDate={card.eventDate}
                    location={card.location}
                    ticketId={card.ticketId}
                    ownerAddress={card.ownerAddress}
                    gradientId={card.gradientId}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 animate-ping"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 animate-pulse"></div>
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400 animate-ping"></div>
    </div>
  );
};

export default HeroSection;
