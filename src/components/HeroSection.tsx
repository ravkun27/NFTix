import NFTTicketCard from "./NFTTicketCard";

const HeroSection = () => {
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 7); // 7 days from now
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NFTTicketCard
          eventName="CYBER NEXUS 2025"
          eventDate={new Date("2025-08-15T19:00:00")}
          location="Neo Tokyo Dome"
          ticketId="CX001"
          ownerAddress="0x742d35cc6cf0459c6f26aa3b3c68e0c0e08b8a52"
          gradientId={0}
        />
        <NFTTicketCard
          eventName="QUANTUM SUMMIT"
          eventDate={new Date("2025-07-20T10:00:00")}
          location="Virtual Matrix"
          ticketId="QS042"
          ownerAddress="0x8ba1f109551bd432803012645hac136c0c74d"
          gradientId={1}
        />
        <NFTTicketCard
          eventName="DIGITAL UPRISING"
          eventDate={new Date("2025-09-05T14:30:00")}
          location="Cyber District 7"
          ticketId="DU188"
          gradientId={2}
        />
      </div>
    </div>
  );
};

export default HeroSection;
