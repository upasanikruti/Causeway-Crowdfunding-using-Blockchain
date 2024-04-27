import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';

import { useDisconnect } from "@thirdweb-dev/react";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-10 h-10 rounded-full flex justify-center items-center ${isActive && isActive === name && 'bg-[#2c2f32]'} ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    <img src={imgUrl} alt="icon" className={`w-6 h-6 ${isActive !== name && 'filter grayscale'}`} />
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const [searchQuery, setSearchQuery] = useState('');
  const disconnect = useDisconnect();

  const handleLogout = () => {
    disconnect();
    navigate('/');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    navigate({ pathname: '/search', search: `?query=${searchQuery}` });
    console.log(`Search query: ${searchQuery}`);
  };

  return (
    <div className="bg-gray-900 py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo and Title section */}
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-8 h-8 mr-2" />
        <h1 className="text-lg font-bold text-white">CAUSEWAY</h1>
      </div>

      {/* Search input */}
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Search for campaigns" 
          className="py-2 px-4 mr-4 bg-gray-800 text-white rounded-lg outline-none focus:ring focus:ring-blue-400" 
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button className="w-10 h-10 bg-blue-500 text-white flex justify-center items-center rounded-full" onClick={handleSearch}>
          <img src={search} alt="search" className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation icons */}
      <div className="flex items-center space-x-4">
        {navlinks.map((link) => (
          <Icon 
            key={link.name}
            {...link}
            isActive={isActive}
            handleClick={() => {
              if(!link.disabled) {
                setIsActive(link.name);
                if (link.name === 'logout') {
                  handleLogout();
                  setIsActive('dashboard');
                } else {
                  navigate(link.link);
                }
              }
            }}
          />
        ))}
        <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}
          handleClick={() => {
            if(address) navigate('create-campaign')
            else connect()
          }}
        />
        <div className="w-10 h-10 bg-white flex justify-center items-center rounded-full">
          <img src={thirdweb} alt="user" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
