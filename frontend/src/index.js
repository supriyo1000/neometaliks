// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';
// import Login from './login';
// import Home from './home';
// import Register from './register';
// import Formpage from './formpage';
// import Collegeformpage from './collegeformpage';
// import Universityform from './components/universityform';
// import Viewcollege from './components/viewcollege';
// import InputStudentpage from './components/inputstudentpage';
// import Allusers from './allusers';
// import Viewformlayout from './viewformlayout';
// import Testlogin from './testlogin';
// import Superadmin from './admin/superadmin';
// import CreateRole from './admin/createRole';
// import Mentor from './components/mentor';
// import ParentComponent from './parentcomp';
// import Userstable from './components/userstable';
// import Studentbycollegeverification from './components/studentbycollegeverification';
// import Parentallstudents from './bootstrapcomp/parentallstudents';
// import Sendschedule from './interviewProcess/sendschedule';
// import Interviewmodal from './bootstrapcomp/interviewmodal';
// import Pdfresume from './components/pdfresume';
// import Pdfdocument from './components/pdfdocument';

// const router = createBrowserRouter(createRoutesFromElements([
//   <Route>
//     <Route path='/' element={<App />}>
      // <Route path='/' element={<Login />}></Route>
      // <Route path='/home' element={<Home />}></Route>
      // <Route path='/register' element={<Register />}></Route>
      // <Route path='/formpage' element={<Formpage />}></Route>
      // <Route path='/allusers' element={<Allusers />}></Route>
      // <Route path='/collegeformpage' element={<Collegeformpage />}></Route>
      // <Route path='/universityform/:srno' element={<Universityform />}></Route>
      // <Route path='/viewcollege' element={<Viewcollege />}></Route>
      // <Route path='/inputstudentpage' element={<InputStudentpage />}></Route>
      // <Route path='/viewformlayout' element={<Viewformlayout />}></Route>
      // <Route path='/testlogin' element={<Testlogin />}></Route>
      // <Route path='/superadmin' element={<Superadmin />}></Route>
      // <Route path='/createRole' element={<CreateRole />}></Route>
      // <Route path='/mentor' element={<Mentor />}></Route>
      // <Route path='/parent' element={<ParentComponent />}></Route>
      // <Route path='/userstable' element={<Userstable />}></Route>
      // <Route path='/studentbycollegeverification' element={<Studentbycollegeverification />}></Route>
      // <Route path='/parentallstudents' element={<Parentallstudents />}></Route>
      // <Route path='/sendschedule' element={<Sendschedule />}></Route>
      // <Route path='/interviewmodal' element={<Interviewmodal />}></Route>
      // <Route path='/pdfresume' element={<Pdfresume />}></Route>
      // <Route path='/pdfdocument' element={<Pdfdocument />}></Route>

//     </Route>
//   </Route>
// ]))

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>

//     <RouterProvider router={router} />

//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

