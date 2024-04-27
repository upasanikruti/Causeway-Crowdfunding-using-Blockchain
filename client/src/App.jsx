import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BotpressChat from './components/BotpressChat'; // Import BotpressChat component

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, SearchResults, AIsearch, AIresult  } from './pages';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#b3cde0] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        {/* Integrate BotpressChat component here */}
        <div><BotpressChat /></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/search" element={<SearchResults />} />
          {/* <Route path="/AIsearch" element={<AIsearch />} />
          <Route path="/AIresult" element={<AIresult />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
