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
  status: "minting" | "sold-out" | "upcoming" | "live";
}

// Props for the EventGrid component
interface EventGridProps {
  id?: string;
  events: Event[];
  columns?: 1 | 2 | 3 | 4;
  showPrice?: boolean;
  showSupply?: boolean;
  showTags?: boolean;
}

// Futuristic gradient presets
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
}: {
  event: Event;
  onMintTicket: (event: Event) => void;
  showPrice?: boolean;
  showSupply?: boolean;
  showTags?: boolean;
}) => {
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

  const gradient = gradients[event.gradientId % gradients.length];
  const isMintable = event.status === "minting";
  const dateInfo = formatDate(event.date);

  return (
    <div className="group relative">
      {/* Outer glow effect */}
      <div className="absolute -inset-0.3 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Main Card */}
      <div className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 w-[18rem] h-[20rem] flex flex-col">
        {/* Header with image/gradient background */}
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

          {/* Overlay grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          {/* Status Badge */}
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-mono uppercase border shadow-lg ${getStatusColor(
              event.status
            )}`}
          >
            {event.status}
          </div>

          {/* Supply Badge */}
          {showSupply && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-md text-xs font-mono text-green-300 border border-green-400/30">
              {event.supply > 0 ? `${event.supply} LEFT` : "SOLD OUT"}
            </div>
          )}

          {/* Date Display */}
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

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 min-h-0">
          {/* Tags */}
          {showTags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 flex-shrink-0">
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

          {/* Title */}
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors duration-200 line-clamp-1 mb-2 flex-shrink-0">
            {event.title}
          </h3>

          {/* Location & Organizer */}
          <div className="space-y-1 text-sm mb-3 flex-shrink-0">
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

          {/* Spacer to push content to bottom */}
          <div className="flex-1"></div>

          {/* Price & Action */}
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
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
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                isMintable
                  ? "bg-gradient-to-r from-green-500 to-cyan-500 text-black hover:from-green-400 hover:to-cyan-400 shadow-lg hover:shadow-green-400/25"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <span>{isMintable ? "MINT" : "SOON"}</span>
              {isMintable && <span className="text-xs">⚡</span>}
            </button>
          </div>

          {/* Contract Address */}
          <div className="text-xs text-gray-500 font-mono bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50 truncate flex-shrink-0">
            Contract: {event.contractAddress}
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

  const handleMintTicket = () => {
    alert("Minting tickets not available yet.");
  };

  if (!Array.isArray(events) || events.length === 0) {
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
    <div className={`grid ${getGridColumns()} gap-6`}>
      {events?.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onMintTicket={handleMintTicket}
          showPrice={showPrice}
          showSupply={showSupply}
          showTags={showTags}
        />
      ))}
    </div>
  );
};

export default EventGrid;
