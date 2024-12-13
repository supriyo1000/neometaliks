import React from 'react';
import Report from './report';

const Dataduestudent = () => {
    const Api = 'students_due_for_data_upload';
    const ReportName = 'Data Pending For Upload';
    const pdfHeading = ['No', 'Name', 'College', 'Approval Date', 'Status'];
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
            label: 'Approval Date',
            field: 'phone',
            sort: 'asc',
            width: 100, // You can remove the 'width' property here
        },
        {
            label: 'Status',
            field: 'approve',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
    ]

    const tabledata = ['studentname', 'collegename', 'final_approval_date', 'Due'];

    return (
        <>
            <Report api={Api} rName={ReportName} pdfhead={pdfHeading} tablecol={tableColumn} tableData={tabledata} code={1} btn={1}/>
        </>
    )
}

export default Dataduestudent