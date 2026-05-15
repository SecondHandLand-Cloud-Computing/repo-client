import React from "react";

const Footer = () => {
  return (
    <section className="bg-[#dfe9dd] text-center py-16 px-10 text-[#222] font-sans">
      {/* title */}
      <h2 className="text-[1.8rem] font-semibold mb-10 text-[#2e3a36]">
        What is Second Hand Land?
        <br />
        <a href="/about" className="block text-[0.95rem] text-[#2e6b5a] mt-2 hover:underline">
          Read our wonderfully weird story
        </a>
      </h2>

      {/* grid */}
      <div className="flex flex-wrap justify-center gap-10 mb-10">
        <div className="max-w-[300px] text-left leading-relaxed">
          <h3 className="text-[1.1rem] font-bold mb-2.5">Give Old Things New Life</h3>
          <p className="text-[0.95rem] text-[#333] mb-2.5">
            We believe every pre-loved item has a story worth continuing. Instead of throwing things
            away, let’s give them a second chance to be cherished.
          </p>
          <em className="text-[0.9rem] text-[#555]">
            A small choice for you, a big step for the planet.
          </em>
        </div>

        <div className="max-w-[300px] text-left leading-relaxed">
          <h3 className="text-[1.1rem] font-bold mb-2.5">Support Local & Sustainable Living</h3>
          <p className="text-[0.95rem] text-[#333] mb-2.5">
            Every purchase you make supports local sellers and helps build a more sustainable way of
            living together.
          </p>
          <em className="text-[0.9rem] text-[#555]">
            Each item carries a touch of real human connection.
          </em>
        </div>

        <div className="max-w-[300px] text-left leading-relaxed">
          <h3 className="text-[1.1rem] font-bold mb-2.5">Shop Smart, Live Mindfully</h3>
          <p className="text-[0.95rem] text-[#333] mb-2.5">
            Find unique, high-quality items at fair prices — because mindful shopping is something
            to be proud of.
          </p>
          <p className="text-[0.85rem] font-light italic">Buy less, choose well.</p>
        </div>
      </div>

      {/* help section */}
      <div className="text-center mt-7.5">
        <p>
          Have a question? <strong>We’re here to help.</strong>
        </p>
        <button className="mt-2.5 border-[1.5px] border-[#2e3a36] rounded-full px-5 py-2.5 text-[0.95rem] transition-all duration-200 hover:bg-[#2e3a36] hover:text-white">
          Go to Help Center
        </button>
      </div>
    </section>
  );
};

export default Footer;
