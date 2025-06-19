const UpcomingEvents = () => {
  const upcomingEvents = [
    {
      id: 1,
      name: "MetaVerse Live 2025",
      description:
        "Immerse yourself in the future of virtual experiences and decentralized entertainment.",
      date: "2025-08-10",
      location: "Neo Tokyo, Dome 3",
      image:
        "https://static.nft.chaingpt.org/chain_icons/img(7).png-1738758709479.png",
    },
    {
      id: 2,
      name: "Horizon Hackfest",
      description:
        "A cutting-edge hackathon blending AI, blockchain, and quantum computing breakthroughs.",
      date: "2025-09-14",
      location: "Virtual Matrix Hub",
      image:
        "https://rejolut.com/wp-content/uploads/2022/09/horizon-worlds-1024x576.jpg",
    },
    {
      id: 3,
      name: "Web3 Future Forum",
      description:
        "Join the global leaders in DeFi, NFTs, and DAOs shaping the next phase of the decentralized internet.",
      date: "2025-10-02",
      location: "Block City Arena",
      image:
        "https://community.nasscom.in/sites/default/files/styles/960_x_600/public/media/images/metaverse-nft-marketplace.jpg?itok=Lv0jHoK7",
    },
  ];

  return (
    <section className="w-full h-screen p-6">
      <div className="w-full relative overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
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

export default UpcomingEvents;
