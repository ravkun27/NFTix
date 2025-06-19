const logos = [
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcf1f87d874e2b57e8_logo1.png",
    alt: "testRigor",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcf8d1c0c328ab4b08_logo2.png",
    alt: "Snappt",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcbbd838c36e17ce06_logo3.png",
    alt: "BetterWorks",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcf5d1bd96955122d1_logo4.png",
    alt: "Sumo Logic",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcc8b9b0e7e8b23df7_logo5.png",
    alt: "Elements",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcf97f02b77224d36d_logo6.png",
    alt: "Santa Cruz",
  },
];

const LogoStrip = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold mb-4 text-primary">Partners</h2>
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "2rem 1rem",
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          background: "linear-gradient(135deg, #001112 10%, #001122 100%)",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
        className="logo-strip"
      >
        <style>
          {`
          .logo-strip::-webkit-scrollbar {
            display: none;
          }

          .logo-img {
            height: 40px;
            filter: grayscale(100%) brightness(0.8);
            transition: transform 0.4s ease, filter 0.4s ease, box-shadow 0.4s ease;
          }

          .logo-img:hover {
            filter: grayscale(0%) brightness(1.2);
            transform: scale(1.1);
            box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
          }
        `}
        </style>
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="logo-img"
          />
        ))}
      </div>
    </div>
  );
};

export default LogoStrip;
