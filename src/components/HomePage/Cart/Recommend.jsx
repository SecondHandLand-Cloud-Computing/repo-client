import React, { useRef } from "react";
import { ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

export default function Recommend({ recommendations }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.5;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-[#CFDDC6] rounded-lg p-6 sm:p-8 mt-8">
      {/* Header & Controls */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-['Roboto'] font-semibold text-xl sm:text-[27px] text-black">
          Recommendation
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-[rgba(175,174,174,0.88)] rounded-full flex items-center justify-center hover:bg-[rgba(0,0,0,0.7)] transition-colors"
            aria-label="Scroll left"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-8 rotate-180 text-black" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-[rgba(175,174,174,0.88)] rounded-full flex items-center justify-center hover:bg-[rgba(0,0,0,0.7)] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-8 text-black" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-scroll scrollbar-hide scroll-smooth flex gap-4 py-2"
        >
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="bg-[#E1EBDA] rounded-lg overflow-hidden flex-shrink-0 w-[60%] sm:w-[40%] md:w-[30%] lg:w-[22%]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[180px] sm:h-[255px] object-cover"
              />
              <div className="p-4">
                <h3 className="font-['Roboto'] text-base sm:text-lg text-black mb-1 truncate">
                  {item.name}
                </h3>
                <p className="font-['Roboto'] text-base sm:text-lg text-black font-medium">
                  {item.price} Point
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Recommend.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};