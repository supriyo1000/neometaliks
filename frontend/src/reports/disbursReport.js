import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import ipAddress from '../ipconfig';
import "../index.css";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import FundsModal from '../bootstrapcomp/fundsModal';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCsrMdComment, setShowFundModal } from '../actions/interviewtime';
import CommentsModal from '../bootstrapcomp/commentsModal';
import { generatePDF } from '../pdf/pdf';
import Report from './report';

const DisbursStudentReport = () => {

    const Api = 'external/approved_referal_student';
    const ReportName = 'Fund Disbursment Report';
    const pdfHeading = ['No', 'Name', 'College', 'Semester', 'Amount', 'UTR No', 'Month'];
    const tableColumn = [
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
        {
            label: 'College',
            field: 'college',
            sort: 'asc',
            width: 270, // You can remove the 'width' property here
        },
        {
            label: 'Semester',
            field: 'phone',
            sort: 'asc',
            width: 100, // You can remove the 'width' property here
        },
        {
            label: 'Amount',
            field: 'approve',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
        {
            label: 'UTR No',
            field: 'intname',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
        {
            label: 'Month',
            field: 'month',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
    ]

    const tabledata = ['studentname', 'collegename', 'semester', 'amount', 'utr_no', 'ins_month'];

    return (
        <>
            <Report api={Api} rName={ReportName} pdfhead={pdfHeading} tablecol={tableColumn} tableData={tabledata} code={4} />
        </>
    )
}

export default DisbursStudentReport;
