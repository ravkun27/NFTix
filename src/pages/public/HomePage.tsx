import HeroSection from "../../components/HeroSection";
import LogoStrip from "../../components/LogoStrip";
import Navbar from "../../components/Navbar";
import TicketShowcaseSection from "../../components/TicketShowcase";
import Footer from "../../components/Footer";
import EventGrid from "../../components/EventGrid";
import rawEvents from "../../events.json";
import { useMemo } from "react";
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
const normalizeEvents = (rawEvents: any[]): Event[] => {
  return rawEvents.map((event, index) => ({
    id: event.id?.toString(),
    title: event.title || event.name || `Untitled Event ${index + 1}`,
    description: event.description || "",
    location: event.location || "TBD",
    date: event.date || new Date().toISOString(),
    image: event.image || "",
    organizer: event.organizer || "Unknown",
    supply: event.supply ?? 100,
    price: event.price ?? 0,
    currency: event.currency || "USDC",
    contractAddress: event.contractAddress || "0x0",
    gradientId: event.gradientId ?? index,
    tags: event.tags ?? [],
    status:
      event.status === "minting" ||
      event.status === "upcoming" ||
      event.status === "ongoing"
        ? event.status
        : "upcoming",
  }));
};
const HomePage = () => {
  const events = useMemo(() => normalizeEvents(rawEvents), []);

  const featuredEvents = events
    .filter((event: any) => event.status === "minting")
    .slice(0, 3);
  const upcomingEvents = events.filter(
    (event: any) => event.status === "upcoming"
  );
  const ongoingEvents = events.filter(
    (event: any) => event.status === "ongoing"
  );
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center gap-10"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #001122 100%)",
      }}
    >
      <Navbar />
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>
      <HeroSection />
      <TicketShowcaseSection />
      <LogoStrip />

      {
        <EventGrid
          events={featuredEvents}
          columns={3}
          showPrice={true}
          showSupply={true}
          showTags={true}
        />
      }

      {
        <EventGrid
          events={upcomingEvents}
          columns={3}
          showPrice={true}
          showSupply={true}
          showTags={true}
        />
      }
      {
        <EventGrid
          events={ongoingEvents}
          columns={3}
          showPrice={true}
          showSupply={true}
          showTags={true}
        />
      }
      <Footer />
    </div>
  );
};

export default HomePage;
