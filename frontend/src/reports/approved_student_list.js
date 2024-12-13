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

const ExternalStudentReport = () => {

    const Api = 'external/disbursed_student_report';
    const ReportName = 'Referal Report';
    const pdfHeading = ['No', 'Name', 'College', 'Application Date', 'Ref. Name'];
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
            label: 'Application Date',
            field: 'phone',
            sort: 'asc',
            width: 100, // You can remove the 'width' property here
        },
        {
            label: 'Ref. Name',
            field: 'approve',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
    ]

    const tabledata = ['name', 'college', 'application_date', 'ref_person'];

    return (
        <>
            <Report api={Api} rName={ReportName} pdfhead={pdfHeading} tablecol={tableColumn} tableData={tabledata} code={3} />
        </>
    )
}

export default ExternalStudentReport;
