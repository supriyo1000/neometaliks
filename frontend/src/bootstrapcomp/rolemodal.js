import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMdmodal } from '../actions/dashboardAction';
import axios from 'axios';
import { setShowRoleModal } from '../actions/mentorActions';


const Rolemodal = (props) => {

    const [allroles, setAllroles] = useState(props.UserAllRoles);

    console.log(allroles);

    const dispatch = useDispatch()

    async function updateStatus(userid, currentStatus, tablename,roleid) {
        try {
            const response1 = await axios.get(`http://192.168.1.4:8000/users/checkGlobalRoleStatus?roleId=${roleid}`)

            console.log(response1);
            if (response1.data.isPresent === 1) {
                const newStatus = currentStatus === 1 ? 0 : 1;

                console.log(userid, currentStatus, tablename , roleid);

                const response = await axios.post("http://192.168.1.4:8000/users/UpdateUserRoleStatus", {
                    userId: userid, status: newStatus, table: tablename
                });

                const updatedUsers = allroles.data.map(user => {
                    if (user.roleId === roleid) {
                        return { ...user, status: newStatus };
                    }
                    return user;
                });
                console.log(updatedUsers);
                setAllroles({
                    "name": allroles.name,
                    "data": updatedUsers
                });

                alert("Role Status updated successfully");
            } else {
                alert("Global Role Status is Disabled!! Please Contact Your Administrator");
            }

        } catch (error) {
            console.error("Error updating status:", error);
        }
    }


    return (
        <React.Fragment>
            {/* {mdmodal && */}
            <div className='overlay'>

                <div className='container modal-container'>
                    <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={() => dispatch(setShowRoleModal(false))}></button>

                    {/* <p>Name - {details.studentname}</p> */}
                    <table class="table table-warning table-striped">
                        <thead>
                            <tr>
                                <th scope="col">User Name</th>
                                <th scope="col">Roles</th>
                                <th scope="col">Access Pages</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allroles.data.map((role, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{role.userEmail}</td>
                                        <td>{role.roleName}</td>
                                        <td>
                                            <ul className="list-group">
                                                {(allroles.name === "response1"
                                                    ? JSON.parse(role.accessList)
                                                    : role.accessList
                                                ).map((list, index) => (
                                                    <li className="list-group-item" key={index}>
                                                        {list}
                                                    </li>
                                                ))}


                                            </ul>
                                        </td>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id={`flexSwitchCheckChecked-${index}`}
                                                    checked={role.status === 1}
                                                    onClick={() => updateStatus(role.userId, role.status, role.usertable, role.roleId)}
                                                    
                                                />
                                                <label className="form-check-label" style={{
                                                    background: role.status === 1 ? "#12d733" : "red",
                                                    padding: "5px",
                                                    borderRadius: "7px",
                                                    fontSize: "12px",
                                                    color: role.status === 1 ? "black" : "white"
                                                }} for={`flexSwitchCheckChecked-${index}`}>
                                                    {role.status === 1 ? "Active" : "In-Active"}
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>


                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <button type="button" class="btn btn-danger mail-button" onClick={() => dispatch(setShowRoleModal(false))}>Close</button>

                    </div>
                </div>

            </div>
            {/* } */}
        </React.Fragment>
    )
}

export default Rolemodal;