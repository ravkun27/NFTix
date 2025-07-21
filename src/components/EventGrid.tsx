// src/components/EventGrid.tsx
import React, { useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useTicketStore } from "../store/ticketStore";

// Event interface
interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  organizer: string;
  supply: number;
  price: number;
  currency: string;
  contractAddress: string;
  gradientId: number;
  tags: string[];
  status: string;
}

// Props for the EventGrid component
interface EventGridProps {
  events: Event[];
  columns?: 1 | 2 | 3 | 4;
  showPrice?: boolean;
  showSupply?: boolean;
  showTags?: boolean;
  mintedTicketIds: Set<string>;
}

// Gradient presets
const gradients = [
  "from-cyan-500/30 via-blue-600/20 to-purple-700/30",
  "from-pink-500/30 via-purple-600/20 to-blue-700/30",
  "from-green-400/30 via-cyan-500/20 to-blue-600/30",
  "from-orange-500/30 via-red-600/20 to-pink-700/30",
  "from-purple-500/30 via-indigo-600/20 to-cyan-700/30",
];

const EventCard = ({
  event,
  showPrice = true,
  showSupply = true,
  showTags = true,
  isMinted,
}: {
  event: Event;
  showPrice?: boolean;
  showSupply?: boolean;
  showTags?: boolean;
  isMinted?: boolean;
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const { connect } = useConnect();
  const { mintTicket } = useTicketStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: date.getDate(),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "minting":
        return "text-green-300 bg-green-500/20 border-green-400/60 shadow-green-400/20";
      case "upcoming":
        return "text-yellow-300 bg-yellow-500/20 border-yellow-400/60 shadow-yellow-400/20";
      case "ongoing":
        return "text-cyan-300 bg-cyan-500/20 border-cyan-400/60 shadow-cyan-400/20";
      case "sold-out":
        return "text-red-300 bg-red-500/20 border-red-400/60 shadow-red-400/20";
      default:
        return "text-gray-300 bg-gray-500/20 border-gray-400/60 shadow-gray-400/20";
    }
  };

  const handleMintClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isConnected) {
      try {
        await connect({ connector: injected() });
        setIsConnected(true);
      } catch (error) {
        console.error("Connection error:", error);
      }
    } else if (event.status === "minting" && !isMinting && !mintSuccess) {
      setIsMinting(true);
      try {
        // Simulate minting delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        mintTicket(event.id);
        setMintSuccess(true);
      } catch (error) {
        console.error("Minting error:", error);
      } finally {
        setIsMinting(false);
      }
    }
  };

  const gradient = gradients[event.gradientId % gradients.length];
  const isMintable = event.status === "minting";
  const dateInfo = formatDate(event.date);

  const getButtonContent = () => {
    if (mintSuccess || isMinted) return "MINTED ✅";
    if (isMinting) return "MINTING...";
    if (!isConnected) return "CONNECT";
    if (isMintable) return "MINT ⚡";
    return "SOON";
  };

  const getButtonStyle = () => {
    if (mintSuccess) return "bg-green-500 text-white cursor-default";
    if (isMinting) return "bg-yellow-500 text-black cursor-wait";
    if (!isConnected) return "bg-blue-500 hover:bg-blue-600 text-white";
    if (isMintable) return "bg-green-500 hover:bg-green-600 text-black";
    return "bg-gray-700 text-gray-300 hover:bg-gray-600";
  };

  return (
    <div className="group relative w-[18rem]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 h-[20rem] flex flex-col">
        <div
          className={`relative h-28 bg-gradient-to-br ${gradient} overflow-hidden flex-shrink-0`}
        >
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-mono uppercase border shadow-lg ${getStatusColor(
              event.status
            )}`}
          >
            {event.status}
          </div>

          {showSupply && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-md text-xs font-mono text-green-300 border border-green-400/30">
              {event.supply > 0 ? `${event.supply} LEFT` : "SOLD OUT"}
            </div>
          )}

          <div className="absolute bottom-2 left-2 flex items-center space-x-2">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 border border-cyan-400/30">
              <div className="text-xs text-cyan-300 font-mono">
                {dateInfo.month}
              </div>
              <div className="text-lg font-bold text-white leading-none">
                {dateInfo.day}
              </div>
            </div>
            <div className="text-xs text-gray-300 font-mono bg-black/60 px-2 py-1 rounded">
              {dateInfo.time}
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          {showTags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {event.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full border border-cyan-400/30 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors duration-200 line-clamp-1 mb-2">
            {event.title}
          </h3>

          <div className="space-y-1 text-sm mb-3">
            <div className="flex items-center text-gray-300">
              <span className="text-xs mr-2">📍</span>
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <span className="text-xs mr-2">👤</span>
              <span className="text-cyan-400 truncate font-mono">
                {event.organizer}
              </span>
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center justify-between">
            {showPrice && (
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-bold text-green-400">
                  {event.price}
                </span>
                <span className="text-sm text-green-300 font-mono">
                  {event.currency}
                </span>
              </div>
            )}

            <button
              onClick={handleMintClick}
              disabled={mintSuccess || isMinting}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${getButtonStyle()}`}
            >
              {getButtonContent()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventGrid = ({
  events,
  columns = 3,
  showPrice = true,
  showSupply = true,
  showTags = true,
  mintedTicketIds,
}: EventGridProps) => {
  const getGridColumns = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 opacity-50">🎫</div>
        <h3 className="text-2xl font-bold text-gray-400 mb-2">
          No Events Available
        </h3>
        <p className="text-gray-500 font-mono">SCANNING FOR NEW DROPS...</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridColumns()} gap-6 justify-items-center`}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          showPrice={showPrice}
          showSupply={showSupply}
          showTags={showTags}
          isMinted={mintedTicketIds?.has(event.id)}
        />
      ))}
    </div>
  );
};

export default EventGrid;
