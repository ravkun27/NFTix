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
  id?: string;
  events: Event[];
  columns?: 1 | 2 | 3 | 4;
  showPrice?: boolean;
  showSupply?: boolean;
  showTags?: boolean;
}

// Gradient presets for variety
const gradients = [
  "from-green-400/20 via-cyan-400/10 to-blue-500/20",
  "from-purple-400/20 via-pink-400/10 to-red-500/20",
  "from-yellow-400/20 via-orange-400/10 to-red-500/20",
  "from-blue-400/20 via-purple-400/10 to-pink-500/20",
  "from-cyan-400/20 via-teal-400/10 to-green-500/20",
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "minting":
        return "text-green-400 border-green-400/50";

      case "upcoming":
        return "text-yellow-400 border-yellow-400/50";
      case "ongoing":
        return "text-cyan-400 border-cyan-400/50";
      default:
        return "text-gray-400 border-gray-400/50";
    }
  };

  const gradient = gradients[event.gradientId % gradients.length];
  const isMintable = event.status === "minting";

  return (
    <div
      className={`interactive bg-gray-900/50 border border-green-400/20 hover:border-green-400/50 hover:bg-gray-900/70 transition-all duration-300 group cursor-pointer overflow-hidden`}
    >
      {/* Image/Visual Section */}
      <div
        className={`aspect-video bg-gradient-to-br ${gradient} relative overflow-hidden`}
      >
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            onError={(e) => {
              // Fallback to gradient background if image fails
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}

        {/* Status Badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full border text-xs font-mono uppercase ${getStatusColor(
            event.status
          )} bg-black/70 backdrop-blur-sm`}
        >
          {event.status}
        </div>

        {/* Contract Address (for authenticity) */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-mono text-gray-400">
          {event.contractAddress}
        </div>

        {/* Supply indicator */}
        {showSupply && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-bold text-green-400">
            {event.supply} AVAILABLE
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Tags */}
        {showTags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-green-400/10 text-green-400 rounded border border-green-400/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-xl mb-2 text-white group-hover:text-green-400 transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-xs mb-3 line-clamp-4">
          {event.description}
        </p>


        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-300">
            <span className="w-16 text-gray-500">Date:</span>
            <span className="font-mono">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <span className="w-16 text-gray-500">Location:</span>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <span className="w-16 text-gray-500">By:</span>
            <span className="text-cyan-400">{event.organizer}</span>
          </div>
        </div>

        {/* Price */}
        {showPrice && (
          <div className="mb-6">
            <div className="text-3xl font-bold text-green-400">
              {event.price} {event.currency}
            </div>
            <div className="text-sm text-gray-500">per ticket</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`interactive flex-1 py-3 px-4 font-bold text-sm transition-all duration-200 ${
              isMintable
                ? "bg-green-400 text-black hover:bg-green-300 hover:shadow-lg hover:shadow-green-400/25"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {isMintable ? "MINT TICKET" : "COMING SOON"}
          </button>
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

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">🎫</div>
        <h3 className="text-xl font-bold text-gray-400 mb-2">
          No Events Available
        </h3>
        <p className="text-gray-500">Check back soon for new drops!</p>
      </div>
    );
  }
  const handleMintTicket = () => {
    alert("Minting tickets not available yet.");
  };

  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">🎫</div>
        <h3 className="text-xl font-bold text-gray-400 mb-2">
          No Events Available
        </h3>
        <p className="text-gray-500">Check back soon for new drops!</p>
      </div>
    );
  }
  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {events?.map((event) => (
        <EventCard
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

// // Demo Component with sample data
// const NFTEventDemo = () => {
//   const [events] = useState<Event[]>([
//     {
//       id: "event001",
//       title: "Neon Nights Festival",
//       description:
//         "A cyberpunk-themed electronic music experience with neon lights and immersive visuals.",
//       location: "Mumbai, India",
//       date: "2025-07-20T19:00:00Z",
//       image: "",
//       organizer: "Sumit Pandey",
//       supply: 300,
//       price: 0.05,
//       currency: "ETH",
//       contractAddress: "0xA1B2C3",
//       gradientId: 0,
//       tags: ["music", "festival", "cyberpunk"],
//       status: "minting",
//     },
//     {
//       id: "event002",
//       title: "Digital Art Showcase",
//       description:
//         "Exclusive preview of next-generation digital art installations and interactive experiences.",
//       location: "Delhi, India",
//       date: "2025-08-15T18:00:00Z",
//       image: "",
//       organizer: "Tech Collective",
//       supply: 150,
//       price: 0.08,
//       currency: "ETH",
//       contractAddress: "0xD4E5F6",
//       gradientId: 1,
//       tags: ["art", "digital", "showcase"],
//       status: "upcoming",
//     },
//     {
//       id: "event003",
//       title: "Metaverse Gaming Championship",
//       description:
//         "Compete in the ultimate virtual reality gaming tournament with exclusive NFT prizes.",
//       location: "Bangalore, India",
//       date: "2025-09-10T16:00:00Z",
//       image: "",
//       organizer: "GameFi Studios",
//       supply: 500,
//       price: 0.03,
//       currency: "ETH",
//       contractAddress: "0xG7H8I9",
//       gradientId: 2,
//       tags: ["gaming", "vr", "tournament"],
//       status: "minting",
//     },
//     {
//       id: "event004",
//       title: "Crypto Conference 2025",
//       description:
//         "Leading blockchain developers and crypto enthusiasts gather for the year's biggest conference.",
//       location: "Gurgaon, India",
//       date: "2025-06-25T09:00:00Z",
//       image: "",
//       organizer: "Blockchain India",
//       supply: 0,
//       price: 0.12,
//       currency: "ETH",
//       contractAddress: "0xJ1K2L3",
//       gradientId: 3,
//       tags: ["crypto", "blockchain", "conference"],
//       status: "sold-out",
//     },
//   ]);

//   const handleMintTicket = (event: Event) => {
//     alert(
//       `Minting ticket for: ${event.title}\nPrice: ${event.price} ${event.currency}`
//     );
//   };

//   const handleViewDetails = (event: Event) => {
//     alert(`Viewing details for: ${event.title}\nEvent ID: ${event.id}`);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-12">
//         <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
//           LIVE EVENTS
//         </h1>
//         <p className="text-gray-400 text-lg">
//           Discover and mint exclusive NFT tickets for premium events
//         </p>
//       </div>

//       {/* Event Grid */}
//       <div className="max-w-7xl mx-auto">
//         <EventGrid
//           events={events}
//           onMintTicket={handleMintTicket}
//           onViewDetails={handleViewDetails}
//           columns={3}
//           showPrice={true}
//           showSupply={true}
//           showTags={true}
//         />
//       </div>

//       {/* Different Grid Layouts Demo */}
//       <div className="max-w-7xl mx-auto mt-20">
//         <h2 className="text-2xl font-bold mb-8 text-center text-cyan-400">
//           Different Layout Options
//         </h2>

//         {/* Single Column */}
//         <div className="mb-12">
//           <h3 className="text-lg font-semibold mb-4 text-green-400">
//             Single Column Layout
//           </h3>
//           <EventGrid
//             events={events.slice(0, 1)}
//             onMintTicket={handleMintTicket}
//             onViewDetails={handleViewDetails}
//             columns={1}
//           />
//         </div>

//         {/* Two Columns */}
//         <div className="mb-12">
//           <h3 className="text-lg font-semibold mb-4 text-green-400">
//             Two Column Layout
//           </h3>
//           <EventGrid
//             events={events.slice(0, 2)}
//             onMintTicket={handleMintTicket}
//             onViewDetails={handleViewDetails}
//             columns={2}
//           />
//         </div>

//         {/* Four Columns */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-green-400">
//             Four Column Layout
//           </h3>
//           <EventGrid
//             events={events}
//             onMintTicket={handleMintTicket}
//             onViewDetails={handleViewDetails}
//             columns={4}
//             showPrice={false}
//             showTags={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default EventGrid;
