import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveItem, setFocusMenu } from '../actions/mentorActions';

const Sidebar = () => {
  const [list, setList] = useState([]);
  const [userRole, setUserRole] = useState();
  // const [activeItem, setActiveItem] = useState(null);
  const secretKey = 'yourSecretKeyHere';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // //  console.log(userRole);

  //  console.log(list);

  const menuNo = localStorage.getItem('menuProcessNo');

  const focusmenu = useSelector((state) => state.mentor.focusmenu);
  const activeitem = useSelector((state) => state.mentor.activeitem);

  const activeItem = menuNo === null ? activeitem : parseInt(menuNo, 10); 

  console.log(activeItem, menuNo, activeitem);

  const orderMapping = {
    Collegeformpage: 1,
    Viewcollege: 2,
    Finalapproval: 3,
    Allusers: 4,
    Sendschedule: 5,
    CsrApproval: 6,
    MdApproval: 7,
    ScheduledInterview: 8,
    ExternalStudentList: 9,
    Parentallstudents: 10,
    InputStudentpage: 11,
    Journey: 12,
    Readyforfund: 13,  //reports
    IntSchledStud: 14, //reports
    ExternalStudentReport: 15,//reports
    DisbursStudentReport: 16,//reports
    FundBalanceReport: 17,//reports
    Dataduestudent: 18, //reports
    Pendingfund: 19, //reports
    Rejectedstu:20, //reports
    Mentor: 21,  //assignroles
    CreateRole: 22,//assignroles
    Userstable: 23,//assignroles,
    BudgetAllocation: 24,   //funds
    BudgetAproval: 25,   //funds
    StudentsFees: 26,   //funds
    ShowStudentFees: 27,   //funds
    FeesApproval: 28,   //funds
    Studentresult: 29  //funds
  };

  // Map over the sorted keys to get the corresponding strings
  const sortedSetList = list.slice().sort((a, b) => orderMapping[a] - orderMapping[b]);

  const reportList = sortedSetList.filter(item => orderMapping[item] > 12 && orderMapping[item] < 21);
  const operationList = sortedSetList.filter(item => orderMapping[item] < 13);

  const assignRolesList = sortedSetList.filter(item => orderMapping[item] > 20 && orderMapping[item] < 24);

  const fundsList = sortedSetList.filter(item => orderMapping[item] > 23 && orderMapping[item] <= 29);


  // //  console.log(sortedSetList);
  // //  console.log(fundsList);

  ////  console.log(list);

  async function decryptedData(value) {
    try {
      if (!value) {
        //console.error('Empty data for decryption');
        return;
      }

      const decryptedBytes = CryptoJS.AES.decrypt(value, secretKey);

      if (decryptedBytes.sigBytes <= 0) {
        //console.error('Decryption unsuccessful');
        return;
      }

      const data = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const parsedData = JSON.parse(data);
      setUserRole(parsedData);
      setList(parsedData.accessList)
      // ////  console.log('Data stored in localStorage');
      // return parsedData.roleId;
    } catch (error) {
      //console.error('Error decrypting data:', error);
      return null;
    }
  }

  const handleItemClick = (index, menu) => {

    try {
      localStorage.setItem('menuProcessNo', index);
      dispatch(setActiveItem(index))
    } catch (error) {
      console.error(error);
    }
  };

  const menuchange = (menu) => {
    return navigate(menu);
  }

  // const fetch_access_list = async (role_id) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/fetch_access_list?role_id=${role_id}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setList(data.accessList);
  //     } else {
  //       //console.error('Failed to fetch access list:', response.statusText);
  //     }
  //   } catch (error) {
  //     //console.error('Error fetching access list:', error);
  //   }
  // }

  const mapPageToRoute = (page) => {

    switch (page) {
      case 'Allusers':
        return { route: '/allusers', name: "Show Student Details" };
      case 'Viewcollege':
        return { route: '/viewcollege', name: "Student's Uploaded by College" };
      case 'InputStudentpage':
        return { route: '/inputstudentpage', name: "Student Notification" };
      case 'CreateRole':
        return { route: '/createRole', name: "Create Role" };
      case 'Mentor':
        return { route: '/mentor', name: "Update User Profile" };
      case 'Userstable':
        return { route: '/userstable', name: "Assign Additional Role" };
      case 'Parentallstudents':
        return { route: '/parentallstudents', name: "Student Initial Screening Status" };
      case 'Sendschedule':
        return { route: '/sendschedule', name: "Schedule Interview" };
      // case 'Interviewmodal':
      //   return { route: '/interviewmodal', name: "Set Interview Time" };
      case 'Collegeformpage':
        return { route: '/collegeformpage', name: "Send Notification to College" };
      case 'Finalapproval':
        return { route: '/finalapproval', name: "Final Approval for Initial Screening" };
      case 'ScheduledInterview':
        return { route: '/scheduledInterview', name: "Interview Scheduled Details" };
      case 'CsrApproval':
        return { route: '/csrApproval', name: "CSR Approval for Interview" };
      case 'MdApproval':
        return { route: '/mdApproval', name: "MD Final Approval for Interview" };
      case 'Readyforfund':
        return { route: '/readyforfund', name: "Ready for Fund- Report" };
      case 'IntSchledStud':
        return { route: '/IntSchledStud', name: "interview scheduled Details - Report" };
      case 'ExternalStudentList':
        return { route: '/externalStudentList', name: "Referal Candidate Approval" };
      case 'BudgetAllocation':
        return { route: '/budgetallocation', name: "Budget Allocation" };
      case 'BudgetAproval':
        return { route: '/budgetaproval', name: "Budget Approval" };
      case 'Journey':
        return { route: '/journey', name: "Student Journey" };
      case 'StudentsFees':
        return { route: '/studentsfees', name: "Student's Fees Allocation" };
      case 'ShowStudentFees':
        return { route: '/ShowStudentFees', name: "Show Student Fees Allocation" };
      case 'FeesApproval':
        return { route: '/feesApproval', name: "Student's Fees Approval" };
      case 'Studentresult':
        return { route: '/Studentresult', name: "Student's Fund Disbursment" };
      case 'ExternalStudentReport':
        return { route: '/ExternalStudentReport', name: "Ref. Student Report" };
      case 'DisbursStudentReport':
        return { route: '/DisbursStudentReport', name: "Fund Disbursment Report" };
      case 'FundBalanceReport':
        return { route: '/FundBalanceReport', name: "Fund Balance Report" };
      case 'Dataduestudent':
        return { route: '/Dataduestudent', name: "Students Upload Data Pending " };
      case 'Pendingfund':
        return { route: '/Pendingfund', name: "Upcoming Renewal Report " };
      case 'Rejectedstu':
        return { route: '/Rejectedstu', name: "Student Rejected List " };

      default:
        return '/default'; // Default route or a placeholder.
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");

    decryptedData(auth)
    dispatch(setFocusMenu(""));
    // .then((roleId) => {
    //   if (roleId) {
    //     fetch_access_list(roleId);
    //   }
    // });
  }, []);

  // useEffect(() => {
  //   if (focusmenu !== "") {
  //     navigate(focusmenu);
  //   }
  // },[focusmenu])


  return (
    <div>
      <aside id="sidebar" className="sidebar" style={{ width: "240px" }}>

        <ul className="sidebar-nav" id="sidebar-nav">

          <li key={0} className={activeItem === 0 ? "nav-item activate_menu" : "nav-item"} style={{
            marginBottom: "8px", background: "rgb(45 47 50)", padding: "7px 0", borderRadius: "5px"
          }} onClick={() => handleItemClick(0)}>
            <div onClick={() => { handleItemClick(0); menuchange("/home") }} style={{ color: "white",cursor:"pointer", marginLeft: "16px", }}>
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </div>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-heading navbar_heading" key={1} style={{ color: "white", padding: "7px", margin: "10px 0" }}>Assign Roles</li>

          <li className={activeItem === 1 ? 'sidebar_link activate_menu' : "sidebar_link"} key={2} style={{
            marginBottom: "8px", background: "rgb(45 47 50)", padding: "7px 0", borderRadius: "5px"
          }}>
            <div onClick={() => { handleItemClick(1); menuchange("/mentor") }} style={{cursor:"pointer"}}>
            <div className='row'>
              <div className='col-2'>
                <i class="bi bi-circle" style={{ fontSize: "6px", marginRight: "8px", lineHeight: "0", borderRadius: "50%", color: "white", marginLeft: "16px" }}></i>
              </div>
              <div className='col-10'>
                <span style={{ color: "white", fontSize: "13px" }}>{"Update User's Profile"}</span>
              </div>
            </div>
            </div>
          </li>

          {assignRolesList.map((page, index) => {
            const mapping = mapPageToRoute(page);
            return <li className={activeItem === index+2 ? 'sidebar_link activate_menu' : "sidebar_link"} key={`assignRoles-${index}`} style={{
              marginBottom: "8px", background: "rgb(45 47 50)", padding: "7px 0", borderRadius: "5px"
            }}>
              {/* <Link to={mapping.route}> */}
              <div onClick={() => { handleItemClick(index+2); menuchange(mapping.route) }} style={{cursor:"pointer"}}>
                <div className='row'>
                  <div className='col-2'>
                    <i class="bi bi-circle" style={{ fontSize: "6px", marginRight: "8px", lineHeight: "0", borderRadius: "50%", color: "white", marginLeft: "16px" }}></i>
                  </div>
                  <div className='col-10'>
                    <span style={{ color: "white", fontSize: "13px" }}>{mapping.name}</span>
                  </div>
                </div>
              </div>
            </li>
          })}

          {operationList.length > 0 ? <li className="nav-heading navbar_heading" key={3} style={{ color: "white", padding: "7px", margin: "10px 0" }}>Operations</li> : ""}

          {operationList.map((page, index) => {
            const mapping = mapPageToRoute(page);
            return <li className={activeItem === assignRolesList.length + index + 2 ? 'sidebar_link activate_menu' : "sidebar_link"} key={`operation-${index}`} style={{
              marginBottom: "8px", background: "rgb(45 47 50)", padding: "7px 0", borderRadius: "5px"
            }}>
              {/* <Link to={mapping.route}> */}
              <div onClick={() => { handleItemClick(assignRolesList.length + index + 2); menuchange(mapping.route) }} style={{ cursor: "pointer" }}>
                <div className='row'>
                  <div className='col-2'>
                    <i class="bi bi-circle" style={{ fontSize: "6px", marginRight: "8px", lineHeight: "0", borderRadius: "50%", color: "white", marginLeft: "16px" }}></i>
                  </div>
                  <div className='col-10'>
                    <span style={{ color: "white", fontSize: "13px" }}>{mapping.name}</span>
                  </div>
                </div>
              </div>
            </li>
          })}

          {fundsList.length > 0 ? <li className="nav-heading navbar_heading" key={4} style={{ color: "white", padding: "7px", margin: "10px 0" }}>Funds</li> : ""}

          {fundsList.map((page, index) => {
            const mapping = mapPageToRoute(page);
            return <li className={activeItem === assignRolesList.length+ operationList.length + index + 2 ? 'sidebar_link activate_menu' : "sidebar_link"} key={`funds-${index}`} style={{
              marginBottom: "8px", background: "rgb(45 47 50)", padding: "7px 0", borderRadius: "5px"
            }}>
              {/* <Link to={mapping.route}> */}
              <div onClick={() => { handleItemClick(assignRolesList.length + operationList.length + index + 2); menuchange(mapping.route) }} style={{ cursor: "pointer" }}>
                <div className='row'>
                  <div className='col-2'>
                    <i className="bi bi-circle" style={{ fontSize: "6px", marginRight: "8px", lineHeight: "0", borderRadius: "50%", color: "white", marginLeft: "16px" }}></i>
                  </div>
                  <div className='col-10'>
                    <span style={{ color: "white", fontSize: "13px" }}>{mapping.name}</span>
                  </div>
                </div>
              </div>
            </li>
          })}

          {reportList.length > 0 ? <li className="nav-heading navbar_heading" key={5} style={{ color: "white", padding: "7px", margin: "10px 0" }}>Reports</li> : ""}

          {reportList.map((page, index) => {
            const mapping = mapPageToRoute(page);
            return <li className={activeItem === assignRolesList.length + operationList.length + fundsList.length + index + 2 ? 'sidebar_link activate_menu' : "sidebar_link"} key={`reports-${index}`} style={{
              marginBottom: "8px", background: "rgb(45 47 50)", padding: "7px 0", borderRadius: "5px"
            }}>
              {/* <Link to={mapping.route}> */}
              <div onClick={() => { handleItemClick(assignRolesList.length + operationList.length + fundsList.length + index + 2); menuchange(mapping.route) }} style={{ cursor: "pointer" }}>
                <div className='row'>
                  <div className='col-2'>
                    <i className="bi bi-circle" style={{ fontSize: "6px", marginRight: "8px", lineHeight: "0", borderRadius: "50%", color: "white", marginLeft: "16px" }}></i>
                  </div>
                  <div className='col-10'>
                    <span style={{ color: "white", fontSize: "13px" }}>{mapping.name}</span>
                  </div>
                </div>
              </div>
            </li>
          })}
        </ul>

      </aside>
    </div>
  )
}

export default Sidebar;