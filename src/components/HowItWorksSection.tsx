const HowItWorksSection = () => {
  const steps = [
    {
      icon: "🎫",
      title: "MINT",
      description: "Purchase your NFT ticket directly from the event organizer",
      detail: "Secure blockchain transaction with instant verification"
    },
    {
      icon: "📱",
      title: "SCAN", 
      description: "Present your digital ticket at the venue for quick entry",
      detail: "QR code verification with real-time authentication"
    },
    {
      icon: "🚀",
      title: "GO",
      description: "Enjoy exclusive perks and experiences at the event",
      detail: "Unlock special access, merchandise, and digital collectibles"
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          HOW IT WORKS
        </h2>
        <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
          Three simple steps to revolutionize your event experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-20 left-full w-full h-px bg-gradient-to-r from-cyan-400/50 to-transparent z-0"></div>
            )}
            
            {/* Step Card */}
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105 text-center">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="text-6xl mb-4 group-hover:animate-bounce">
                {step.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3 font-mono">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 mb-4 text-base">
                {step.description}
              </p>
              
              {/* Detail */}
              <p className="text-cyan-400 text-sm font-mono opacity-80">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-green-500 to-cyan-500 px-8 py-4 rounded-lg text-black font-bold text-lg hover:shadow-lg hover:shadow-green-400/25 transition-all">
          START MINTING NOW
        </button>
      </div>
    </section>
  );
};

export default HowItWorksSection;