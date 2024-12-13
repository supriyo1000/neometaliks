import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Universityform from './universityform';

const router = createBrowserRouter(createRoutesFromElements([
  <Route>
    <Route path='/' element={<App />}>
      <Route path='/:srNo' element={<Universityform />} />
      
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
