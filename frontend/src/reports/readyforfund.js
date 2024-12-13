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
import withAuth from '../withauth';

const Readyforfund = () => {

    const Api = 'interview/ready_for_funds';
    const ReportName = 'Ready For Funds';
    const pdfHeading = ['No', 'Name', 'College', 'Phone', 'Status'];
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
            label: 'Phone',
            field: 'phone',
            sort: 'asc',
            width: 100, // You can remove the 'width' property here
        },
        {
            label: 'Md Approval',
            field: 'approve',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
    ]

    const tabledata = ['studentname', 'collegename', 'phone', 'Approved'];

    return (
        <>
            <Report api={Api} rName={ReportName} pdfhead={pdfHeading} tablecol={tableColumn} tableData={tabledata} code={1} />
        </>
    )
}

export default withAuth(Readyforfund)
