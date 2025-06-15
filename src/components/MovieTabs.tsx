import React from "react";

interface Props {
  activeTab: "now_playing" | "top_rated";
  onTabChange: (tab: "now_playing" | "top_rated") => void;
}

const MovieTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      <button
        className={`px-4 py-2 text-sm md:text-base rounded transition-all ${
          activeTab === "now_playing"
            ? "bg-blue-700 text-white"
            : "bg-white border border-gray-300 text-gray-700"
        }`}
        onClick={() => onTabChange("now_playing")}
      >
        Now Playing
      </button>
      <button
        className={`px-4 py-2 text-sm md:text-base rounded transition-all ${
          activeTab === "top_rated"
            ? "bg-blue-700 text-white"
            : "bg-white border border-gray-300 text-gray-700"
        }`}
        onClick={() => onTabChange("top_rated")}
      >
        Top Rated
      </button>
    </div>
  );
};

export default MovieTabs;
