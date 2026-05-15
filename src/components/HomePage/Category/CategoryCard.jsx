import { useNavigate } from "react-router-dom";

export default function CategoryCard({ name, img, category }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products?category=${encodeURIComponent(category)}`)}
      className="flex flex-col w-full overflow-hidden
                 bg-white rounded-md shadow-sm
                 hover:shadow-lg transform hover:-translate-y-1
                 transition-all duration-300 cursor-pointer h-full"
    >
      {/* Image */}
      <div className="overflow-hidden flex-shrink-0 h-48">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover
                     transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title bar */}
      <div
        className="w-full py-3 flex justify-center
                   transition-colors duration-300 hover:bg-green-600"
        style={{ backgroundColor: "rgba(125, 172, 140, 0.7)" }}
      >
        <span className="text-white font-semibold text-base text-center">{name}</span>
      </div>
    </div>
  );
}
