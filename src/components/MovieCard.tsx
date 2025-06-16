import React, { useState, useRef, useEffect } from "react";
import { Movie } from "../features/movies/types";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL, NO_IMAGE } from "../utils/constants";

const MovieCard: React.FC<{ movie: Movie; viewMode?: "grid" | "list" }> = ({
  movie,
  viewMode = "grid",
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverDirection, setHoverDirection] = useState<
    "left" | "center" | "right"
  >("center");
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : NO_IMAGE;
  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_URL}${movie.backdrop_path}`
    : NO_IMAGE;

  const voteAverage = movie.vote_average * 10;

  useEffect(() => {
    if (isHovering && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      if (rect.left < 200) setHoverDirection("left");
      else if (rect.right > screenWidth - 200) setHoverDirection("right");
      else setHoverDirection("center");
    }
  }, [isHovering]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className={
        viewMode === "grid"
          ? "bg-white relative group cursor-pointer rounded shadow"
          : "flex items-start gap-4 bg-white rounded shadow p-4 cursor-pointer"
      }
    >
      <div className="bg-white overflow-hidden rounded">
        <div className=" aspect-video w-full relative bg-gray-200">
          {!loaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          )}
          <img
            loading="lazy"
            src={backdropUrl}
            alt={movie.title}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {viewMode === "grid" && (
            <div
              className={`
              absolute bottom-[-20px] left-2
              w-10 h-10 rounded-full text-white text-sm font-bold
              flex items-center justify-center border-2
              ${
                voteAverage >= 70
                  ? "bg-green-700 border-green-300"
                  : voteAverage >= 50
                  ? "bg-yellow-600 border-yellow-300"
                  : "bg-red-700 border-red-300"
              }
            `}
              title={`Đánh giá: ${voteAverage.toFixed(2)} / 100`}
            >
              {Math.round(voteAverage)}
              <span className="text-[10px] ml-[1px]">%</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-lg line-clamp-2">{movie.title}</h2>
          <p className="text-sm text-gray-600">{movie.release_date}</p>
        </div>
      </div>

      {viewMode === "list" && <div className="flex-1">{movie.overview}</div>}

      {isHovering && viewMode === "grid" && (
        <div
          className={`
            absolute top-1/2 z-50 w-[350px] bg-white rounded-xl shadow-xl p-4 
            transform -translate-y-1/2 scale-105 opacity-100 transition-all duration-300 ease-in-out 
            pointer-events-none group-hover:pointer-events-auto
            ${hoverDirection === "left" ? "left-0 translate-x-0" : ""}
            ${hoverDirection === "right" ? "right-0 translate-x-0" : ""}
            ${hoverDirection === "center" ? "left-1/2 -translate-x-1/2" : ""}
          `}
          style={{ willChange: "transform, opacity" }}
        >
          <img
            loading="lazy"
            src={posterUrl}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover rounded-md mb-3"
          />
          <div>
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Ngày phát hành: {movie.release_date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
