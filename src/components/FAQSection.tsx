import { useState } from "react";

// FAQ Component
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are NFT tickets?",
      answer: "NFT tickets are blockchain-based digital tickets that provide verifiable proof of ownership and access to events. They're secure, transferable, and often come with exclusive perks."
    },
    {
      question: "How do I purchase an NFT ticket?",
      answer: "Simply connect your crypto wallet, browse available events, and mint your ticket directly from our platform. Payment is processed instantly on the blockchain."
    },
    {
      question: "Can I resell my NFT ticket?",
      answer: "Yes! NFT tickets can be transferred or sold on secondary markets. However, some events may have restrictions, so check the ticket terms before purchasing."
    },
    {
      question: "What wallet do I need?",
      answer: "We support popular wallets like MetaMask, WalletConnect, and Coinbase Wallet. Make sure you have ETH or the required cryptocurrency for transaction fees."
    },
    {
      question: "What happens if I lose my ticket?",
      answer: "Your NFT ticket is stored on the blockchain and linked to your wallet. As long as you have access to your wallet and private keys, your ticket is safe and recoverable."
    },
    {
      question: "Are there additional benefits?",
      answer: "Many NFT tickets come with exclusive perks like backstage access, merchandise discounts, future event priority, or commemorative digital collectibles."
    }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-20 px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-gray-400 text-lg font-mono">
          Everything you need to know about NFT tickets
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-400/30 transition-all duration-300">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors"
            >
              <span className="text-white font-semibold text-lg">
                {faq.question}
              </span>
              <span className={`text-cyan-400 text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4 border-t border-gray-700/50">
                <p className="text-gray-300 pt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-400 mb-4">Still have questions?</p>
        <button className="border border-cyan-400/50 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-400/10 transition-all">
          CONTACT SUPPORT
        </button>
      </div>
    </section>
  );
};

export default FAQSection;