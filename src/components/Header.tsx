import React from "react";
import MovieTabs from "./MovieTabs";

interface Props {
  activeTab: "now_playing" | "top_rated";
  onTabChange: (tab: "now_playing" | "top_rated") => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<Props> = ({ activeTab, onTabChange, onSearch }) => {
  return (
    <header className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="w-full md:w-[50%] flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="bg-white p-1 rounded-full">
            <img src="/logo192.png" alt="logo" className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold">FilmHay</h1>
            <span className="text-sm text-gray-300">Phim hay đang chiếu</span>
          </div>
        </div>

        <div className="w-full md:ml-4">
          <input
            type="text"
            placeholder="Tìm kiếm phim, diễn viên"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white text-black text-sm placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <div className="w-full md:w-auto">
          <MovieTabs activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </div>
    </header>
  );
};

export default Header;
