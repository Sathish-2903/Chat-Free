import React from "react";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import ChatBox from "./Components/ChatBox";
import Credits from "./Pages/Credits";
import Community from "./Pages/Community";

const App = () => {
  return (
    <>
      <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="flex h-screen w-screen">
          <Sidebar />
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
