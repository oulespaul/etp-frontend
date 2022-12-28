import React from 'react';
import AppNavBar from './components/Navbar';

function AppLayout({ children }) {
  return (
    <div className="bg-[#2f3534] min-h-full">
      <AppNavBar />

      <main className="flex justify-center overflow-scroll">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}

export default AppLayout;
