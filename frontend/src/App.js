
import React, { useEffect, useState, useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './login';
import Home from './home';
import Register from './register';
import Formpage from './formpage';
import Allusers from './allusers';
import PrivateRoute from './PrivateRoute';
import CryptoJS from 'crypto-js';



import Collegeformpage from './collegeformpage';
import Universityform from './components/universityform';
import Viewcollege from './components/viewcollege';
import InputStudentpage from './components/inputstudentpage';
import Viewformlayout from './viewformlayout';
import Testlogin from './testlogin';
import Superadmin from './admin/superadmin';
import CreateRole from './admin/createRole';
import Mentor from './components/mentor';
import ParentComponent from './parentcomp';
import Userstable from './components/userstable';
import Studentbycollegeverification from './components/studentbycollegeverification';
import Parentallstudents from './bootstrapcomp/parentallstudents';
import Sendschedule from './interviewProcess/sendschedule';
import Interviewmodal from './bootstrapcomp/interviewmodal';
import Pdfresume from './components/pdfresume';
import Pdfdocument from './components/pdfdocument';
import Rolemodal from './bootstrapcomp/rolemodal';
import CameraAccessTest from './components/cameratest';
import Finalapproval from './finalapproval';
import ScheduledInterview from './components/scheduledInterview';
import ShowInterview from './showInterview';
import CsrApproval from './csrApproval';
import MdApproval from './mdApproval';
import Readyforfund from './reports/readyforfund';
import IntSchledStud from './reports/intSchledStud';
import ExternalStudentList from './externalStudentList';
import BudgetAllocation from './budgetAllocation';
import BudgetAproval from './admin/budgetAproval';
import Journey from './journey';
import JourneyStatus from './components/journeyStatus';
import StudentsFees from './studentsFees';
import StudentFeesReport from './reports/student_fees_report';
import ShowStudentFees from './showStudentFees';
import FeesApproval from './feesApproval';
import Studentresult from './studentresult';
import Showresult from './components/showresult';
import ExternalStudentReport from './reports/approved_student_list';
import DisbursStudentReport from './reports/disbursReport';
import FundBalanceReport from './fundBalanceReport';
import Dataduestudent from './reports/dataduestudent';
import Pendingfund from './reports/pendingfund';
import Rejectedstu from './reports/rejectedstu';
import Excelcheck from './excelcheck';



function App() {

  const userauth = useSelector((state) => state.mentor.userauth);
  const [userRole, setUserRole] = useState(null);
  const secretKey = 'yourSecretKeyHere';

   console.log(userRole);

  async function decryptedData(value) {
    try {
      if (!value) {
        console.error('Empty data for decryption');
        return;
      }

      const decryptedBytes = CryptoJS.AES.decrypt(value, secretKey);

      if (decryptedBytes.sigBytes <= 0) {
        console.error('Decryption unsuccessful');
        return;
      }

      const data = decryptedBytes.toString(CryptoJS.enc.Utf8);
      setUserRole(JSON.parse(data))
      // //  console.log(data);
      // //  console.log('Data stored in localStorage');
    } catch (error) {
      console.error('Error decrypting data:', error);
    }
  }


  useEffect(() => {
    const auth = localStorage.getItem("userAuth");

    decryptedData(auth)
    // //  console.log(decryptedData);
    // setUserRole(decryptedData)

  }, [userauth])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Testlogin />}></Route>
        <Route path='/home' element={<Home />}></Route>
        {/* <Route path='/viewformlayout' element={<Viewformlayout />}></Route> */}
        {userRole && userRole.accessList.map((role, index) => (
          <Route key={index} path={role} element={<ComponentForRole role={role} />} />
        ))}

        {!userRole && <Route path='*' element={<div style={{ textAlign: "center", fontWeight: "bold", height: "100vh", color: "black" }}>
          <h1>404 Page Not Found!!</h1></div>}></Route>}
        {/* <Route path='/finalapproval' element={<Finalapproval />}></Route> */}

        {/* <Route path='/register' element={<Register />}></Route> */}
        {/* <Route path='/formpage' element={<Formpage />}></Route> */}
        {/* <Route path='/allusers' element={<Allusers />}></Route> */}
        {/* <Route path='/cameratest' element={<CameraAccessTest/>}></Route> */}
        {/* <Route path='/collegeformpage' element={<Collegeformpage />}></Route> */}
        {/* <Route path='/universityform/:srno' element={<Universityform />}></Route> */}
        {/* <Route path='/viewcollege' element={<Viewcollege />}></Route> */}
        {/* <Route path='/inputstudentpage' element={<InputStudentpage />}></Route> */}
        <Route path='/viewformlayout' element={<Viewformlayout />}></Route>
        {/* <Route path='/testlogin' element={<Testlogin />}></Route> */}
        {/* <Route path='/superadmin' element={<Superadmin />}></Route> */}
        {/* <Route path='/createRole' element={<CreateRole />}></Route> */}
        <Route path='/mentor' element={<Mentor />}></Route>
        {/* <Route path='/parent' element={<ParentComponent />}></Route> */}
        {/* <Route path='/userstable' element={<Userstable />}></Route> */}
        {/* <Route path='/studentbycollegeverification' element={<Studentbycollegeverification />}></Route> */}
        {/* <Route path='/parentallstudents' element={<Parentallstudents />}></Route> */}
        {/* <Route path='/sendschedule' element={<Sendschedule />}></Route> */}
        {/* <Route path='/interviewmodal' element={<Interviewmodal />}></Route> */}
        <Route path='/pdfresume' element={<Pdfresume />}></Route>
        {/* <Route path='/scheduledInterview' element={<ScheduledInterview />}></Route> */}
        <Route path='/showInterview' element={<ShowInterview />}></Route>
        {/* <Route path='/csrApproval' element={<CsrApproval />}></Route> */}
        {/* <Route path='/mdApproval' element={<MdApproval />}></Route> */}
        {/* <Route path='/readyforfunds' element={<Readyforfund />}></Route> */}
        {/* <Route path='/interviewscheduledstudents' element={<IntSchledStud />}></Route> */}
        {/* <Route path='/rolemodal' element={<Rolemodal/>}></Route> */}
        {/* <Route path='/pdfdocument' element={<Pdfdocument />}></Route> */}
        {/* <Route path='/externalStudentList' element={<ExternalStudentList />}></Route> */}
        {/* <Route path='/budgetallocation' element={<BudgetAllocation />}></Route> */}
        {/* <Route path='/budgetapproval' element={<BudgetAproval />}></Route> */}
        {/* <Route path='/journey' element={<Journey />}></Route> */}
        <Route path='/journeystatus' element={<JourneyStatus />}></Route>
        {/* <Route path='/studentsfees' element={<StudentsFees />}></Route> */}
        {/* <Route path='/studentsfees_report' element={<StudentFeesReport />}></Route> */}
        {/* <Route path='/showStudentFeesAllocation' element={<ShowStudentFees />}></Route> */}
        {/* <Route path='/feesApproval' element={<FeesApproval/>}></Route> */}
        {/* <Route path='/student_result' element={<Studentresult />}></Route> */}
        <Route path='/showresult' element={<Showresult />}></Route>
        {/* <Route path='/referal_students_report' element={<ExternalStudentReport />}></Route> */}
        {/* <Route path='/students_amount_disbursment_report' element={<DisbursStudentReport />}></Route> */}
        {/* <Route path='/fund_balance_report' element={<FundBalanceReport/>}></Route> */}
        {/* <Route path='/dataduestudents' element={<Dataduestudent/>}></Route> */}
        {/* <Route path='/pending_fund' element={<Pendingfund />}></Route>
        <Route path='/rejected_student' element={<Rejectedstu/>}></Route> */}
        <Route path='/excel_report' element={<Excelcheck />}></Route>
        {/* <Route path='/viewform' element={<Viewform/>}></Route> */}
      </Routes>
    </div>
  );
}

