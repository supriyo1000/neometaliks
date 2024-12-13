
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import "../search.css";
import withAuth from '../withauth';
import Rolemodal from '../bootstrapcomp/rolemodal';
import { setShowRoleModal } from "../actions/mentorActions";
import ipAddress from '../ipconfig';

const Userstable = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [roles, setRoles] = useState([]);
    const [addrole, setAddrole] = useState(null);
    const [userid, setUserid] = useState(null);
    const [userAllRole, setUserAllRole] = useState([]);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    const [id, setId] = useState(null);
    const [clicked, setClicked] = useState(false);

    const isclicked = () => {
        return setClicked(!clicked);
    }

    const showrolemodal = useSelector((state) => state.mentor.showrolemodal);

    const dispatch = useDispatch();


    console.log("role", addrole);
    console.log("user", userid);
    console.log(userAllRole);

    async function fetchRole() {
        try {
            const response = await axios.get(`http://${ipAddress}:8000/users/fetchusers`);
            setUsers(response.data);
            console.log(users);
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    }

    async function fetchUserRoles() {
        try {
            const response = await axios.get(`http://${ipAddress}:8000/users/fetchrole`);
            const data = response.data;
            console.log(data);
            setRoles(data);
            console.log('Data received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    }

    const handleRoleChange = (event, param) => {
        const selectedRoleId = event.target.value;
        console.log('Selected Role ID:', selectedRoleId);
        if (param === "role") {
            setAddrole(selectedRoleId);
        } else if (param === "user") {
            setUserid(selectedRoleId);
        }

        // fetchPages(selectedRoleId);
    };

    async function updateStatus(userid, currentStatus) {
        try {
            const newStatus = currentStatus === 1 ? 0 : 1;

            const response = await axios.post(`http://${ipAddress}:8000/users/updateuserstatus`, {
                userId: userid, status: newStatus
            });

            // Assuming the response contains updated user data, update the users state
            const updatedUsers = users.map(user => {
                if (user.userId === userid) {
                    return { ...user, status: newStatus };
                }
                return user;
            });

            setUsers(updatedUsers);

            console.log("Status updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter((user) => {

        const email = user.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
        const role = user.roleName.toLowerCase().includes(searchQuery.toLowerCase())
        const userstatus = user.status === 0 ? "inactive" : "active";
        const status = userstatus.toLowerCase().includes(searchQuery.toLowerCase())
        return (
            email || role || status
        )
    }
    );

    async function fetchUserAllRole(id) {
        console.log(id);
        try {
            const response = await axios.get(`http://${ipAddress}:8000/users/fetchaddrole?userId=${id}`);
            console.log(response);
            setUserAllRole(response.data);
            console.log(userAllRole);
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    }

    const handleUpdate = async () => {
        if (password === "") {
            alert("Please enter a password");
        }
        else {
            setIsLoading(true);
            const response = await axios.post(`http://${ipAddress}:8000/external/update_password`, {
                userid: userId, pass: password
            })
            setIsLoading(false);
            setPassword("");
            setUserId(null);
            // dispatch(setResetPasswordModal(false));
            console.log(response);
            alert("Password updated successfully!!")
        }
    }

    async function additionalRole() {
        const date = new Date();
        console.log(date.getDay());
        try {
            if (userid === null) {
                alert("User Not Selected");
            } else if (addrole === null) {
                alert("Role Not Selected");
            } else {
                const response = await axios.post(`http://${ipAddress}:8000/users/additionalRole`, {
                    user: userid, role: addrole
                });
                console.log(response);
                if (response.status === 200) {
                    alert("Additional Role Assigned Successfully");
                    window.location.reload();
                } else if (response.status === 204) {
                    alert("Already Assigned The Role")
                }

            }

        } catch (error) {
            console.error('Error fetching role:', error);
        }
    }

console.log(userId, password);


    useEffect(() => {
        fetchRole();
        fetchUserRoles();
        // fetchUserAllRole(id);
        console.log(id);
    }, [clicked]);



    return (
        <div>
            <Navbar />
            <Sidebar />
            <main id="main" className="main" style={{ marginLeft: "240px" }}>

                {isLoading && (
                    <div className="loading-container" style={{ zIndex: "1" }}>
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                <div className='row' style={{ marginTop: "110px", justifyContent: "space-evenly", marginBottom: "150px" }}>

                    <div className='col-md-4' style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d" style={{ boxShadow: "5px 4px 7px black", border: "0", height: "100%" }}><div class="MuiBox-root css-15m7mkq"><h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi">Assign Additional Role</h4>
                            <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-dp2bsp">

                            </div>
                        </div>
                            <div class="MuiBox-root css-1iu09ww">
                                <form class="MuiBox-root css-1ircn5c" role="form">

                                    <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                        <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                        <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                        <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">

                                            <select class="form-select" aria-label="Default select example"
                                                onChange={(e) => handleRoleChange(e, "user")}>
                                                <option selected>Select User</option>
                                                {users.map((user, index) => {
                                                    return <option value={user.userId} key={user.roleId}>{user.userEmail}</option>
                                                })

                                                }
                                            </select>
                                        </div></span>
                                    </div>
                                    <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                        <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                        <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                        <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">

                                            <select class="form-select" aria-label="Default select example"
                                                onChange={(e) => handleRoleChange(e, "role")}>
                                                <option selected>Select Role</option>
                                                {roles.map((role, index) => {
                                                    return <option value={role.roleId} key={role.roleId}>{role.roleName}</option>
                                                })

                                                }
                                            </select>
                                        </div></span>
                                    </div>

                                </form>
                                <div class="MuiBox-root css-1id64jh">

                                    <button class="btn btn-drop" type="submit" style={{

                                        fontFamily: 'Poppins'
                                    }} onClick={additionalRole}>
                                        Assign
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4' style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d" style={{ boxShadow: "5px 4px 7px black", border: "0", height: "100%", width: "100%" }}><div class="MuiBox-root css-15m7mkq"><h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi">User All Roles</h4>
                            <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-dp2bsp">

                            </div>
                        </div>
                            <div class="MuiBox-root css-1iu09ww">
                                <form class="MuiBox-root css-1ircn5c" role="form">

                                    <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                        <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                        <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                        <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">

                                            <select class="form-select" aria-label="Default select example"
                                                onChange={(e) => { handleRoleChange(e, "user"); setId(e.target.value); fetchUserAllRole(e.target.value) }}>
                                                <option selected>Select User</option>
                                                {users.map((user, index) => {
                                                    return <option value={user.userId} key={user.roleId}>{user.userEmail}</option>
                                                })

                                                }
                                            </select>
                                        </div></span>
                                    </div>
                                    {/* <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                        <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                        <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                        <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">

                                            <select class="form-select" aria-label="Default select example"
                                                onChange={(e) => handleRoleChange(e, "role")}>
                                                <option selected>Select Role</option>
                                                {roles.map((role, index) => {
                                                    return <option value={role.roleId} key={role.roleId}>{role.roleName}</option>
                                                })

                                                }
                                            </select>
                                        </div></span>
                                    </div> */}

                                </form>
                                <div class="MuiBox-root css-1id64jh">

                                    <button class="btn btn-drop" type="submit" style={{

                                        fontFamily: 'Poppins'
                                    }} onClick={(e) => { isclicked(); dispatch(setShowRoleModal(true)) }}>
                                        Show
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3' style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d" style={{ boxShadow: "5px 4px 7px black", border: "0", height: "100%" }}><div class="MuiBox-root css-15m7mkq"><h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi" style={{fontSize:"1.2rem"}}>Update User's Password</h4>
                            <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-dp2bsp">

                            </div>
                        </div>
                            <div class="MuiBox-root css-1iu09ww">
                                <form class="MuiBox-root css-1ircn5c" role="form">

                                    <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                        <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                        <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                        <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">

                                            <select class="form-select" aria-label="Default select example" value={userId}
                                                onChange={(e) => setUserId(e.target.value)}>
                                                <option value={null} selected ={userId===null}>Select User</option>
                                                {users.map((user, index) => {
                                                    return <option value={user.userId} key={index}>{user.userEmail}</option>
                                                })

                                                }
                                            </select>
                                        </div></span>
                                    </div>
                                    <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                        <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                        <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                        <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">

                                            <div class="input__box">
                                                        <input type="text" placeholder="Enter New Password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>  
                                            </div>
                                        </div></span>
                                    </div>

                                </form>
                                <div class="MuiBox-root css-1id64jh">

                                    <button class="btn btn-drop" type="submit" style={{

                                        fontFamily: 'Poppins'
                                    }} onClick={handleUpdate}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showrolemodal && <Rolemodal UserAllRoles={userAllRole} />}
                
                <div>
                    {/* <label for="table-container">Users Status </label> */}
                    <div className="container" id='table-container' style={{ width: "70%", padding: "40px", position: "relative", boxShadow: "1px -1px 9px 3px #a3a3a3", background: "white" }}>
                        <div className='container-heading'>
                            <h4 for="table-container">Users Status </h4>
                        </div>
                        <div className="search-container" style={{ marginBottom: "20px" }}>
                            <div className="search">
                                <input
                                    type="text"
                                    className="searchTerm"
                                    placeholder="Search User"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <button type="submit" className="searchButton">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Email Address</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.userEmail}</td>
                                        <td>{user.firstname} {user.lastname}</td>
                                        <td>{user.roleName}</td>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id={`flexSwitchCheckChecked-${index}`}
                                                    checked={user.status === 1}
                                                    onClick={() => updateStatus(user.userId, user.status)}
                                                />
                                                <label className="form-check-label" style={{
                                                    background: user.status === 1 ? "#12d733" : "red",
                                                    padding: "5px",
                                                    borderRadius: "7px",
                                                    fontSize: "12px",
                                                    color: user.status === 1 ? "black" : "white"
                                                }} for={`flexSwitchCheckChecked-${index}`}>
                                                    {user.status === 1 ? "Active" : "In-Active"}
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default withAuth(Userstable);
