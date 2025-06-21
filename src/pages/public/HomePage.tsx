import HeroSection from "../../components/HeroSection";
import LogoStrip from "../../components/LogoStrip";
import Navbar from "../../components/Navbar";
import TicketShowcaseSection from "../../components/TicketShowcase";
import Footer from "../../components/Footer";
import EventGrid from "../../components/EventGrid";
import rawEvents from "../../events.json";
import { useMemo } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import FAQSection from "../../components/FAQSection";
import HowItWorksSection from "../../components/HowItWorksSection";
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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
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
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <main className="space-y-20">
          <HeroSection />

          <TicketShowcaseSection />

          <LogoStrip />

          <HowItWorksSection />

          {/* Featured Events */}
          <section className="py-16 flex justify-center items-center gap-8">
            <div className="max-w-7xl mx-auto px-8">
              <SectionHeader
                title="FEATURED EVENTS"
                subtitle="Don't miss out on these exclusive NFT ticket drops"
              />
              <EventGrid
                events={featuredEvents}
                columns={3}
                showPrice={true}
                showSupply={true}
                showTags={true}
              />
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="py-16 flex justify-center gap-8">
            <div className="max-w-7xl mx-auto px-8">
              <SectionHeader
                title="UPCOMING EVENTS"
                subtitle="Get ready for these amazing experiences"
              />
              <EventGrid
                events={upcomingEvents}
                columns={3}
                showPrice={true}
                showSupply={true}
                showTags={true}
              />
            </div>
          </section>

          <FAQSection />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
