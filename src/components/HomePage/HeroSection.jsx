import { useState, useEffect } from "react";

// IMPORT IMAGE
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide4 from "../../assets/images/slide4.png";

// LIST SLIDES
const slides = [
  {
    image: slide1,
    title: "Second Land Hand",
    subtitle: "New Life for Old Things",
  },
  {
    image: slide2,
    title: "Every Piece Has a Story",
    subtitle: "Own something with a soul",
  },
  {
    image: slide4,
    title: "Sustain Your Style",
    subtitle: "Fashion with purpose and heart",
  },
  {
    image: slide3,
    title: "Rewear. Relove. Renew.",
    subtitle: "Style that never expires",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto overflow-hidden relative h-[400px] md:h-[500px] lg:h-[550px]">
      {/* SLIDE ITEMS */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out
            ${index === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
          `}
        >
          <img src={slide.image} alt="hero" className="w-full h-full object-cover" />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* TEXT */}
          {index === current && (
            <div className="absolute top-1/4 left-10 md:left-16 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold italic drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-4 text-xl md:text-2xl italic opacity-90">{slide.subtitle}</p>
            </div>
          )}
        </div>
      ))}

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500
              ${index === current ? "bg-white scale-125" : "bg-white/50"}
            `}
          ></div>
        ))}
      </div>
    </div>
  );
}
