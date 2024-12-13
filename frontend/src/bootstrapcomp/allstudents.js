import React from 'react'

const Allstudents = (props) => {

    const students = props.allstudents;


  return (
      <React.Fragment>
          {/* <div className='container'> */}
              <table class="table table-success table-striped">
                  <thead>
                      <tr>
                          <th scope="col">Student Name</th>
                          <th scope="col">College Name</th>
                          <th scope="col">Phone</th>
                      <th scope="col">Email</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Marks</th>
                      <th scope="col">Approval Status</th>
                      </tr>
                  </thead>
              <tbody>
                  {students.map((student, index) => {
                      
                      let submitStatus;

                      if (student.submit_stage === 0) {
                          submitStatus = "Not Approved";
                      } else if (student.submit_stage === 1) {
                          submitStatus = "First Approve done";
                      } else if (student.submit_stage === 2) {
                          submitStatus = "Final Approve done";
                      }

                      return <tr>
                          <td style={{
                              maxWidth: "15vw",
                              overflowX: "scroll"
                          }}>{student.studentname}</td>
                          <td>{student.collegename}</td>
                          <td>{student.studentphone}</td>
                          <td style={{maxWidth:"15vw",
    overflowX: "scroll"}}>{student.email}</td>
                          <td>{student.grade}</td>
                          <td>{student.studentmarks}</td>
                        <td>{submitStatus}</td>
                      </tr>
                  })}
                      
                  </tbody>
              </table>
          {/* </div>     */}
    </React.Fragment>
  )
}

export default Allstudents;