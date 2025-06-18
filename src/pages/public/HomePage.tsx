import HeroSection from "../../components/HeroSection";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HomePage;
