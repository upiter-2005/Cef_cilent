import React, {lazy, Suspense} from 'react';

import './assets/css/variables.scss';
import './assets/css/mixins.scss';
import './App.scss';
import './assets/css/Sliders.scss';

import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Components/Layout";






const Home = lazy(()=>import(/*webpackChunkName: "Home" */'./Pages/HomePage'));
const Category = lazy(()=>import(/*webpackChunkName: "Category" */'./Pages/CategoryPage'));
const Product = lazy(()=>import(/*webpackChunkName: "Product" */'./Pages/ProductPage'));
const Contact = lazy(()=>import(/*webpackChunkName: "Contact" */'./Pages/ContactPage'));
const Login = lazy(()=>import(/*webpackChunkName: "Login" */'./Pages/LoginPage'));
const Register = lazy(()=>import(/*webpackChunkName: "Register" */'./Pages/RegisterPage'));
const Recovery = lazy(()=>import(/*webpackChunkName: "Recovery" */'./Pages/RecoveryPage'));
const Account = lazy(()=>import(/*webpackChunkName: "Account" */'./Pages/AccountPage'));
const Cart = lazy(()=>import(/*webpackChunkName: "Cart" */'./Pages/CartPage'));
const Checkout = lazy(()=>import(/*webpackChunkName: "Checkout" */'./Pages/CheckoutPage'));
const Thank = lazy(()=>import(/*webpackChunkName: "Thank" */'./Pages/ThankYouPage'));
const Comunity = lazy(()=>import(/*webpackChunkName: "Comunity" */'./Pages/ComunityPage'));
const NotFound = lazy(()=>import(/*webpackChunkName: "NotFound" */'./Pages/NotFound'));


const App: React.FC = () => {
  
  return (
    <div className="App">
       <Routes>
        <Route path='/' element={<Layout/>}>
          
          <Route index element={<Suspense><Home/></Suspense>} />\
          <Route path='category/:id' element={<Suspense><Category/></Suspense>} />
          <Route path='product/:id' element={<Suspense><Product/></Suspense>} />
          <Route path='contact' element={<Suspense><Contact/></Suspense>} />
          <Route path='login' element={<Suspense><Login/></Suspense>} />
          <Route path='register' element={<Suspense><Register/></Suspense>} />
          <Route path='recover' element={<Suspense><Recovery/></Suspense>} />
          <Route path='account' element={<Suspense><Account/></Suspense>} />
          <Route path='cart' element={<Suspense><Cart/></Suspense>} />
          <Route path='checkout' element={<Suspense><Checkout/></Suspense>} /> 
          <Route path='thank' element={<Suspense><Thank/></Suspense>} />
          <Route path='comunity' element={<Suspense><Comunity/></Suspense>} />
          <Route path='*' element={<Suspense><NotFound/></Suspense>} />
          
        </Route>
      </Routes>
      <ToastContainer />
      
      
    
    </div>
  );
}

export default App;
