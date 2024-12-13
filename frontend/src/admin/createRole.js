import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import withAuth from '../withauth';
import ipAddress from '../ipconfig';

const CreateRole = () => {

    const [roleName, setRoleName] = useState('');
    const [selectedPages, setSelectedPages] = useState([]);
    const [selectedPages2, setSelectedPages2] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');
    const [activate, setActivate] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [selectAll, setSelectAll] = useState(false);


    const allPageValues = [
        'Allusers', 'Viewcollege', 'InputStudentpage',
        'CreateRole',
        // 'Mentor',
        'Userstable',
        'Parentallstudents',
        'Sendschedule',
        'Collegeformpage',
        'Finalapproval',
        'ScheduledInterview',
        'CsrApproval',
        'MdApproval',
        "Readyforfund",
        'IntSchledStud',
        'BudgetAllocation',
        'BudgetAproval',
        'Journey',
        'ExternalStudentList',
        'StudentsFees',
        'ShowStudentFees',
        'FeesApproval',
        'Studentresult',
        'ExternalStudentReport',
        'DisbursStudentReport',
        'FundBalanceReport',
        'Pendingfund',
        'Rejectedstu',
    ];

    // //  console.log(email, password);
    // //  console.log(fname, lname);
    // //  console.log(selectedPages);
    // //  console.log(activate);
    // //  console.log(selectAll);

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedPages((prevSelectedPages) =>
            event.target.checked
                ? [...prevSelectedPages, value]
                : prevSelectedPages.filter((page) => page !== value)
        );
    };

    const handleCheckboxChange2 = (event) => {
        const { value } = event.target;
        setSelectedPages2((prevSelectedPages) =>
            event.target.checked
                ? [...prevSelectedPages, value]
                : prevSelectedPages.filter((page) => page !== value)
        );
    };

    const handlePageSelection = (pageId) => {
        setSelectedPages((prevSelectedPages) =>
            prevSelectedPages.includes(pageId)
                ? prevSelectedPages.filter((id) => id !== pageId)
                : [...prevSelectedPages, pageId]
        );
    };

    const cancel = () => {
        setRoleName("");
        setSelectedPages([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (roleName === "" || selectedPages.length === 0) {
                alert("Please Check Role input And Selected Pages")
            } else {
                const response = await axios.post(`http://${ipAddress}:8000/users/createrole`, {
                    roleName,
                    pages: selectedPages,
                });
                // //  console.log(response);

                // Check the status code from the response
                if (response.data === 409) {
                    alert("This Role is Already Declared");
                } else if (response.status === 200) {
                    // If the role was created successfully, reset the form
                    setRoleName('');
                    setSelectedPages([]);
                    alert("Role created successfully");
                } else {
                    // Handle other status codes if needed
                    // //  console.log(response);
                }
            }

        } catch (error) {
            console.error(error);
            // Handle errors, show error message to the user, etc.
        }

        // //  console.log(roleName, selectedPages);
    };


    const passwordSubmit = async (e) => {
        e.preventDefault();

        try {
            if (email === "" || password === "" || roleId === "" || fname === "" || lname === "") {
                alert("Please Check the Mandatory Input Field ");
            }
            else if (!email.includes('@')) {
                alert("Please Correct Your Email Address");
            } else {
                const response = await axios.post(`http://${ipAddress}:8000/users/registerUser`, {
                    username: email,
                    pwd: password,
                    roleid: roleId,
                    firstname: fname,
                    lastname: lname

                });
                // //  console.log(response);

                // Check the status code from the response
                if (response.data === 409) {
                    alert("This User is Already Registered");
                } else if (response.status === 200) {
                    // If the role was created successfully, reset the form
                    setEmail('');
                    setPassword('');
                    setFname('');
                    setLname('');
                    document.getElementById('roleSelect').value = '';
                    alert("User Registered successfully");
                } else {
                    // Handle other status codes if needed
                    //  console.log(response);
                }
            }

        } catch (error) {
            console.error(error);
            // Handle errors, show error message to the user, etc.
        }

        //  console.log(email, password);
    };

    const updateRole = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://${ipAddress}:8000/users/updateUser`, {
                roleid: roleId,
                pages: selectedPages2,
                status: activate
            });
            //  console.log(response);

            // Check the status code from the response
            if (response.status === 200) {
                // If the role was created successfully, reset the form
                setRoleId('');
                setSelectedPages2([]);
                setActivate('')
                alert("Role Updated successfully");
            }
        } catch (error) {
            console.error(error);
            // Handle errors, show error message to the user, etc.
        }

        //  console.log(email, password);
    };

    async function fetchRole() {
        try {
            const response = await axios.get(`http://${ipAddress}:8000/users/fetchrole`);
            const data = response.data;
            //  console.log(data);
            setRoles(data);
            //  console.log('Data received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    }

    async function fetchPages(id) {
        try {
            const response = await axios.get(`http://${ipAddress}:8000/users/fetchpages?roleId=${id}`);
            const data = response.data;
            //  console.log(typeof (data[0].accessList));


            setSelectedPages2(data[0].accessList);
            setActivate(data[0].status)

            return data;
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    }

    const handleSelectAllChange = (e) => {
        e.target.checked ? setSelectedPages(allPageValues) : setSelectedPages([]);
        //  console.log(selectedPages);
    };

    const handleRoleChange = (event) => {
        const selectedRoleId = event.target.value;
        //  console.log('Selected Role ID:', selectedRoleId);
        setRoleId(selectedRoleId);
        fetchPages(selectedRoleId);
    };

    const operationsList = ['Collegeformpage', 'Viewcollege', 'Finalapproval', 'Allusers', "Sendschedule", 'CsrApproval', 'MdApproval', 'ScheduledInterview', 'ExternalStudentList', 'Parentallstudents','Journey'];
    
    const fundsList = ['BudgetAllocation', 'BudgetAproval', 'StudentsFees', 'ShowStudentFees', 'FeesApproval','Studentresult'];
    const assignrolesList = ['CreateRole', "Userstable"]
    const reportsList = ['Readyforfund', 'IntSchledStud', 'ExternalStudentReport',
        'DisbursStudentReport', 'FundBalanceReport', 'Pendingfund','Rejectedstu']

    const operationsNames = ["Send Notification to College", "Student's Uploaded by College", 'Final Approval for Initial Screening', 'Show Student Details', 'Schedule Interview', 'CSR Approval for Interview', 'MD Final Approval for Interview', 'Interview Scheduled Details', 'Referal Candidate Approval', 'Student Initial Screening Status', 'Student Journey'];
    
    const assignrolesNames = ['Create Role', 'Assign Additional Role']

    const fundsNames = ['Budget Allocation', 'Budget Aproval', 'Students Fees', 'Show Student Fees', 'Student Fees Approval','Student Fund Disbursment'];
    
    const reportsNames = ['Ready for Fund- Report', 'interview scheduled Details - Report',
        'Ref. Student Report', 'Fund Disbursment Report', "Fund Balance Report","Upcoming Renewal Report","Student Rejected List"]

    useEffect(() => {
        fetchRole();
    }, []);


    return (
        <div>
            <Navbar />

            <Sidebar />

            <main id="main" class="main" style={{ marginLeft: "240px", position: "relative" }}>

                <div className='adminbox'>

                    <div className='adminhead'>
                        {/* <img src='assets/img/ribbon2.png' /> */}
                        <h2 className='text'>CREATE ROLE</h2>
                    </div>
                </div>

                {/* <section class="section dashboard"> */}
                <div className='container spadmincontent'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='box'>
                                <form onSubmit={handleSubmit}>
                                    <div className='role css-15m7mkq'>
                                        <h5 style={{ color: "white", fontWeight: "bold" }}>1</h5>
                                        <h5 className='listhead' style={{ color: "white", fontWeight: "bold", marginTop: "15px" }}>CREATE A ROLE</h5>

                                        <input
                                            type="text"
                                            placeholder="role"
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)}
                                        /><br /><br />

                                    </div>
                                    <div className='style1'>
                                        <div className='listhead'>
                                            <h5>Choose Access List</h5>
                                        </div>
                                        <ul class="list-group">
                                            <li class="list-group-item ">
                                                <div class="form-check">
                                                    <input
                                                        type="checkbox" class="form-check-input"
                                                        id="selectall" checked={selectedPages.length === allPageValues.length}
                                                        onChange={handleSelectAllChange}
                                                    />
                                                    <label class="form-check-label" for="selectall" style={{ fontWeight: "500", fontSize: "14px" }}>
                                                        Select All
                                                    </label>
                                                </div>
                                            </li>

                                            <li class="nav-heading" style={{ padding: "10px 20px", fontWeight: "bold", color: "#297aab" }}>Assign Roles</li>

                                            {assignrolesList.map((list, i) => {
                                                return <li class="list-group-item ">
                                                    <div class="form-check">
                                                        <input
                                                            type="checkbox" class="form-check-input"
                                                            value={list} id={`flexCheckChecked${i}`}
                                                            checked={selectedPages.includes(list)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label class="form-check-label" for={`flexCheckChecked${i}`} style={{ fontWeight: "500", fontSize: "14px" }}>
                                                            {assignrolesNames[i]}
                                                        </label>
                                                    </div>
                                                </li>
                                            })}

                                            <li class="nav-heading" style={{ padding: "10px 20px", fontWeight: "bold", color:"#297aab" }}>Operations</li>

                                            {operationsList.map((list, i) => {
                                                return <li class="list-group-item ">
                                                    <div class="form-check">
                                                        <input
                                                            type="checkbox" class="form-check-input"
                                                            value={list} id={`flexCheckChecked${i}`}
                                                            checked={selectedPages.includes(list)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label class="form-check-label" for={`flexCheckChecked${i}`} style={{fontWeight:"500", fontSize:"14px"}}>
                                                            {operationsNames[i]}
                                                        </label>
                                                    </div>
                                                </li>
                                            })}

                                            <li class="nav-heading" style={{ padding: "10px 20px", fontWeight: "bold", color: "#297aab" }}>Funds</li>

                                            {fundsList.map((list, i) => {
                                                return <li class="list-group-item ">
                                                    <div class="form-check">
                                                        <input
                                                            type="checkbox" class="form-check-input"
                                                            value={list} id={`flexCheckChecked${i}`}
                                                            checked={selectedPages.includes(list)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label class="form-check-label" for={`flexCheckChecked${i}`} style={{ fontWeight: "500", fontSize: "14px" }}>
                                                            {fundsNames[i]}
                                                        </label>
                                                    </div>
                                                </li>
                                            })}

                                            <li class="nav-heading" style={{ padding: "10px 20px", fontWeight: "bold", color: "#297aab" }}>Reports</li>

                                            {reportsList.map((list, i) => {
                                                return <li class="list-group-item ">
                                                    <div class="form-check">
                                                        <input
                                                            type="checkbox" class="form-check-input"
                                                            value={list} id={`flexCheckChecked${i}`}
                                                            checked={selectedPages.includes(list)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label class="form-check-label" for={`flexCheckChecked${i}`} style={{ fontWeight: "500", fontSize: "14px" }}>
                                                            {reportsNames[i]}
                                                        </label>
                                                    </div>
                                                </li>
                                            })}
                                        </ul>

                                    </div>
                                    <div className='submitbutton'>
                                        <button type="submit" className='btn btn-success' >CREATE</button>
                                        <button type="button" onClick={cancel} className='btn btn-success'>CANCEL</button>
                                    </div>
                                </form>
                            </div>


                        </div>

                        <div className='col-md-4' style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d" style={{ boxShadow: "5px 4px 7px black", border: "0", height: "100%" }}><div class="MuiBox-root css-15m7mkq"><h5 style={{ color: "white", fontWeight: "bold" }}>2</h5><h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi">Create User</h4>
                                <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-dp2bsp">

                                </div>
                            </div>
                                <div class="MuiBox-root css-1iu09ww">
                                    <form class="MuiBox-root css-1ircn5c" role="form">
                                        <div class="MuiBox-root css-16pyyvj">
                                            <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-16qtvyo">
                                                
                                                <label className='rolelabel'>Email<span className='require'>*</span></label>
                                                <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-11fp4xj">

                                                    <input aria-invalid="false" id=":r13:" type="email" class="MuiInputBase-input MuiOutlinedInput-input css-1pvpzft" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                                                    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-at8z4h">
                                                        <legend class="css-yjsfm1"><span>Email</span></legend>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="MuiBox-root css-16pyyvj"><div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-16qtvyo">
                                           
                                            <label className='rolelabel'>Password<span className='require'>*</span></label>
                                            <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-11fp4xj">
                                                <input aria-invalid="false" id=":r14:" type="Enter password" class="MuiInputBase-input MuiOutlinedInput-input css-1pvpzft" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                                                <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-at8z4h">
                                                    <legend class="css-yjsfm1"><span>Password</span></legend></fieldset>
                                            </div>
                                        </div>
                                        </div>

                                        <div class="MuiBox-root css-16pyyvj"><div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-16qtvyo">
                                           
                                            <label className='rolelabel'>First Name<span className='require'>*</span></label>
                                            <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-11fp4xj">
                                                <input aria-invalid="false" id=":r15:" type="text" class="MuiInputBase-input MuiOutlinedInput-input css-1pvpzft" value={fname} onChange={(e) => setFname(e.target.value)} placeholder='First Name' />
                                                <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-at8z4h">
                                                    <legend class="css-yjsfm1"><span>First Name</span></legend></fieldset>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="MuiBox-root css-16pyyvj"><div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-16qtvyo">
                                           
                                            <label className='rolelabel'>Last Name<span className='require'>*</span></label>
                                            <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-11fp4xj">
                                                <input aria-invalid="false" id=":r16:" type="text" class="MuiInputBase-input MuiOutlinedInput-input css-1pvpzft" value={lname} onChange={(e) => setLname(e.target.value)} placeholder='Last Name' />
                                                <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-at8z4h">
                                                    <legend class="css-yjsfm1"><span>Last Name</span></legend></fieldset>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                            <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                            <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                            <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">
                                                
                                                <select id="roleSelect" class="form-select" aria-label="Default select example"
                                                    onChange={handleRoleChange} onClick={fetchRole}>
                                                    <option value='' selected>Select Role</option>
                                                    {roles.map((role, index) => {
                                                        return <option value={role.roleId} key={role.roleId}>{role.roleName}</option>
                                                    })

                                                    }
                                                </select>
                                            </div></span>
                                        </div>
                                        <div class="MuiBox-root css-1id64jh">

                                            <button class="btn btn-drop" type="submit" style={{

                                                fontFamily: 'Poppins'
                                            }} onClick={passwordSubmit}>
                                                REGISTER USER
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-4' style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d" style={{ boxShadow: "5px 4px 7px black", border: "0", height: "100%" }}><div class="MuiBox-root css-15m7mkq"><h5 style={{ color: "white", fontWeight: "bold" }}>3</h5><h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi">Modify Role</h4>
                                <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-dp2bsp">

                                </div>
                            </div>
                                <div class="MuiBox-root css-1iu09ww">
                                    <form class="MuiBox-root css-1ircn5c" role="form">

                                        <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "10px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                            <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                            <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                            <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29">

                                                <select class="form-select" aria-label="Default select example" value={roleId}
                                                    onChange={handleRoleChange} onClick={fetchRole}>
                                                    <option value={""}>Select Role</option>
                                                    {roles.map((role, index) => {
                                                        return <option value={role.roleId} key={role.roleId}>{role.roleName}</option>
                                                    })

                                                    }
                                                </select>
                                            </span>
                                            <div className='style1' style={{marginTop:"15px"}}>
                                                <ul class="list-group">

                                                    <li class="nav-heading" style={{ padding: "10px 20px", fontWeight: "bold", color: "#297aab" }}>Assign Roles</li>

                                                    {assignrolesList.map((list, i) => {
                                                        return <li class="list-group-item ">
                                                            <div class="form-check">
                                                                <input
                                                                    type="checkbox" class="form-check-input"
                                                                    value={list} id={`flexCheckChecked${assignrolesList.length + i}`}
                                                                    checked={selectedPages2.includes(list)}
                                                                    onChange={handleCheckboxChange2}
                                                                />

                                                                <label class="form-check-label" for={`flexCheckChecked${assignrolesList.length + i}`} style={{ fontWeight: "500", fontSize: "14px" }}>
                                                                    {assignrolesNames[i]}
                                                                </label>
                                                            </div>
                                                        </li>
                                                    })}

                                                    <li class="nav-heading" style={{ padding: "10px 20px", fontWeight: "bold", color: "#297aab" }}>Operations</li>

                                                    {operationsList.map((list, i) => {
                                                        return <li class="list-group-item ">
                                                            <div class="form-check">
                                                                <input
                                                                    type="checkbox" class="form-check-input"
                                                                    value={list} id={`flexCheckChecked${operationsList.length + i}`}
                                                                    checked={selectedPages2.includes(list)}
                                                                    onChange={handleCheckboxChange2}
                                                                />

                                                                <label class="form-check-label" for={`flexCheckChecked${operationsList.length + i}`} style={{ fontWeight: "500", fontSize: "14px" }}>
                                                                    {operationsNames[i]}
                                                                </label>
                                                            </div>
                                                        </li>
                                                    })}

                                                    <li class="nav-heading" style={{ padding: "10px 20px", fontWeight: "bold", color: "#297aab" }}>Funds</li>

                                                    {fundsList.map((list, i) => {
                                                        return <li class="list-group-item ">
                                                            <div class="form-check">
                                                                <input
                                                                    type="checkbox" class="form-check-input"
                                                                    value={list} id={`flexCheckChecked${fundsList.length + i}`}
                                                                    checked={selectedPages2.includes(list)}
                                                                    onChange={handleCheckboxChange2}
                                                                />

                                                                <label class="form-check-label" for={`flexCheckChecked${fundsList.length + i}`} style={{ fontWeight: "500", fontSize: "14px" }}>
                                                                    {fundsNames[i]}
                                                                </label>
                                                            </div>
                                                        </li>
                                                    })}

                                                    <li class="nav-heading" style={{ padding: "10px 20px", fontWeight: "bold", color: "#297aab" }}>Reports</li>

                                                    {reportsList.map((list, i) => {
                                                        return <li class="list-group-item ">
                                                            <div class="form-check">
                                                                <input
                                                                    type="checkbox" class="form-check-input"
                                                                    value={list} id={`flexCheckChecked${reportsList.length + i}`}
                                                                    checked={selectedPages2.includes(list)}
                                                                    onChange={handleCheckboxChange2}
                                                                />

                                                                <label class="form-check-label" for={`flexCheckChecked${reportsList.length + i}`} style={{ fontWeight: "500", fontSize: "14px" }}>
                                                                    {reportsNames[i]}
                                                                </label>
                                                            </div>
                                                        </li>
                                                    })}

                                                </ul>

                                            </div>

                                        </div>
                                        <div class="MuiBox-root css-1id64jh">


                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="flexSwitchCheckChecked15"
                                                    checked={activate === 1} // Using a ternary operator to set the checked attribute
                                                    onChange={() => setActivate(activate === 1 ? 0 : 1)} // Toggle the state value
                                                />
                                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Activate/Deactivate Role</label>
                                            </div>

                                            <button class="btn btn-drop mt-3" type="button" style={{

                                                fontFamily: 'Poppins'
                                            }} onClick={updateRole}>
                                                Update
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* </section> */}

            </main>
            {/* <!-- End #main --> */}

        </div>
    )
}

export default withAuth(CreateRole);