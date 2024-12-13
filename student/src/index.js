import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Formpage from './formpage';

const router = createBrowserRouter(createRoutesFromElements([
  <Route>
    <Route path='/' element={<App />}>
      {/* <Route path='/:id' element={<Formpage />}></Route> */}
      <Route path='/:encodedId' element={<Formpage />}></Route>

    </Route>
  </Route>
]))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>
);

reportWebVitals();
