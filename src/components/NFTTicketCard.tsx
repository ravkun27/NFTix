import { useState, useEffect } from "react";
import QRCode from "react-qr-code"; // import this at the top

interface NFTTicketCardProps {
  eventName: string;
  eventDate: Date;
  location: string;
  ticketId: string;
  ownerAddress?: string;
  gradientId: number;
}

const gradientPresets = [
  "from-violet-500 to-cyan-400",
  "from-emerald-400 to-blue-500",
  "from-pink-500 to-purple-600",
  "from-orange-400 to-red-500",
  "from-amber-400 to-pink-500",
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
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

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
    setMousePos({ x, y });
  };

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center space-y-1">
      <div className="bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-md">
        <span className="text-white font-mono text-lg font-bold tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-80 h-96" style={{ perspective: "1000px" }}>
      <div
        className="relative w-full h-full cursor-pointer transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseMove={handleMouseMove}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10"
          style={{
            backfaceVisibility: "hidden",
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,15,15,0.9) 100%),
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.05) 0%, transparent 50%)
            `,
          }}
        >
          {/* Gradient Glow Effect */}
          <div
            className={`absolute inset-0 opacity-20 bg-gradient-to-br ${gradient}`}
            style={{
              mask: "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          />

          <div className="relative p-6 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1
                  className={`text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                >
                  NFTiX
                </h1>
                <p className="text-white/40 text-xs font-medium tracking-widest uppercase">
                  Digital Access
                </p>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-xs font-mono">
                  #{ticketId.slice(0, 6)}
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full mt-1 animate-pulse"></div>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-3">
              <div>
                <h2 className="text-white text-lg font-bold tracking-tight leading-tight">
                  {eventName}
                </h2>
                <div
                  className={`h-0.5 w-16 bg-gradient-to-r ${gradient} mt-2`}
                ></div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                <p className="text-white/70 text-sm font-medium">{location}</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                <p className="text-white/70 text-sm font-medium">
                  {eventDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Countdown */}
            <div className="space-y-3">
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider text-center">
                Event Starts In
              </p>
              <div className="grid grid-cols-4 gap-3">
                <TimeUnit value={timeLeft.days} label="D" />
                <TimeUnit value={timeLeft.hours} label="H" />
                <TimeUnit value={timeLeft.minutes} label="M" />
                <TimeUnit value={timeLeft.seconds} label="S" />
              </div>
            </div>

            {/* Bottom Action */}
            <div className="text-center">
              <p className="text-white/40 text-xs font-medium">
                Tap to view details
              </p>
              <div className="flex justify-center mt-2">
                <div className="w-8 h-0.5 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Corner Elements */}
          <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/30 rounded-tl"></div>
          <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/30 rounded-tr"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/30 rounded-bl"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/30 rounded-br"></div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,15,15,0.9) 100%),
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.05) 0%, transparent 50%)
            `,
          }}
        >
          {/* Gradient Glow Effect */}
          <div
            className={`absolute inset-0 opacity-20 bg-gradient-to-br ${gradient}`}
            style={{
              mask: "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          />

          <div className="relative p-6 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="text-center">
              <h2
                className={`text-xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
              >
                Access Token
              </h2>
              <div
                className={`h-0.5 w-12 bg-gradient-to-r ${gradient} mx-auto mt-2`}
              ></div>
            </div>

            {/* Token Details */}
            <div className="space-y-4">
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                  Owner
                </p>
                <p className="text-white font-mono text-xs break-all">
                  {ownerAddress
                    ? `${ownerAddress.slice(0, 6)}...${ownerAddress.slice(-4)}`
                    : "Unassigned"}
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center space-y-3">
              <QRCode
                value={`nftix://verify/${ticketId}-${ownerAddress || "null"}`}
                size={96}
                fgColor="#00ffff"
                bgColor="transparent"
              />{" "}
              <div className="text-center">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                  Access Code
                </p>
                <p className="text-white font-mono text-sm tracking-widest">
                  {`${ticketId.slice(0, 3)}${ownerAddress?.slice(-3) || "000"}`}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium uppercase tracking-wider">
                Verified
              </span>
            </div>
          </div>

          {/* Corner Elements */}
          <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/30 rounded-tl"></div>
          <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/30 rounded-tr"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/30 rounded-bl"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/30 rounded-br"></div>
        </div>
      </div>
    </div>
  );
};

export default NFTTicketCard;
