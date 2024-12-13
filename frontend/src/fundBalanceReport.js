import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import ipAddress from './ipconfig';
import jsPDF from "jspdf";
import withAuth from './withauth';

const FundBalanceReport = () => {
    const [fund, setFund] = useState(null);
    const [total, setTotal] = useState(null);

    console.log(fund);

    async function fundBalance() {
        const response = await fetch(`http://${ipAddress}:8000/external/get_fund_balance_report`).then(res => res.json());
        setFund(response);
        console.log(response);
    }

    function currentFinancialYear() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

        let currentYear;

        // If the current month is before April, consider the previous year
        if (currentMonth < 4) {
            currentYear = currentDate.getFullYear() - 1;
        } else {
            currentYear = currentDate.getFullYear();
        }

        const endYear = currentYear + 1;
        return `${currentYear}-${endYear}`;
    }

    // function generatePdf(totalBudget, totalAmount, currentbalance) {
    //     const doc = new jsPDF();

    //     const logo = new Image();
    //     logo.src = 'assets/img/neologo.jpg'; // Replace with the path to your logo image

    //     // Add the logo image to the PDF
    //     doc.addImage(logo, 'JPEG', 10, 5, 60, 20);

    //     // Add the heading
    //     doc.setFontSize(16);
    //     const headingText = `Statement For Funds - ${currentFinancialYear()}`;
    //     doc.text(headingText, 75, 40); // Replace 'Your Heading' with your actual heading text

    //     doc.setLineWidth(0.5);
    //     doc.line(75, 45, 120);

    //     // Add the date
    //     const currentDate = new Date().toLocaleDateString('en-GB');
    //     doc.setFontSize(12);
    //     doc.text('Date: ' + currentDate, 160, 20);


    //     doc.setFontSize(14);
    //     doc.text('Total Budget Allocated : ' + totalBudget, 20, 80);

    //     doc.setFontSize(14);
    //     doc.text('Total Fund Disbursed : ' + totalAmount, 20, 100);

    //     doc.setFontSize(14);
    //     doc.text('Current Balance : ' + currentbalance, 20, 120);

    //     doc.save(`FundBalance.pdf`);
    // }

    function generatePdf(totalBudget, totalAmount, currentbalance) {
        const doc = new jsPDF();

        const logo = new Image();
        logo.src = 'assets/img/neologo.jpg'; // Replace with the path to your logo image

        // Add the logo image to the PDF
        doc.addImage(logo, 'JPEG', 10, 5, 60, 20);

        // Add the heading with underline
        doc.setFontSize(16);
        const headingText = `Statement For Funds - ${currentFinancialYear()}`;
        const textWidth = doc.getStringUnitWidth(headingText) * doc.internal.getFontSize();
        doc.text(headingText, 75, 40);

        // Add underline
        doc.setLineWidth(0.5);
        doc.line(75, 45, 162, 45);

        // Add the date
        const currentDate = new Date().toLocaleDateString('en-GB');
        doc.setFontSize(12);
        doc.text('Date: ' + currentDate, 160, 20);

        doc.setFontSize(14);
        doc.text('Total Budget Allocated : ' + totalBudget, 20, 80);

        doc.setFontSize(14);
        doc.text('Total Fund Disbursed   : ' + totalAmount, 20, 100);

        doc.setFontSize(14);
        doc.text('Current Balance           : ' + currentbalance, 20, 120);

        doc.save(`FundBalance.pdf`);
    }


    useEffect(() => {
        fundBalance();
    }, [])

    useEffect(() => {
        if (fund !==null ) {
           setTotal( parseFloat(fund.total_balance) - parseFloat(fund.total_amount))
        }
    },[fund])

    return (
        <>
            <Navbar />

            <Sidebar />


            <main id="main" class="main" style={{ marginLeft: "240px", marginTop: '80px' }}>

                <div class="pagetitle">
                    <h1>Statement For Fund</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li class="breadcrumb-item active">Fund Balance</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}

                <section class="section dashboard">
                    <div class="row">

                        <div class="col-lg-12">
                            <div class="row">

                                <div class="col-xxl-4 col-md-4">
                                    <div class="card info-card revenue-card">

                                        <div class="card-body">
                                            <h5 class="card-title">Total Fund</h5>

                                            <div class="d-flex align-items-center">

                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-currency-rupee"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>{fund !== null? fund.total_balance : 0}</h6>

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="col-xxl-4 col-md-4">
                                    <div class="card info-card revenue-card">

                                        <div class="card-body">
                                            <h5 class="card-title">Fund Disbursed</h5>

                                            <div class="d-flex align-items-center">

                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-currency-rupee"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>{fund !== null ?fund.total_amount : 0}</h6>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xxl-4 col-md-4">
                                    <div class="card info-card revenue-card">

                                        <div class="card-body">
                                            <h5 class="card-title">Download PDF</h5>

                                            <div class="d-flex align-items-center">

                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-file-pdf"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <button className='btn btn-primary mail-button' onClick={() => generatePdf(fund.total_balance, fund.total_amount, total)}>Download</button>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="col-xxl-4 col-md-8">
                                    <div class="card info-card revenue-card">

                                        <div class="card-body">
                                            <h5 class="card-title">Current Balance(Till Date)</h5>

                                            <div class="d-flex align-items-center">

                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-currency-rupee"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>{fund!== null? total : 0}</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </section>

            </main>
            {/* <!-- End #main --> */}

            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer" class="footer">
                <div class="copyright">
                    &copy; Copyright <strong><span>Quobotic Consulting Private Limited</span></strong>. All Rights Reserved
                </div>
            </footer>
            {/* <!-- End Footer --> */}

        </>
    )
}

export default withAuth(FundBalanceReport);