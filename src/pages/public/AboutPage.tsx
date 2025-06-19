const AboutPage = () => {
  return (
    <div
      className="min-h-screen w-full bg-black relative overflow-hidden"
      style={{
        background: `
             radial-gradient(circle at 10% 20%, rgba(0,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 90% 80%, rgba(255,0,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 50% 50%, rgba(0,100,255,0.05) 0%, transparent 70%),
             linear-gradient(135deg, #000000 0%, #001122 100%)
           `,
      }}
    >
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-extrabold text-primary mb-6">
          About NFTiX
        </h1>
        <p className="text-lg text-muted">
          Over <span className="font-bold text-accent">30%</span> of event
          tickets are scalped on the secondary market, leading to inflated
          prices and fraud. <br />
          <br />
          <span className="font-semibold">NFTix</span> introduces a new era of
          ticketing powered by blockchain. Our NFT-based tickets are secure,
          verifiable, and impossible to duplicate. Say goodbye to scalping and
          hello to transparent, fair access to events.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
