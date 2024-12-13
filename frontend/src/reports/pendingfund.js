import React from 'react';
import Report from './report';

const Pendingfund = () => {

    const Api = 'interview/pending_fund_report';
    const ReportName = 'Upcoming Renewal Report';
    const pdfHeading = ['No', 'Name', 'College', 'Semester', 'Amount', 'Academic Year', 'Due Month'];
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
            label: 'Academic Year',
            field: 'intname',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
        {
            label: 'Due Month',
            field: 'month',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
    ]

    const tabledata = ['studentname', 'collegename', 'semester', 'amount', 'academic_year', 'ins_month'];

    return (
        <>
            <Report api={Api} rName={ReportName} pdfhead={pdfHeading} tablecol={tableColumn} tableData={tabledata} code={4} />
        </>
    )
}

export default Pendingfund;