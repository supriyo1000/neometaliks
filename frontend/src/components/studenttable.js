import React from 'react'

const Studenttable = (props) => {
    const msgs = props.notification;
    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">Student Mail</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {msgs.map((m, index) => {
                        return <tr key={index}>
                            <td style={{ width: "200px" }}>{m.studentname}</td>
                            <td>{m.email}</td>
                            <td>{m.comments}</td>
                            <td>{m.sstatus === "Success" ? <button className='btn btn-success'>{m.sstatus}</button> :
                                <button className='btn btn-danger'>{m.sstatus}</button>
                            }</td>
                        </tr>
                    })}

                </tbody> */}
                <tbody>
                    {msgs.map((m, index) => {
                        return <tr key={index}>
                            <td style={{ width: "200px" }}>{m.studentname}</td>
                            <td>{m.email}</td>
                            <td>{m.comments}</td>
                            <td>{m.sstatus === "Success" ? <button className='btn btn-success'>{m.sstatus}</button> :
                                <button className='btn btn-danger'>{m.sstatus}</button>
                            }</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Studenttable