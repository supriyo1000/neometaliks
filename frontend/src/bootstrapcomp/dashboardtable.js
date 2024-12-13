import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDashboardModal, setMdmodal } from '../actions/dashboardAction';
import Modalscreen from './modalscreen';
import ipAddress from '../ipconfig';

const DashboardTable = (props) => {
  const [detail, setDetail] = useState({});
  const students = props.allstudents

  console.log(detail);

  const dispatch = useDispatch();

  // async function afunc(param) {
  //   const stu = studentalldetails(param);
  //   dispatch(setMdmodal(true))
  // }


  async function studentalldetails(id) {
    const response = await fetch(`http://${ipAddress}:8000/users/fetchstudentdetails?stuid=${id}`).then(res => res.json()).then(res => setDetail(res));
    // setDetail(response)
    if (detail) {
      dispatch(setMdmodal(true));
    }

    console.log(response);

  }

  return (
    <React.Fragment>
      <div className='container'>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Student Name</th>
                <th scope="col">College Name</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                return <tr key={index}>
                  <td>{student.studentname}</td>
                  <td>{student.collegename}</td>
                  <td><button className="btn btn-danger mail-button">Pending</button></td>
                  <td><button className="btn btn-success mail-button" onClick={() => { studentalldetails(student.serialno) }}>Details</button></td>
                </tr>
              })
              }

            </tbody>
          </table>
        </div>
      </div>
      <Modalscreen alldetails={detail} />

    </React.Fragment>
  )
}

export default DashboardTable;