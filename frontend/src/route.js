import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Licenses from './components/licenses';



const Routesfile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Licenses" element={<Licenses/>} />
      </Routes>

    </BrowserRouter>
    
  );
};

export default Routesfile;