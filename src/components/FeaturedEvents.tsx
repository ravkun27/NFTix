const FeaturedEvents = () => {
  const featuredEvents = [
    {
      id: 1,
      name: "CyberCon 2025",
      description: "The premier event for blockchain and AI innovators.",
      date: "2025-08-10",
      location: "Neo Tokyo, Dome 3",
      image:
        "https://cdn.prod.website-files.com/66a6e44214dce5cb292944a3/67c4f6317809fd04397995e1_AISA-Open_Graph_Image.png",
    },
    {
      id: 2,
      name: "Quantum Summit",
      description: "Explore quantum tech and its impact on crypto.",
      date: "2025-09-14",
      location: "Virtual Matrix Hub",
      image:
        "https://virtuoso-media.govexec.com/media/events/1100/event/metadata_image-20250501205059-Metadata_Social_Hero_Image_961x505.png",
    },
    {
      id: 3,
      name: "Decentral Expo",
      description: "Dive into the world of Web3, DeFi and NFTs.",
      date: "2025-10-02",
      location: "Block City Arena",
      image:
        "https://gam3s.gg/_next/image/?url=https%3A%2F%2Fassets.gam3s.gg%2FExclusive_Details_on_Upcoming_Decentraland_Game_Expo_7d3b74bdae%2FExclusive_Details_on_Upcoming_Decentraland_Game_Expo_7d3b74bdae.png&w=3840&q=80",
    },
  ];

  return (
    <section className="w-full h-screen p-6">
      <div className="w-full relative overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Featured Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-surface border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary">
                  {event.name}
                </h3>
                <p className="text-muted mt-1 text-sm">{event.description}</p>
                <div className="mt-4 text-sm text-foreground">
                  <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p>📍 {event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
