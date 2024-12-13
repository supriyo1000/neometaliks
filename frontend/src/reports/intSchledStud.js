import React from 'react'
import Report from './report'

const IntSchledStud = () => {

    const Api = 'interview/ready_for_interview_report';
    const ReportName = 'Scheduled Interview';
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
            label: 'Phone',
            field: 'phone',
            sort: 'asc',
            width: 270, // You can remove the 'width' property here
        },
        {
            label: 'Slot Date & Time',
            field: 'approve',
            sort: 'asc',
            width: 100, // You can remove the 'width' property here
        },
        {
            label: "Interviewer's Name",
            field: 'intname',
            sort: 'asc',
            width: 150, // You can remove the 'width' property here
        },
    ]

    const tabledata = ['studentname', 'collegename', 'phone', 'Slot_date', 'panelists'];

  return (
      <>
          <Report api={Api} rName={ReportName} pdfhead={pdfHeading} tablecol={tableColumn} tableData={tabledata} code={2} />
      </>
  )
}

export default IntSchledStud