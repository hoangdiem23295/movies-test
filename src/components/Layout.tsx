import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import App from "../App";

const Layout = () => {
  const [activeTab, setActiveTab] = useState<"now_playing" | "top_rated">(
    "now_playing"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (tab: "now_playing" | "top_rated") => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => setActiveTab(tab), 0);
    } else {
      setActiveTab(tab);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (location.pathname !== "/") navigate("/");
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 bg-gray-100">
        <Header
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onSearch={handleSearch}
        />
      </div>
      {isHomePage ? (
        <App activeTab={activeTab} searchTerm={searchTerm} />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Layout;
