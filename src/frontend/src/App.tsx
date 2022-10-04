import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
)};

export default App;
