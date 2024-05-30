import React from 'react';
import {Outlet} from 'react-router-dom';

import {Header, Footer } from './'

 const Layout: React.FC = () => {
  return (
    <>
        <Header/>
        <Outlet />
        
        <Footer/>
    </>
  )
}

export default Layout;