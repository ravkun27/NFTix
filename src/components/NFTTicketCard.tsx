import { useState, useEffect } from "react";

interface NFTTicketCardProps {
  eventName: string;
  eventDate: Date;
  location: string;
  ticketId: string;
  ownerAddress?: string;
  gradientId: number;
}

const gradientPresets = [
  "from-cyan-400 via-blue-500 to-purple-600",
  "from-green-400 via-cyan-500 to-blue-600",
  "from-pink-400 via-purple-500 to-indigo-600",
  "from-orange-400 via-red-500 to-pink-600",
  "from-yellow-400 via-orange-500 to-red-600",
];

const NFTTicketCard = ({
  eventName,
  eventDate,
  location,
  ticketId,
  ownerAddress,
  gradientId,
}: NFTTicketCardProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const gradient = gradientPresets[gradientId % gradientPresets.length];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="relative">
      <div className="bg-black/40 border border-cyan-500/30 p-2 text-center transform hover:scale-105 transition-transform duration-200">
        <div className="text-lg font-bold font-mono text-cyan-400 tabular-nums glitch-text">
          {value.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-400 uppercase tracking-widest">
          {label}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transform -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  return (
    <div
      className="relative w-80 h-96"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container with 3D flip */}
      <div
        className={`relative w-full h-full cursor-pointer transition-transform duration-700 ${
          isFlipped ? "transform-gpu" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Card */}
        <div
          className="absolute w-full h-full bg-black border border-cyan-500/30 overflow-hidden transform-gpu"
          style={{
            backfaceVisibility: "hidden",
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,20,40,0.8) 100%),
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,255,255,0.1) 0%, transparent 50%)
            `,
          }}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                animation: `${
                  isHovered ? "grid-move 20s infinite linear" : "none"
                }`,
              }}
            ></div>
          </div>

          {/* Holographic Effect */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: `linear-gradient(45deg, transparent 30%, rgba(0,255,255,0.1) 50%, transparent 70%)`,
              transform: `translateX(${isHovered ? "100%" : "-100%"})`,
              transition: "transform 1.5s ease-in-out",
            }}
          ></div>

          <div className="relative p-6 h-full flex flex-col text-white">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2
                  className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-wider`}
                >
                  NFTiX
                </h2>
                <div className="text-cyan-400 text-xs uppercase tracking-widest opacity-80">
                  DIGITAL ACCESS TOKEN
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 px-3 py-1 backdrop-blur-sm">
                  <span className="text-cyan-400 font-mono text-sm">
                    #{ticketId}
                  </span>
                </div>
                <div className="absolute inset-0 bg-cyan-400/20 blur-sm animate-pulse"></div>
              </div>
            </div>

            {/* Event Info */}
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-3 text-white tracking-wide">
                {eventName}
              </h3>
              <div className="relative">
                <div
                  className={`h-0.5 bg-gradient-to-r ${gradient} mb-3 transition-all duration-500 ${
                    isHovered ? "w-full shadow-lg shadow-cyan-500/50" : "w-1/2"
                  }`}
                ></div>
              </div>
              <p className="text-gray-300 text-sm flex items-center">
                <span className="w-2 h-2 bg-cyan-400 mr-2 animate-pulse"></span>
                {location}
              </p>
            </div>

            {/* Countdown */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <p className="text-cyan-400 text-xs font-mono uppercase tracking-[0.2em] opacity-80">
                  &gt;&gt; EVENT INITIALIZATION &lt;&lt;
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <TimeUnit value={timeLeft.days} label="DAYS" />
                <TimeUnit value={timeLeft.hours} label="HRS" />
                <TimeUnit value={timeLeft.minutes} label="MIN" />
                <TimeUnit value={timeLeft.seconds} label="SEC" />
              </div>
            </div>

            {/* Command Line */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/70 border border-cyan-500/30 p-2 font-mono text-xs">
                <span className="text-green-400">$</span>
                <span className="text-cyan-400 ml-2 animate-pulse">
                  click_to_flip_card
                </span>
                <span className="animate-ping">_</span>
              </div>
              
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/70"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/70"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/70"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/70"></div>
          </div>
        </div>

        {/* Back Card */}
        <div
          className="absolute w-full h-full bg-black border border-cyan-500/30 overflow-hidden transform-gpu"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,20,40,0.8) 100%),
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,255,255,0.1) 0%, transparent 50%)
            `,
          }}
        >
          <div className="relative p-6 h-full text-white">
            {/* Header */}
            <div className="text-center mb-6">
              <h2
                className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2 tracking-wider`}
              >
                ACCESS PROTOCOL
              </h2>
              <div
                className={`h-0.5 w-20 bg-gradient-to-r ${gradient} mx-auto`}
              ></div>
            </div>

            {/* System Info */}
            <div className="space-y-4 text-sm font-mono">
              <div className="border-l-2 border-cyan-500/50 pl-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                  EVENT_NAME
                </p>
                <p className="text-white">{eventName}</p>
              </div>

              <div className="border-l-2 border-cyan-500/50 pl-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                  TIMESTAMP
                </p>
                <p className="text-cyan-400">
                  {eventDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  {eventDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-8 p-4 bg-black/50 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase">
                  SYSTEM STATUS
                </span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-green-400">ACTIVE</span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-cyan-400">
                OWNER: {ownerAddress || "UNASSIGNED"}
              </div>
            </div>

            {/* Command Line */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/70 border border-cyan-500/30 p-2 font-mono text-xs">
                <span className="text-green-400">$</span>
                <span className="text-cyan-400 ml-2 animate-pulse">
                  click_to_flip_card
                </span>
                <span className="animate-ping">_</span>
              </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/70"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/70"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/70"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/70"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTTicketCard;
