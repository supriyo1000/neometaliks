import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
});

const PDFDocument = ({ student, image }) => {
    return (
        <PDFViewer width="100%" height={800}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Image:</Text>
                        {/* <Image src={image} style={styles.image} /> Add the Image component */}
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Student Information:</Text>
                        <Text style={[styles.text, styles.bold]}>Name: {student.StudentName}</Text>
                        <Text style={styles.text}>Address: {student.address}</Text>
                        <Text style={styles.text}>Pincode: {student.pincode}</Text>
                        <Text style={styles.text}>Phone: {student.StudentPhone}</Text>
                        <Text style={styles.text}>Email: {student.StudentEmail}</Text>
                        <Text style={styles.text}>Post Office: {student.postoffice}</Text>
                        <Text style={styles.text}>Police Station: {student.policestation}</Text>
                        <Text style={styles.text}>Municipality: {student.municipality}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Parents Details:</Text>
                        <Text style={styles.bold}>Father's Details:</Text>
                        <Text style={styles.text}>Father's Name: {student.fatherName}</Text>
                        <Text style={styles.text}>Father's Occupation: {student.fatheroccupation}</Text>
                        <Text style={styles.text}>Annual Income: {student.fatherIncome}</Text>
                        <Text style={styles.text}>Office Phone No: {student.fatherPhone}</Text>
                        <Text style={styles.text}>Office Address: {student.fatherOaddress}</Text>
                        <Text style={styles.bold}>Mother's Details:</Text>
                        <Text style={styles.text}>Mother's Name: {student.motherName}</Text>
                        <Text style={styles.text}>Mother's Occupation: {student.motherOccupation}</Text>
                        <Text style={styles.text}>Annual Income: {student.motherIncome}</Text>
                        <Text style={styles.text}>Office Phone No: {student.motherPhone}</Text>
                        <Text style={styles.text}>Office Address: {student.motherOaddress}</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PDFDocument;
