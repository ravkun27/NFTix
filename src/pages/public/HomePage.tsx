import FeaturedEvents from "../../components/FeaturedEvents";
import HeroSection from "../../components/HeroSection";
import LogoStrip from "../../components/LogoStrip";
import Navbar from "../../components/Navbar";
import UpcomingEvents from "../../components/UpcomingEvent";
import TicketShowcaseSection from "../../components/TicketShowcase";

const HomePage = () => {
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
      <FeaturedEvents />
      <UpcomingEvents />
    </div>
  );
};

export default HomePage;
