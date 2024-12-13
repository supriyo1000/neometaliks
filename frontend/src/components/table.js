import React from 'react'

const Table = (props) => {
    const msgs = props.notification;
    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">College Name</th>
                        <th scope="col">College Mail</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {msgs.map((m, index) => {
                        return <tr key={index}>
                            <td style={{ width: "200px" }} className='mail-text'>{m.collegename}</td>
                            <td className='mail-text'>{m.collegeemail}</td>
                            <td className='mail-text'>{m.comments}</td>
                            <td>{m.mail_status === "Success" ? <button className='btn btn-success mail-button'>{m.mail_status}</button> :
                                <button className='btn btn-danger mail-button'>Errored</button>
                            }</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Table