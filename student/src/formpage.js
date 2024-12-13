import React, { useState, useEffect } from 'react'
import Form from './form'
import "./App.css";
import { useParams } from 'react-router-dom'

const Formpage = () => {

  // const [srno, setSrno] = useState(null);

  const { encodedId } = useParams();
  console.log("id", encodedId);
  const decodedValue = decodeURIComponent(encodedId);


  console.log("decodedvalue", decodedValue);

  const match = decodedValue.match(/\[(\d+)\]/);

  if (match) {
    const extractedNumber = match[1]; // This will give you the number inside the brackets
    const encodedNumber = encodeURIComponent(extractedNumber);
    console.log(encodedNumber);
    localStorage.setItem("studentid", encodedNumber);

  }

  return (
    <>
      <div className='container' style={{ marginTop: "90px", boxShadow: "2px -2px 20px 13px #a9b9bf" }}>
        <div>
          <img src="assets/img/neologo.jpg" alt="" style={{ width: "20%", maxHeight: "none", margin: "26px 68px" }} />
        </div>
        <Form />
        <div className='mt-5 container'>
          <img src='qlogo.jpg' alt='qlogo' style={{ width: "106px" }} />
          <p>Developed And Maintained By <strong>Quobotic Consulting Private Limited</strong></p>
        </div>
      </div>
    </>
  )
}

export default Formpage