// Example of a component for each role
function ComponentForRole({ role }) {

  //  console.log(role);

  const components = {
    // Login: <Login />,
    // Register: <Register />,
    Allusers: <Allusers />,
    // Formpage : <Formpage/>
    Viewcollege: <Viewcollege />,
    InputStudentpage: <InputStudentpage />,
    CreateRole: <CreateRole />,
    // Mentor: <Mentor />,
    Userstable: <Userstable />,
    Parentallstudents: <Parentallstudents />,
    Sendschedule: <Sendschedule />,
    // Interviewmodal: <Interviewmodal />,
    Collegeformpage: <Collegeformpage />,
    Finalapproval: <Finalapproval />,
    ScheduledInterview: <ScheduledInterview />,
    CsrApproval: <CsrApproval />,
    MdApproval: <MdApproval />,
    IntSchledStud: <IntSchledStud />,
    Readyforfund: <Readyforfund />,
    ExternalStudentList: <ExternalStudentList />,
    BudgetAllocation: <BudgetAllocation />,
    BudgetAproval: <BudgetAproval />,
    StudentsFees: <StudentsFees />,
    ShowStudentFees: <ShowStudentFees />,
    FeesApproval: <FeesApproval />,
    Journey: <Journey />,
    Studentresult: <Studentresult />,
    ExternalStudentReport: <ExternalStudentReport />,
    DisbursStudentReport: <DisbursStudentReport />,
    FundBalanceReport: <FundBalanceReport />,
    Dataduestudent: <Dataduestudent />,
    Pendingfund: <Pendingfund />,
    Rejectedstu: <Rejectedstu />,
    Viewformlayout: <Viewformlayout/>
  };

  return (
    <div>
      {components[role]}
    </div>
  );
}

export default App;


