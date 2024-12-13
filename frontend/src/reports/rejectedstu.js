import React from 'react';
import Report from './report';

const Rejectedstu = () => {
    const Api = 'interview/interview_rejected_student_report';
    const ReportName = 'Rejected List';
    const pdfHeading = ['No', 'Name', 'College', 'Slot Date', 'Slot Time', "Interviewer's Name"];
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
            label: 'Total Marks',
            field: 'phone',
            sort: 'asc',
            width: 270, // You can remove the 'width' property here
        },
        {
            label: 'Interview Date',
            field: 'approve',
            sort: 'asc',
            width: 100, // You can remove the 'width' property here
        },
        {
            label: "Comments",
            field: 'intname',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
    ]

    const tabledata = ['studentname', 'collegename', 'total', 'int_Date', 'comments'];

    return (
        <>
            <Report api={Api} rName={ReportName} pdfhead={pdfHeading} tablecol={tableColumn} tableData={tabledata} code={5} />
        </>
    )
}

export default Rejectedstu