'use client';

import React from 'react';

const MyComponent = () => {
  const handleClick = () => {
    console.log('Clicked!');
  };

  return (
    <button className="hover:bg-red-900" onClick={handleClick}>
      Click me
    </button>
  );
};

export default MyComponent;
