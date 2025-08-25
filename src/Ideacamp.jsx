import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  
  "/idea1.jpg",

  "/idea2.jpeg",
];

export default function Ideacamp() {
  const [current, setCurrent] = useState(0);

  const slidesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
    }
    return 1;
  };

  const [visible, setVisible] = useState(slidesPerView());

  useEffect(() => {
    const handleResize = () => setVisible(slidesPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - visible : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= images.length - visible ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Ideacamp Winners</h1>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform  space-x-5 duration-500 ease-in-out"
          style={{ transform: `translateX(-${(current * 100) / visible}%)` }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="w-full sm:w-1/2 lg:w-1/3f flex-shrink-0 s"
            >
            <img
  src={src}
  alt={`Slide ${idx + 1}`}
  className="w-full h-[450px] sm:h-[500px] object-contain rounded-xl shadow-lg"
/>

            </div>
          ))}
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-3 bg-white/40 hover:bg-white/70 text-gray-400 rounded-full p-2 shadow-md backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-3 bg-white/40 hover:bg-white/70 text-gray-700 rounded-full p-2 shadow-md backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: images.length - visible + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                current === idx ? "bg-blue-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
