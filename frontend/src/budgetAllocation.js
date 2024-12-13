import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import ipAddress from './ipconfig';

const BudgetAllocation = () => {

    const [year, setYear] = useState('');
    const [notification, setNotification] = useState([]);
    const [cyfund, setCyfund] = useState(0);
    const [pbal, setPbal] = useState(0);
    const [tbal, setTbal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [emailfile, setEmailfile] = useState(null);
    const [budgets, setBudgets] = useState([]);
    const [fyearEdit, setFyearEdit] = useState(false);
    const [cyfundEdit, setCyfundEdit] = useState(false);
    const [pbalEdit, setPbalEdit] = useState(false);
    const [tbalEdit, setTbalEdit] = useState(false);
    const [downloadEdit, setDownloadEdit] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [check, setCheck] = useState(false);


    console.log("year", year);
    console.log("tbal", tbal);
    console.log("cyfund,pbal", cyfund, pbal);
    console.log("email", emailfile);

    function totalbalance(cy, py) {
        const cfund = cy === "" ? 0 : parseFloat(cy);
        const fbalance = py === "" ? 0 : parseFloat(py);
        setTbal(cfund + fbalance);
    }

    function checking() {
        setCheck(!check);
    }

    const handleRoleChange = (event) => {
        const selectedyear = event.target.value;
        console.log('Selected Year:', selectedyear);
        setYear(selectedyear);
    };

    function generateFinancialYearOptions() {
        const currentYear = new Date().getFullYear();
        const options = [];

        for (let i = -1; i < 12; i++) {
            const startYear = currentYear + i;
            const endYear = startYear + 1;
            const optionText = `${startYear}-${endYear}`;
            options.push(<option key={i} value={optionText}>{optionText}</option>);
        }

        return options;
    }

    const getbudget = async () => {
        const response = await fetch(`http://${ipAddress}:8000/external/get_all_budget`).then(res => res.json());
        setBudgets(response);
        console.log(response);
    }

    const userid = localStorage.getItem("processNo");

    const formData = new FormData();
    formData.append("photo", emailfile);

    async function handesubmit() {
        const confirmSubmit = window.confirm("Do you want to submit?");

        if (confirmSubmit) {
            if (year === '') {
                alert("Please Select Financial Year")
            } else if (cyfund === 0 || cyfund === "") {
                alert("Current year Budget Cannot be Empty !!")
            }
            else if (emailfile === null) {
                alert("Please Upload Budget Approval Document !!")
            } else {
                setIsLoading(true);

                const cheakYear = await fetch(`http://${ipAddress}:8000/external/check_budget?fyear=${year}`).then(res => res.json());

                console.log(cheakYear.yearcount);

                if (cheakYear.yearcount === 0) {
                    const response = await axios.post(`http://${ipAddress}:8000/external/budget_allocation`, {
                        fyear: year, cyear: cyfund, pyear: pbal, total: tbal, appid: userid
                    })
                    const response1 = await fetch(`http://${ipAddress}:8000/external/get_serial?year=${year}`).then(res => res.json());

                    const response2 = await axios.post(`http://${ipAddress}:8000/profilephoto/uploadEmailFile?userid=${response1.srno}`, formData
                    )
                    console.log(response1);
                    setYear('');
                    setCyfund(0);
                    // setPbal(0);
                    // setTbal(0);
                    alert("Budget Allocation Successful\n!! Wait for Approval !!");
                    setPbal(0);
                    setTbal(0);
                    checking();
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    alert("Budget Already Allocated!!")
                }

                
            }
        }
    }

    async function handeUpdate(srno) {
        const confirmSubmit = window.confirm("Do you want to submit?");

        if (confirmSubmit) {
            if (year === '') {
                alert("Please Select Financial Year")
            }
            else if (cyfund === 0) {
                alert("Current Year Balance cannot Be Empty")
            }
            else if (pbal === "") {
                alert("Previous Year Balance cannot Be Empty")
            }
            // else if (emailfile === null || emailfile === "") {
            //     alert("Please Select a File in Update Field Or cancel Update")
            // }
            else {
                setIsLoading(true);
                const response = await axios.post(`http://${ipAddress}:8000/external/update_budget_approval`, {
                    fyear: year, cyear: cyfund, pyear: pbal, total: tbal, srno: srno
                })

                if (downloadEdit) {
                    const response2 = await axios.post(`http://${ipAddress}:8000/profilephoto/updateEmailFile?userid=${srno}`, formData
                    )
                }
                console.log(response);
                setYear('');
                setCyfund(0);
                // setPbal(0);
                // setTbal(0);
                alert("Budget Allocation Successful\n!! Wait for Approval !!");
                setPbal(0);
                setTbal(0);
                setIsLoading(false);
                window.location.reload();
            }
        }
    }

    async function getFundApproval() {
        const response = await fetch(`http://${ipAddress}:8000/interview/get_csr_approval`).then(res => res.json());
        setNotification(response);
        console.log(response);
    }

    async function getimage(imgname) {
        try {
            // Send a request to the server to download the image
            const response = await fetch(`http://${ipAddress}:8000/download-image?imageId=${imgname}`);

            if (response.ok) {
                // If the response status is OK (HTTP 200), proceed to download the image

                // Get the image data as a blob
                const blob = await response.blob();

                // Create a blob URL from the blob data
                const url = URL.createObjectURL(blob);

                // Create a temporary anchor element to trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.download = imgname; // Set the desired file name
                link.style.display = 'none';

                // Append the anchor element to the document and trigger the download
                document.body.appendChild(link);
                link.click();

                // Clean up by removing the anchor element
                document.body.removeChild(link);

            } else {
                // Handle non-successful responses (e.g., display an error message)
                console.error(`Failed to download image: HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(`Error while downloading image: ${error}`);
        }
    }


    // async function getimage(imgname) {
    //     try {
    //         const response = await fetch(`http://${ipAddress}:8000/download-image?imageId=${imgname}`);

    //         if (response.ok) {
    //             const blob = await response.blob();
    //             const url = URL.createObjectURL(blob);

    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.download = imgname;
    //             link.style.display = 'none';

    //             document.body.appendChild(link);
    //             link.click();

    //             document.body.removeChild(link);
    //         } else {
    //             console.error(`Failed to download image: HTTP ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.error(`Error while downloading image: ${error}`);
    //     }
    // }


    const data = {
        columns: [
            {
                label: 'Financial Year',
                field: 'fyear',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
            {
                label: 'Current Budget',
                field: 'cybudget',
                sort: 'asc',
                width: 270, // You can remove the 'width' property here
            },
            {
                label: 'Previous Balance',
                field: 'pybal',
                sort: 'asc',
                width: 100, // You can remove the 'width' property here
            },
            {
                label: 'Total Budget',
                field: 'tbal',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
            {
                label: 'Download Report',
                field: 'download',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
            {
                label: 'Re-Submit',
                field: 'submit',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
        ],

        rows: budgets && budgets.map((budget, index) => ({
            // fyear: <p style={{ fontSize: "14px", marginBottom: 0 }}>{budget.financial_year}<i class="bi bi-pen-fill"></i></p>,
            fyear: <div class="input__box" style={{ width: "12vw", display: "flex" }}>
                {fyearEdit && editingRow === index ? (

                    // <input
                    //     type="number"
                    //     value={year}
                    //     // placeholder="eg. 2023-2024"
                    //     style={{ width: "70%" }}
                    //     required
                    //     onChange={(e) => {
                    //         setYear(e.target.value);
                    //     }}
                    // />
                    <select class="form-select" value={year} style={{ width: "70%", height: "fit-content", fontSize: "14px" }}
                        onChange={handleRoleChange} aria-label="Default select example">
                        <option value={''} selected>Select Year</option>
                        {generateFinancialYearOptions()}
                    </select>
                ) : (
                    budget.financial_year
                )}

                <span class="text-primary" style={{ marginLeft: "20px" }}>
                    {budget.approval_status === 2 && (
                        fyearEdit && editingRow === index ? (
                            <i
                                class="bi bi-x-circle-fill"
                                onClick={() => {
                                    setFyearEdit(false);
                                    setYear(budget.financial_year);
                                }} // Toggle the editing state
                            ></i>
                        ) : (
                            <i
                                class="bi bi-pen-fill"
                                onClick={() => {

                                    setFyearEdit(true);
                                    setYear(budget.financial_year)
                                    setCyfund(budget.current_year_fund)
                                    setPbal(budget.prev_year_balance)
                                    setEmailfile(budget.emailFile);
                                    setEditingRow(index);
                                }}
                            ></i>
                        ))}
                </span>

            </div>,

            cybudget:
                // <p style={{ fontSize: "14px", marginBottom: 0 }}>{budget.current_year_fund}</p>,
                <div class="input__box" style={{ width: "12vw" }}>
                    {cyfundEdit && editingRow === index ? (
                        <input
                            type="number"
                            value={cyfund}
                            // placeholder="eg. 2023-2024"
                            style={{ width: "70%", height: "fit-content" }}
                            required
                            onChange={(e) => {
                                setCyfund(e.target.value);
                                totalbalance(cyfund, pbal)
                            }}
                        />
                    ) : (
                        budget.current_year_fund
                    )}

                    <span class="text-primary" style={{ marginLeft: "20px" }}>
                        {budget.approval_status === 2 && (
                            cyfundEdit && editingRow === index ? (
                                <i
                                    class="bi bi-x-circle-fill"
                                    onClick={(e) => {
                                        setCyfundEdit(false);
                                        setCyfund(budget.current_year_fund);
                                    }} // Toggle the editing state
                                ></i>
                            ) : (
                                <i
                                    class="bi bi-pen-fill"
                                    onClick={() => {

                                        setCyfundEdit(true);
                                        setCyfund(budget.current_year_fund)
                                        setPbal(budget.prev_year_balance)
                                        setYear(budget.financial_year);
                                        setEmailfile(budget.emailFile);
                                        setEditingRow(index);
                                    }}
                                ></i>
                            ))}
                    </span>

                </div>,
            pybal:
                // <p style={{ width: "100%", fontSize: "14px" }}>{budget.prev_year_balance}</p>,
                <div class="input__box" style={{ width: "12vw" }}>
                    {pbalEdit && editingRow === index ? (
                        <input
                            type="number"
                            value={pbal}
                            // placeholder="eg. 2023-2024"
                            style={{ width: "70%", height: "fit-content" }}
                            required
                            onChange={(e) => {
                                setPbal(e.target.value);
                                totalbalance(cyfund, pbal)
                            }}
                        />
                    ) : (
                        budget.prev_year_balance
                    )}

                    <span class="text-primary" style={{ marginLeft: "20px" }}>
                        {budget.approval_status === 2 && (
                            pbalEdit && editingRow === index ? (
                                <i
                                    class="bi bi-x-circle-fill"
                                    onClick={() => {
                                        setPbalEdit(false);
                                        setPbal(budget.prev_year_balance);
                                    }} // Toggle the editing state
                                ></i>
                            ) : (
                                <i
                                    class="bi bi-pen-fill"
                                    onClick={() => {

                                        setPbalEdit(true);
                                        setPbal(budget.prev_year_balance)
                                        setCyfund(budget.current_year_fund)
                                        setYear(budget.financial_year);
                                        setEmailfile(budget.emailFile);
                                        setEditingRow(index);
                                    }}
                                ></i>
                            ))}
                    </span>

                </div>,
            tbal:
                // <span class="badge bg-success" style={{ color: "white" }}>{budget.total_balance}
                // </span>,
                <div class="input__box">
                    {editingRow === index && (cyfundEdit || pbalEdit) ? (
                        <span class="badge bg-success" style={{ color: "white" }}>{tbal}
                        </span>
                    ) : (
                        budget.total_balance
                    )
                    }

                </div>,
            download:
                // <button className='btn btn-warning mail-button' onClick={(e) => {
                // e.preventDefault();
                // getimage(budget.emailFile);
                // }}>Download</button>,
                <div class="input__box" style={{ width: "12vw" }}>
                    {downloadEdit && editingRow === index ? (
                        <input
                            type="file"
                            style={{ width: "70%", fontSize: "10px", height: "fit-content", paddingLeft: "0" }}
                            required
                            onChange={(e) => setEmailfile(e.target.files[0])}
                        />
                    ) : (
                        <button className='btn btn-warning mail-button' onClick={(e) => {
                            e.preventDefault();
                            getimage(budget.emailFile);
                        }}>Download</button>
                    )}

                    <span className="text-primary" style={{ marginLeft: "20px" }}>
                        {budget.approval_status === 2 && (
                            downloadEdit && editingRow === index ? (
                                <i
                                    className="bi bi-x-circle-fill"
                                    onClick={() => {
                                        setDownloadEdit(false);
                                        setEmailfile(budget.emailFile);
                                    }} // Toggle the editing state
                                ></i>
                            ) : (
                                <i
                                    className="bi bi-pen-fill"
                                    onClick={() => {
                                        setDownloadEdit(true);
                                        setEmailfile(budget.emailFile)
                                        setEditingRow(index);
                                        setYear(budget.financial_year)
                                        setPbal(budget.prev_year_balance)
                                        setCyfund(budget.current_year_fund)
                                    }}
                                ></i>
                            )
                        )}
                    </span>


                </div>,
            status: <button className={budget.approval_status === 0 ? 'btn btn-info mail-button' : budget.approval_status === 1 ? 'btn btn-primary mail-button' : 'btn btn-danger mail-button'}>{budget.approval_status === 0 ? "Pending" : budget.approval_status === 1 ? "Success" : "Rejected"}</button>,
            submit: <button className='btn btn-success mail-button' disabled={budget.approval_status !== 2} onClick={() => handeUpdate(budget.srno)}>Submit</button>,
        })),
    };

    useEffect(() => {
        getFundApproval();
        getbudget();
        if (editingRow !== null) {
            setFyearEdit(false);
            setCyfundEdit(false);
            setPbalEdit(false);
            setTbalEdit(false);
            setDownloadEdit(false);
        }
    }, [check])

    useEffect(() => {
        totalbalance(cyfund, pbal)
    }, [cyfund, pbal])

    return (
        <>
            <div>
                <Navbar />

                <Sidebar />

                <main id="main" class="main" style={{ marginLeft: "240px" }}>

                    {isLoading && <div className='overlay' style={{ alignItems: "center" }}>
                        <div class="spinner-border text-success" role="status" style={{ zIndex: "2" }}>
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>}

                    <div class="container" style={{ width: "70%", padding: "40px", marginTop: "80px", boxShadow: "1px -1px 9px 3px #a3a3a3" }}>
                        <div className='row line'>
                            <div className='col-md-6' style={{ alignSelf: "center" }}>
                                <div class="title">Budget Allocation</div>
                            </div>
                            <div className='col-md-6' style={{ alignSelf: "center" }}>
                                <h4>Upload Documents<span style={{ color: "red" }}>&nbsp;*</span></h4>
                                <input type='file' onChange={(e) => setEmailfile(e.target.files[0])} />
                            </div>
                        </div>

                        <form action="#" style={{ marginTop: "50px" }}>
                            <div class="user__details">
                                <div className='row' style={{
                                    width: "100%",
                                    background: "white"
                                }}>
                                    <div className='col-md-6 m-col'>

                                        <div class="input__box">
                                            <span class="details">Select Financial Year<span style={{ color: "red" }}>&nbsp;&nbsp;*</span></span>
                                            <select class="form-select" value={year}
                                                onChange={handleRoleChange} aria-label="Default select example">
                                                <option value={''} selected>Select Year</option>
                                                {generateFinancialYearOptions()}
                                            </select>
                                        </div>
                                        <div class="input__box">
                                            <span class="details">Total Fund Balance</span>

                                            <p>{tbal}</p>

                                        </div>


                                    </div>
                                    <div className='col-md-6 m-col' style={{ background: "white" }}>

                                        <div class="input__box">
                                            <span class="details">Current year Budget<span style={{ color: "red" }}>&nbsp;&nbsp;*</span></span>
                                            <input
                                                type="number"
                                                placeholder="eg 10000"
                                                required
                                                value={cyfund}
                                                onChange={(e) => {
                                                    setCyfund(e.target.value);
                                                    totalbalance(e.target.value, pbal)
                                                }}
                                            />
                                        </div>
                                        <div class="input__box">
                                            <span class="details">Previous Year Balance</span>

                                            <input
                                                type="number"
                                                placeholder="eg 10000"
                                                required
                                                value={pbal}
                                                onChange={(e) => {
                                                    setPbal(e.target.value);
                                                    totalbalance(cyfund, e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button className='btn btn-primary' disabled={isLoading} style={{ border: "2px solid #6a4b4b" }} onClick={handesubmit}>Submit</button>
                        </div>

                    </div>

                    <div className='card' style={{ marginTop: "5rem", padding: "2em" }}>
                        <MDBDataTable
                            striped
                            bordered
                            small
                            data={data}
                            noBottomColumns
                        />
                    </div>

                </main >
            </div>
        </>
    )
}

export default BudgetAllocation;
