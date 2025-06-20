import events from "../events.json";
import EventGrid from "./EventGrid";

const FeaturedEvents = () => {
  const featuredEvents = events
    .filter((event: any) => event.status === "minting")
    .slice(0, 3);

  return (
    <section className="w-full min-h-screen p-6 text-white">
      <div className="w-full relative overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
          Featured Minting Events
        </h2>

        {featuredEvents.length > 0 ? (
          <EventGrid
            events={featuredEvents}
            columns={3}
            showPrice={true}
            showSupply={true}
            showTags={true}
          />
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No minting events available right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
