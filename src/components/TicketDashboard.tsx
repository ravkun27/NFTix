// src/pages/TicketsPage.tsx
import { useTicketStore } from "../store/ticketStore";
import events from "../events.json";
import EventGrid from "../components/EventGrid";

const TicketsPage = () => {
  const mintedTicketIds = useTicketStore((state) => state.mintedTicketIds);

  // Filter events to only show minted ones
  const mintedEvents = events.filter((event) => mintedTicketIds.has(event.id));

  return (
    <section className="w-full min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute top-4 left-4 cursor-pointer">
        <p
          className="text-gray-400 p-2 border border-gray-400 rounded-md"
          onClick={() => window.history.back()}
        >
          Go Back
        </p>
      </div>
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        🎟️ My Minted Tickets
      </h2>

      {mintedEvents.length > 0 ? (
        <EventGrid
          events={mintedEvents as any}
          showPrice={false}
          showSupply={false}
          showTags={true}
          mintedTicketIds={mintedTicketIds}
        />
      ) : (
        <p className="text-center text-gray-300 mt-10">
          You haven't minted any tickets yet.
        </p>
      )}
    </section>
  );
};

export default TicketsPage;
