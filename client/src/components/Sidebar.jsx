import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, sun } from '../assets';
import { navlinks } from '../constants';

import { useDisconnect } from "@thirdweb-dev/react";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[60px] h-[30px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    <div className="flex flex-row items-center">
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2 mb-1" />
      ) : (
        <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
      )}
      {/* <span className="text-xs mt-1 text-white">{name}</span> */}
    </div>
  </div>
);
  
  const Sidebar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const disconnect = useDisconnect();

    const handleLogout = () => {
      disconnect();
      navigate('/');
    };
  
    return (
          <div></div>
    )
  }
  
  export default Sidebar