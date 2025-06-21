const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;