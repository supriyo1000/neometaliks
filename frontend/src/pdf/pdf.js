import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { showtime } from "./showInterviewtime";
import { capitalName } from "../components/capitalName";

// function showtime(time_string) {
//     const time = parseInt(time_string, 10);
//     if (time === 0) {
//         return 'Not Selected'
//     }
//     else if (time === 1) {
//         return '10 am - 11 am'
//     }
//     else if (time === 2) {
//         return '11 am - 12 pm'
//     }
//     else if (time === 3) {
//         return '12 pm - 1 pm'
//     }
//     else if (time === 4) {
//         return '1 pm - 2 pm'
//     }
//     else if (time === 5) {
//         return '3 pm - 4 pm'
//     }
//     else if (time === 6) {
//         return '4 pm - 5 pm'
//     }
// }



export const generatePDF = (heading, tabledata, fromDate, toDate, getdata, name, codeNo, btndate) => {
    const doc = new jsPDF();

    function getFormattedMonthFromDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric' };
        const formattedMonth = date.toLocaleString('en-US', options);
        return formattedMonth;
    }

    console.log(tabledata);
    console.log(heading, fromDate, toDate);

    // Add the logo image
    const logo = new Image();
    logo.src = 'assets/img/neologo.jpg'; // Replace with the path to your logo image

    // Add the logo image to the PDF
    doc.addImage(logo, 'JPEG', 10, 5, 60, 20);

    // Add the heading
    doc.setFontSize(16);
    doc.text(`Students ${name}`, 75, 40); // Replace 'Your Heading' with your actual heading text

    // Add the date
    const currentDate = new Date().toLocaleDateString('en-GB');
    doc.setFontSize(12);
    doc.text('Date: ' + currentDate, 160, 20);
    // doc.text(currentDate, 180, 40);

    function getFormattedDate(inputDate) {
        const dateParts = inputDate.split('-'); // Split the date string into parts
        const day = dateParts[2].padStart(2, '0'); // Ensure the day has two digits
        const month = dateParts[1].padStart(2, '0'); // Ensure the month has two digits
        const year = dateParts[0];

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    // from date
    doc.setFontSize(12);
    doc.text(`From Date: ${fromDate === '2000-1-1' ? "All" : getFormattedDate(fromDate)}`, 14, 40);

    doc.setFontSize(12);
    doc.text(`To Date: ${toDate === '2000-1-1' ? "All" : getFormattedDate(toDate)}`, 14, 50);


    const tableTheme = {
        tableHead: {
            fillColor: [1, 0, 79], // Adjust the RGB color values for the background color
        },
    };
    // Create an array with your table data
    const tableData = [];
    tabledata.forEach((elm, i) => {
        const lastColumnData = codeNo === 1 ? null : codeNo === 3 ? null : codeNo === 4 ? elm[getdata[4]] : codeNo === 5 ? elm[getdata[4]] : elm[getdata[4]].map((nm, index) => `${nm.firstname} ${nm.lastname}`).join('\n');
        const showTimeData = codeNo === 1 ? getdata[3] : codeNo === 3 ? elm[getdata[3]] : codeNo === 4 ? elm[getdata[3]] : new Date(elm[getdata[3]]).toLocaleDateString();
        const slotShowTime = codeNo === 1 ? showTimeData : codeNo === 3 ? showTimeData : codeNo === 4 ? showTimeData : codeNo === 5 ? showTimeData : showTimeData + '\n' + showtime(elm.slot_id); // Assuming showtime() returns a string
        tableData.push([i + 1, capitalName(elm[getdata[0]]), elm[getdata[1]], codeNo === 3 ? new Date(elm[getdata[2]]).toLocaleDateString() : btndate === 1 ? new Date(elm[getdata[2]]).toLocaleDateString() : elm[getdata[2]], slotShowTime, lastColumnData, getFormattedMonthFromDate(elm[getdata[5]])])
    })

    // Generate the table in the PDF
    doc.autoTable({
        startY: 60, // Adjust the Y position as needed
        head: [heading],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [153, 153, 153], // Adjust the RGB color values for the background color
            fontStyle: 'bold', // Bold text for the header
            // halign: 'center', // Center align text
            textColor: [255, 255, 255], // Text color for the header
        },
        bodyStyles: {
            columnStyles: {
                5: { fillColor: [255, 0, 0] }, // Adjust the RGB color values for the background color
            },
        },
    });

    // Save or display the PDF
    doc.save(`${name}.pdf`); // Change the filename as needed
};