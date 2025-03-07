import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">MarkovGPT</h1>
        <div className="text-sm">A ChatGPT Parody with Markov Chains</div>
      </div>
    </header>
  );
};

export default Header; 