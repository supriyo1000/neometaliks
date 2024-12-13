import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { MDBDataTable } from 'mdbreact';
import Sidebar from '../components/sidebar';
import ipAddress from '../ipconfig';
import axios from 'axios';

const BudgetAproval = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [cmnt, setCmnt] = useState('');
    const [check, setCheck] = useState(false);
    const [budgets, setBudgets] = useState([]);

    //  console.log(budgets);
    //  console.log(cmnt);

    const getbudget = async () => {
        const response = await fetch(`http://${ipAddress}:8000/external/get_all_budget`).then(res => res.json());
        setBudgets(response);
        //  console.log(response);
    }
    function updatestate() {
        setCheck(!check);
    }

    const userid = localStorage.getItem("processNo");

    async function mdApproval(status,srno) {
        if (cmnt === '') {
            alert("Please Enter Comments")
        }
        else {
            const response = await axios.post(`http://${ipAddress}:8000/external/budget_approval`, {
                mid: userid, status: status, comment: cmnt, srno:srno
            });
            //  console.log(response);
            setCmnt("");
            if (status === 1) {
                alert("Budget Approved Successfully");
                window.location.reload();
            } else {
                alert("Budget Rejected");
                window.location.reload();
            }
        }
    }

    const data = {
        columns: [
            {
                label: 'Financial Year',
                field: 'fyear',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
            {
                label: 'Current Year Budget',
                field: 'cybudget',
                sort: 'asc',
                width: 270, // You can remove the 'width' property here
            },
            {
                label: 'Previous Year Balance',
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
        ],

        rows: budgets && budgets
            .filter(budget => budget.approval_status === 1)
            .map((budget, index) => ({
                fyear: <p style={{ fontSize: "14px", marginBottom: 0 }}>{budget.financial_year}</p>,
                cybudget: <p style={{ width: "300px", fontSize: "14px", marginBottom: 0 }}>{budget.current_year_fund}</p>,
                pybal: <p style={{ width: "100%", fontSize: "14px" }}>{budget.prev_year_balance}</p>,
                tbal: <span className="badge bg-success" style={{ color: "white" }}>{budget.total_balance}</span>,
            })),

    };

    useEffect(() => {
        getbudget();
    }, [check])

    return (
        <>
            <div>
                <Navbar />

                <Sidebar />

                <main id="main" class="main" style={{ marginLeft: "240px", position: "relative", marginTop: "80px" }}>

                    {isLoading && <div className='overlay' style={{ alignItems: "center" }}>
                        <div class="spinner-border text-success" role="status" style={{ zIndex: "2" }}>
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    <div class="pagetitle">
                        <h1>Budget Approval</h1>
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Data Table</a></li>
                                <li class="breadcrumb-item active">Budget Approval</li>
                            </ol>
                        </nav>
                    </div>

                    <div class="card" style={{ padding: "20px" }}>

                        <table class="table table-borderless datatable">
                            <thead>
                                <tr>
                                    <th scope="col">Financial Year</th>
                                    <th scope="col">Current Year Budget</th>
                                    <th scope="col">Previous Year Balance</th>
                                    <th scope="col">Total Budget</th>
                                    <th scope="col">Comment</th>
                                    <th scope="col">Reject</th>
                                    <th scope="col">Approve</th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgets && budgets.filter(budget => budget.approval_status === 0).map((budget, i) => {
                                    return <tr>
                                        <td>{budget.financial_year}</td>
                                        <td>{budget.current_year_fund}</td>
                                        <td>{budget.prev_year_balance}</td>
                                        <td>{budget.total_balance}</td>
                                        <td><input type='text' style={{ padding: "5px" }} placeholder='Enter Comment' onChange={(e) => setCmnt(e.target.value)} /></td>
                                        <td><button className='btn btn-danger mail-button' onClick={() => { mdApproval(2,budget.srno); updatestate()}}>Reject</button></td>
                                        <td><button className='btn btn-success mail-button' onClick={()=>{ mdApproval(1,budget.srno); updatestate()}}>Approve</button></td>
                                    </tr>
                                })}

                            </tbody>
                        </table>

                    </div>


                    <div className='card' style={{ padding: "20px" }}>
                        <h5 class="card-title">Approved Budget List</h5>
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

export default BudgetAproval;
