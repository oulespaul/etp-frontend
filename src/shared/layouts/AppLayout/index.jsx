import React from 'react';
import { AppNavBar } from './components/Navbar';

function AppLayout({ children }) {
  return (
    <>
      <AppNavBar />

      <main>
        <div className="container mx-auto px-40">{children}</div>
      </main>
    </>
  );
}

export default AppLayout;
