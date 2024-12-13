import React, { useEffect, useState } from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import BarCharts from './barcharts';
import LineCharts from './linechart';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Form from './form';
import axios from 'axios';
import ipAddress from './ipconfig';
import { setStudents, setDashboardModal } from './actions/dashboardAction';
import { setModal } from './actions/mentorActions';
import DashboardTable from './bootstrapcomp/dashboardtable';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Home = () => {
  const [studentcount, setStudentcount] = useState(null);
  const [studentReport, setStudentReport] = useState({});
  const [totalFundDis, setTotalFundDis] = useState([]);
  const [totalFund, setTotalFund] = useState(null);
  const [yearwisefund, setYearWiseFund] = useState(null);
  const [fyear, setFyear] = useState("");
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);
  const secretKey = 'yourSecretKeyHere';

  console.log(ipAddress);
  console.log(studentReport);
  const date = new Date();
  const getyear = date.getFullYear();

  const students = useSelector((state) => state.dashboard.students);
  const dashboardmodal = useSelector((state) => state.dashboard.dashboardmodal);
  const userauth = useSelector((state) => state.mentor.userauth);
  console.log(students);

  console.log(dashboardmodal);


  // async function fetchFirstApprove() {
  //   try {
  //     const response = await fetch(`http://192.168.1.4:8000/users/fetchfirstapprove`);
  //     const data = await response.json(); // Parse the response data
  //     setStudentcount(data.totalRowCount); // Assuming totalRowCount is the correct property name
  //     dispatch(setStudents(data.response2[0][0]))
  //     console.log(data.totalRowCount);
  //     console.log(data.response2[0][0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function fetchstatus() {
    const data = await fetch(`http://${ipAddress}:8000/users/mailReports`).then(res => res.json());
    setStudentReport(data);
    console.log(studentReport);
    return data;
  }

  async function fetchTotalDisbursedAmount() {
    const data = await fetch(`http://${ipAddress}:8000/users/total_funds_disbursed_till_date`).then(res => res.json());
    setTotalFundDis(data);
    console.log(studentReport);
    return data;
  }

  async function fetchYearWiseBudget() {
    console.log(fyear);
    const data = await fetch(`http://${ipAddress}:8000/external/get_yearwise_budget`).then(res => res.json());
    setYearWiseFund(data);
    console.log(data);
    return data;
  }



  console.log(studentReport);
  const option = {
    categoryPercentage: 1,
    plugins: {
      title: {
        display: true,
        text: 'REAL-TIME LIMESTONE SIZING ANALYSIS CHART',
        color: 'red',

      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: ["red", "black"]
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: ["brown", "black"]
        },
      },
    },
  }

  // const config = {
  //   type: 'line',
  //   data: data,
  const options2 = {
    categoryPercentage: 1,
    responsive: true,
    plugins: {
      title: {
        // display: true,
        // text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
        // color: 'white',
      }
    },
    responsive: true,
    scales: {
      x: {
        // stacked: true,
        ticks: {
          color: ["white"]
        }
      },
      y: {
        // stacked: true,
        ticks: {
          color: ["white"]
        },
      },
    },
  }
  // };

  const [userData, setUserData] = useState({
    labels: "11.30",
    datasets: [
      {
        label: 'My First Dataset',
        data: [45],
        backgroundColor: 'green',
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: 'My second Dataset',
        data: [50],
        backgroundColor: 'blue',
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: 'My third Dataset',
        data: [75],
        backgroundColor: 'red',
        borderColor: "black",
        borderWidth: 1,
      },

    ],
  });

  const [userData2, setUserData2] = useState({
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Dataset',
        data: [0, 10, 20, 30, 40],
        borderColor: 'white',
        color: "white",
        backgroundColor: 'white',
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      }
    ]
  });

  // const totalnumber = () => {
  //   // Parse input values to floats (or use 0 if empty)
  //   const subValue = sub === "" ? 0 : parseFloat(sub);
  //   const comValue = com === "" ? 0 : parseFloat(com);
  //   const convicValue = convic === "" ? 0 : parseFloat(convic);
  //   const aspValue = asp === "" ? 0 : parseFloat(asp);
  //   const elgValue = elg === "" ? 0 : parseFloat(elg);

  //   // Calculate the total
  //   return subValue + comValue + convicValue + aspValue + elgValue;
  // }

  // const total = totalnumber().toFixed(2)

  function currentFinancialYear() {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 1;
    setFyear(`${currentYear}-${endYear}`);
  }

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
    // fetchFirstApprove();
    fetchstatus();
    fetchTotalDisbursedAmount();
    fetchYearWiseBudget();
  }, [])

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");

    decryptedData(auth)
    // //  console.log(decryptedData);
    // setUserRole(decryptedData)

  }, [userauth])



  useEffect(() => {
    let total = 0;

    if (totalFundDis.length > 0) {
      for (let i = 0; i < totalFundDis.length; i++) {
        total = total + totalFundDis[i].amount;
      }
    }
    setTotalFund(total.toFixed(2));

  }, [totalFundDis])

  useEffect(() => {
    localStorage.setItem('menuProcessNo', 0);
  }, [])


  return (
    <>
      <Navbar />

      <Sidebar />


      <main id="main" class="main" style={{ marginLeft: "240px", marginTop: '80px' }}>

        <div class="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}

        <section class="section dashboard">
          <div class="row">

            <div class="col-lg-12">
              <div class="row">

                {/* <div class="col-xxl-4 col-md-4">
                  <div class="card info-card sales-card">

                    <div class="card-body">
                      <h5 class="card-title">Pending Second Approval <span>| Student Initial Screening</span></h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        </div>
                        <div class="ps-3">
                          <h6 style={{ cursor: "pointer" }} onClick={() => dispatch(setDashboardModal(true))}>{studentcount}</h6>
                          <span class="text-success small pt-1 fw-bold">Student Initial Screening</span>

                        </div>
                      </div>
                    </div>

                  </div>
                </div> */}
                <div class="col-xxl-4 col-md-4">
                  <div class="card info-card revenue-card">

                    <div class="card-body">
                      <h5 class="card-title">Invitation To College</h5>

                      <div class="d-flex align-items-center">
                        {dashboardmodal === false ?
                          <>
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-house-door"></i>
                            </div>
                            <div class="ps-3">
                              <h6>{studentReport.college_count}</h6>
                              {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}

                            </div>
                          </>
                          : <DashboardTable allstudents={students} />
                        }

                      </div>
                    </div>

                  </div>
                </div>

                <div class="col-xxl-4 col-md-4">
                  <div class="card info-card revenue-card">

                    <div class="card-body">
                      <h5 class="card-title">Invitation To Student</h5>

                      <div class="d-flex align-items-center">
                        {dashboardmodal === false ?
                          <>
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-person-fill"></i>
                            </div>
                            <div class="ps-3">
                              <h6>{studentReport.student_count}</h6>
                              {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}

                            </div>
                          </>
                          : <DashboardTable allstudents={students} />
                        }

                      </div>
                    </div>

                  </div>
                </div>

                <div class="col-xxl-4 col-md-4">
                  <div class="card info-card revenue-card">

                    <div class="card-body">
                      <h5 class="card-title">Referal Students</h5>

                      <div class="d-flex align-items-center">
                        {dashboardmodal === false ?
                          <>
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <Link to={userRole && userRole.accessList.includes('ExternalStudentReport')? '/ExternalStudentReport' : '#'}>
                                <i class="bi bi-person-fill" style={{cursor:"pointer"}}></i>
                              </Link>
                            </div>
                            <div class="ps-3">
                              <h6>{studentReport.external_count}</h6>
                              {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}

                            </div>
                          </>
                          : <DashboardTable allstudents={students} />
                        }

                      </div>
                    </div>

                  </div>
                </div>
                <div class="col-xxl-4 col-md-4">
                  <div class="card info-card revenue-card">

                    <div class="card-body">
                      <h5 class="card-title">Succesfull Interviews</h5>

                      <div class="d-flex align-items-center">
                        {dashboardmodal === false ?
                          <>
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <img src='assets/img/interview.jpg' alt='' style={{ width: "100%" }} />
                            </div>
                            <div class="ps-3">
                              <h6>{studentReport.successfull_interview_count}</h6>
                              {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}

                            </div>
                          </>
                          : <DashboardTable allstudents={students} />
                        }

                      </div>
                    </div>

                  </div>
                </div>
                {/* <div class="col-xxl-4 col-md-4">
                  <div class="card info-card revenue-card">

                    <div class="card-body">
                      <h5 class="card-title">Ongoing Funds To Students</h5>

                      <div class="d-flex align-items-center">
                        {dashboardmodal === false ?
                          <>
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-person-fill"></i>
                            </div>
                            <div class="ps-3">
                              <h6>0</h6>

                            </div>
                          </>
                          : <DashboardTable allstudents={students} />
                        }

                      </div>
                    </div>

                  </div>
                </div> */}

                <div class="col-xxl-4 col-md-4">
                  <div class="card info-card revenue-card">

                    <div class="card-body">
                      <h5 class="card-title">Students Reffered By College</h5>

                      <div class="d-flex align-items-center">
                        {dashboardmodal === false ?
                          <>
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-person-fill"></i>
                            </div>
                            <div class="ps-3">
                              <h6>{studentReport.student_by_college_count}</h6>
                              {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}

                            </div>
                          </>
                          : <DashboardTable allstudents={students} />
                        }

                      </div>
                    </div>

                  </div>
                </div>

                <div class="col-xxl-4 col-xl-12">

                  <div class="card info-card customers-card">

                    <div class="card-body">
                      <h5 class="card-title">Funds Allocated <span>| {getyear}</span></h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-people"></i>
                        </div>
                        <div class="ps-3">
                          <h6><i class="bi bi-currency-rupee"></i>{yearwisefund !== null ? yearwisefund.total_balance : 0}</h6>
                          {/* <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span> */}

                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="card info-card customers-card">

                    <div class="card-body">
                      <h5 class="card-title">Total Funds Disbursed Till Date</h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <Link to={userRole && userRole.accessList.includes('DisbursStudentReport') ? '/DisbursStudentReport' : '#'}>
                            <i class="bi bi-people"></i>
                            </Link>
                        </div>
                        <div class="ps-3">
                          <h6><i class="bi bi-currency-rupee"></i>{totalFund}</h6>
                          {/* <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span> */}

                        </div>
                      </div>

                    </div>
                  </div>

                </div>


                {/* <div class="MuiBox-root css-zu3c2a">
                  <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-zow5z4-MuiGrid-root">
                    <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-4 css-dvqslv-MuiGrid-root">
                      <div class="MuiBox-root css-1c7fiqk">
                        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-xp0xlr-MuiPaper-root-MuiCard-root">
                          <div class="MuiBox-root css-glo75k">
                            <div class="MuiBox-root css-1scr5li">
                              <LineCharts chartData={userData2} options={options2} />
                            </div>
                            <div class="MuiBox-root css-d4e2jf">
                              <h6 class="MuiTypography-root MuiTypography-h6 css-185zf7l-MuiTypography-root">website views</h6>
                              <div class="MuiTypography-root MuiTypography-button css-znq6tb-MuiTypography-root">Last Campaign Performance</div><hr class="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root" />
                              <div class="MuiBox-root css-cz6ae8"><span class="MuiTypography-root MuiTypography-button css-17eg6aw-MuiTypography-root"><span class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-1neevca-MuiIcon-root" aria-hidden="true">schedule</span></span><span class="MuiTypography-root MuiTypography-button css-znq6tb-MuiTypography-root">campaign sent 2 days ago</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-4 css-dvqslv-MuiGrid-root">
                      <div class="MuiBox-root css-1c7fiqk">
                        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-xp0xlr-MuiPaper-root-MuiCard-root">
                          <div class="MuiBox-root css-glo75k">
                            <div class="MuiBox-root css-1jolx3e">
                              <LineCharts chartData={userData2} options={options2} />

                            </div>
                            <div class="MuiBox-root css-d4e2jf"><h6 class="MuiTypography-root MuiTypography-h6 css-185zf7l-MuiTypography-root">daily sales</h6><div class="MuiTypography-root MuiTypography-button css-znq6tb-MuiTypography-root">(<strong>+15%</strong>) increase in today sales.</div><hr class="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root" />
                              <div class="MuiBox-root css-cz6ae8"><span class="MuiTypography-root MuiTypography-button css-17eg6aw-MuiTypography-root"><span class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-1neevca-MuiIcon-root" aria-hidden="true">schedule</span></span><span class="MuiTypography-root MuiTypography-button css-znq6tb-MuiTypography-root">updated 4 min ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-4 css-dvqslv-MuiGrid-root">
                      <div class="MuiBox-root css-1c7fiqk"><div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-xp0xlr-MuiPaper-root-MuiCard-root">
                        <div class="MuiBox-root css-glo75k"><div class="MuiBox-root css-1is4x1g">
                          
                          <LineCharts chartData={userData2} options={options2} />
                        </div>
                          <div class="MuiBox-root css-d4e2jf"><h6 class="MuiTypography-root MuiTypography-h6 css-185zf7l-MuiTypography-root">completed tasks</h6>
                            <div class="MuiTypography-root MuiTypography-button css-znq6tb-MuiTypography-root">Last Campaign Performance</div><hr class="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root" />
                            <div class="MuiBox-root css-cz6ae8"><span class="MuiTypography-root MuiTypography-button css-17eg6aw-MuiTypography-root"><span class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-1neevca-MuiIcon-root" aria-hidden="true">schedule</span></span><span class="MuiTypography-root MuiTypography-button css-znq6tb-MuiTypography-root">just updated</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <!-- Reports --> */}

              </div>
            </div>

          </div>
          {/* <div class="row">
            <div class="col-8">
              <div class="card recent-sales overflow-auto" style={{ height: "100%" }}>

                <div class="card-body">
                  <h5 class="card-title">Recent Sales <span>| Today</span></h5>

                  <table class="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row"><a href="#">#2457</a></th>
                        <td>Brandon Jacob</td>
                        <td><a href="#" class="text-primary">At praesentium minu</a></td>
                        <td>$64</td>
                        <td><span class="badge bg-success">Approved</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2147</a></th>
                        <td>Bridie Kessler</td>
                        <td><a href="#" class="text-primary">Blanditiis dolor omnis similique</a></td>
                        <td>$47</td>
                        <td><span class="badge bg-warning">Pending</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2049</a></th>
                        <td>Ashleigh Langosh</td>
                        <td><a href="#" class="text-primary">At recusandae consectetur</a></td>
                        <td>$147</td>
                        <td><span class="badge bg-success">Approved</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2644</a></th>
                        <td>Angus Grady</td>
                        <td><a href="#" class="text-primar">Ut voluptatem id earum et</a></td>
                        <td>$67</td>
                        <td><span class="badge bg-danger">Rejected</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2644</a></th>
                        <td>Raheem Lehner</td>
                        <td><a href="#" class="text-primary">Sunt similique distinctio</a></td>
                        <td>$165</td>
                        <td><span class="badge bg-success">Approved</span></td>
                      </tr>
                    </tbody>
                  </table>

                </div>

              </div>
            </div>

          </div> */}
        </section>

      </main>
      {/* <!-- End #main --> */}

      {/* <!-- ======= Footer ======= --> */}
      <footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright <strong><span>Quobotic Consulting Private Limited</span></strong>. All Rights Reserved
        </div>
        <div class="credits">
          {/* <!-- All the links in the footer should remain intact. --> */}
          {/* <!-- You can delete the links only if you purchased the pro version. --> */}
          {/* <!-- Licensing information: https://bootstrapmade.com/license/ --> */}
          {/* <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ --> */}
          {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> */}
        </div>
      </footer>
      {/* <!-- End Footer --> */}

      <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    </>
  )
}

export default Home