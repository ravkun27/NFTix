import logos from "../logos.json";

const LogoStrip = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gray-50/10 py-8">
      <div className="animate-scroll inline-flex">
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div key={`first-${index}`} className="mx-8 flex-shrink-0">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-12 w-auto object-contain brightness-30 invert opacity-80 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div key={`second-${index}`} className="mx-8 flex-shrink-0">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-12 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-30%);
          }
        }
        
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LogoStrip;
