import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Form = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const inputRef = useRef([]);
    const inputRef1 = useRef([]);

    const [isVisible, setIsVisible] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);
    const [isVisible5, setIsVisible5] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [fname, setFname] = useState("");
    const [fo, setFo] = useState("");
    const [fai, setFai] = useState("");
    const [foph, setFoph] = useState("");
    const [foa, setFoa] = useState("");
    const [add, setAdd] = useState("");
    const [po, setPo] = useState("");
    const [pin, setPin] = useState("");
    const [ps, setPs] = useState("");
    const [mun, setMun] = useState("");
    const [ph, setPh] = useState("");
    const [aph, setAph] = useState(0);
    const [ei, setEi] = useState("");
    const [mn, setMn] = useState("");
    const [mo, setMo] = useState("");
    const [mai, setMai] = useState("");
    const [moph, setMoph] = useState("");
    const [moa, setMoa] = useState("");
    const [nos, setNos] = useState("");
    const [nob, setNob] = useState("");
    const [nom, setNom] = useState("");
    const [nos2, setNos2] = useState("");
    const [nob2, setNob2] = useState("");
    const [mo2, setMo2] = useState("");
    const [cof, setCof] = useState("");
    const [noc, setNoc] = useState("");
    const [attclg, setAttclg] = useState("");
    const [ros, setRos] = useState("");
    const [clng, setClng] = useState("");
    const [str, setStr] = useState("");
    const [ces, setCes] = useState("");
    const [sb, setSb] = useState("");
    const [aos, setAos] = useState("");
    const [oia, setOia] = useState("");
    const [fut, setFut] = useState("");
    const [psp, setPsp] = useState(null);
    const [pap, setPap] = useState(null);
    const [fip, setFip] = useState(null);
    const [mip, setMip] = useState(null);
    const [pop, setPop] = useState(null);
    const [fbs, setFbs] = useState(null);
    const [mbs, setMbs] = useState(null);
    const [sbs, setSbs] = useState(null);
    const [adh, setAdh] = useState(null);
    const [msp, setMsp] = useState(null);
    const [ivf, setIvf] = useState(null);
    const [ia, setIa] = useState(null);
    const [fsc, setFsc] = useState(null);
    const [id, setId] = useState(null);
    const [dc, setDc] = useState(null);
    const [dcp, setDcp] = useState(null);

    const [files, setFiles] = useState("");


    const [d1, setD1] = useState("none");
    const [d2, setD2] = useState("none");
    const [d3, setD3] = useState("none");
    const [d4, setD4] = useState("none");
    const [d5, setD5] = useState("none");
    const [d6, setD6] = useState("none");
    const [d7, setD7] = useState("none");
    const [d8, setD8] = useState("none");
    const [d9, setD9] = useState("none");
    const [d10, setD10] = useState("none");
    const [d11, setD11] = useState("none");
    const [d12, setD12] = useState("none");
    const [d13, setD13] = useState("none");
    const [d14, setD14] = useState("none");
    const [d15, setD15] = useState("none");
    const [d16, setD16] = useState("none");
    const [d17, setD17] = useState("none");
    const [d18, setD18] = useState("none");
    const [d19, setD19] = useState("none");
    const [d20, setD20] = useState("none");
    const [d21, setD21] = useState("none");
    const [d22, setD22] = useState("none");
    const [d23, setD23] = useState("none");
    const [d24, setD24] = useState("none");
    const [d25, setD25] = useState("none");
    const [d26, setD26] = useState("none");
    const [d27, setD27] = useState("none");
    const [d28, setD28] = useState("none");
    const [d29, setD29] = useState("none");
    const [d30, setD30] = useState("none");
    const [d31, setD31] = useState("none");
    const [d32, setD32] = useState("none");
    const [d33, setD33] = useState("none");
    const [d34, setD34] = useState("none");
    const [d35, setD35] = useState("none");
    const [d36, setD36] = useState("none");
    const [d37, setD37] = useState("none");
    const [d38, setD38] = useState("none");
    const [d39, setD39] = useState("none");
    const [d40, setD40] = useState("none");
    const [d41, setD41] = useState("none");
    const [d42, setD42] = useState("none");
    const [d43, setD43] = useState("none");
    const [d44, setD44] = useState("none");
    const [d45, setD45] = useState("none");
    const [d46, setD46] = useState("none");
    const [d47, setD47] = useState("none");
    const [d48, setD48] = useState("none");
    const [d49, setD49] = useState("none");
    const [d50, setD50] = useState("none");
    const [d51, setD51] = useState("none");

    console.log(d1);

    const stid = localStorage.getItem("studentid");

    const checkusersubmit = async () => {
        const val = await axios.post("http://103.184.242.25:8000/checkuser", { stidt: stid });
        if (val.status === 202) {
            setFiles("disabled");
        }
        console.log(val);
        console.log(files);
    }

    useEffect(() => {
        // setFiles("")
        checkusersubmit();
    }, [])

    const viewVisibility = () => {
        setIsVisible(true);
    };
    const viewVisibility1 = () => {
        setIsVisible1(true);
    };
    const viewVisibility2 = () => {
        setIsVisible2(true);
    };
    const viewVisibility3 = () => {
        setIsVisible3(true);
    };
    const viewVisibility4 = () => {
        setIsVisible4(true);
    };
    const viewVisibility5 = () => {
        setIsVisible5(true);
    };
    const hideVisibility = () => {
        setIsVisible(false);
    };
    const hideVisibility1 = () => {
        setIsVisible1(false);
    };

    const hideVisibility2 = () => {
        setIsVisible2(false);
    };

    const hideVisibility3 = () => {
        setIsVisible3(false);
    };

    const hideVisibility4 = () => {
        setIsVisible4(false);
    };
    const hideVisibility5 = () => {
        setIsVisible5(false);
    };

    const formData = new FormData();
    formData.append("psp", psp);
    formData.append("pap", pap);
    formData.append("fip", fip);
    formData.append("mip", mip);
    formData.append("pop", pop);
    formData.append("fbs", fbs);
    formData.append("mbs", mbs);
    formData.append("sbs", sbs);
    formData.append("adh", adh);
    formData.append("msp", msp);
    formData.append("ivf", ivf);
    formData.append("ia", ia);
    formData.append("fsc", fsc);
    formData.append("id", id);


    

    const focusOnEmptyInput = (e) => {
        // e.preventDefault();

        let isEmptyField = false;

        for (let i = 0; i < inputRef.current.length; i++) {
            const input = inputRef.current[i];
            if (input.value.trim() === "" || (input.name === "Phone" && input.value.length !== 10) || (input.name === "Pincode" && input.value.length !== 6) || (input.name === "Email" && !input.value.includes("@")) || (input.name === "Gender" && gender === "") || (input.name === "AttClg" && attclg === "") || (input.name === "AOS" && aos === "") ) {
                isEmptyField = true;
                input.focus();
                input.style.backgroundColor = "antiquewhite";
                input.addEventListener("change", () => {
                    input.style.backgroundColor = "white"; // Change the background color to white on change
                });
                break;
            }
        }

        if (isEmptyField) {
            // At least one input field is empty
            console.log("Empty field found");
            return;
        }
    };






    const postdata = async (e) => {
        // e.preventDefault();
        focusOnEmptyInput();
        

        if (name.length === 0) {
            // inputRef.current[0].focus();
            // alert("value missing");
            // focusOnEmptyInput();
            return null;
        }
        else if (dob.length === 0) {
            // inputRef.current[1].focus();
            // alert("value missing");
            // focusOnEmptyInput();
            return null;
        }
        else if (gender.length === 0) {
            // alert("value missing");
            // inputRef.current[2].focus();
            // focusOnEmptyInput();
            return null;
        }
        else if (fname.length === 0) {
            // alert("value missing");
            // inputRef.current[3].focus();
            // focusOnEmptyInput();

            return null;
        }
        else if (fo.length === 0) {
            // alert("value missing");
            // inputRef.current[5].focus();
            // focusOnEmptyInput();
            return null;
        }
        else if (fai.length === 0) {
            // alert("value missing");
            // inputRef.current[6].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (foph.length === 0 || foph.length !== 10) {
            // alert("value missing");
            // inputRef.current[7].focus();
            
            return null;
        }
        else if (foa.length === 0) {
            // alert("value missing");
            // inputRef.current[8].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (add.length === 0) {
            // alert("value missing");
            // inputRef.current[9].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (po.length === 0) {
            // alert("value missing");
            // inputRef.current[10].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (pin.length === 0 || pin.length !== 6) {
            // alert("value missing");
            // inputRef.current[11].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (ps.length === 0) {
            // alert("value missing");
            // inputRef.current[12].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (mun.length === 0) {
            // alert("value missing");
            // inputRef.current[13].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (ph.length === 0 || ph.length !== 10) {
            // alert("value missing");
            // inputRef.current[14].focus();
            // focusOnEmptyInputnumber();
            focusOnEmptyInput();
            return null;
        }
        else if (ei.length === 0) {
            // alert("value missing");
            // inputRef.current[15].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (mn.length === 0) {
            // alert("value missing");
            // inputRef.current[16].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (mo.length === 0) {
            // alert("value missing");
            // inputRef.current[17].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (mai.length === 0) {
            // alert("value missing");
            // inputRef.current[18].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (moph.length === 0 || moph.length !== 10) {
            // alert("value missing");
            // inputRef.current[19].focus();
            // focusOnEmptyInputnumber();
            focusOnEmptyInput();
            return null;
        }
        else if (moa.length === 0) {
            // alert("value missing");
            // inputRef.current[20].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (nos.length === 0) {
            // alert("value missing");
            // inputRef.current[21].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (nob.length === 0) {
            // alert("value missing");
            // inputRef.current[22].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (nom.length === 0) {
            // alert("value missing");
            // inputRef.current[23].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (nos2.length === 0) {
            // alert("value missing");
            // inputRef.current[24].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (nob2.length === 0) {
            // alert("value missing");
            // inputRef.current[25].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (mo2.length === 0) {
            // alert("value missing");
            // inputRef.current[26].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (cof.length === 0) {
            // alert("value missing");
            // inputRef.current[27].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (noc.length === 0) {
            // alert("value missing");
            // inputRef.current[28].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (attclg.length === 0) {
            // alert("value missing");
            // inputRef.current[29].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (ros.length === 0) {
            // alert("value missing");
            // inputRef.current[30].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (clng.length === 0) {
            // alert("value missing");
            // inputRef.current[31].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (str.length === 0) {
            // alert("value missing");
            // inputRef.current[32].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (ces.length === 0) {
            // alert("value missing");
            // inputRef.current[33].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (sb.length === 0) {
            // alert("value missing");
            // inputRef.current[34].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (aos.length === 0) {
            // alert("value missing");
            // inputRef.current[35].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (oia.length === 0) {
            // alert("value missing");
            // inputRef.current[36].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (fut.length === 0) {
            // alert("value missing");
            // inputRef.current[37].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!psp || psp.size > 600000) {
            // alert("file missing");
            // inputRef.current[38].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!pap || pap.size > 600000) {
            // alert("file missing");
            // inputRef.current[39].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!fip || fip.size > 600000) {
            // alert("file missing");
            // inputRef.current[40].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!mip || mip.size > 600000) {
            // alert("file missing");
            // inputRef.current[41].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!pop || pop.size > 600000) {
            // alert("file missing");
            // inputRef.current[42].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!fbs || fbs.size > 600000) {
            // alert("file missing");
            // inputRef.current[43].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!mbs || mbs.size > 600000) {
            // alert("file missing");
            // inputRef.current[44].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!sbs || sbs.size > 600000) {
            // alert("file missing");
            // inputRef.current[45].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!adh || adh.size > 600000) {
            // alert("file missing");
            // inputRef.current[46].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!msp || msp.size > 600000) {
            // alert("file missing");
            // inputRef.current[47].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!ivf || ivf.size > 600000) {
            // alert("file missing");
            // inputRef.current[48].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!ia || ia.size > 600000) {
            // alert("file missing");
            // inputRef.current[49].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!fsc || fsc.size > 600000) {
            // alert("file missing");
            // inputRef.current[50].focus();
            focusOnEmptyInput();
            return null;
        }
        else if (!id || id.size > 600000) {
            // alert("file missing");
            // inputRef.current[51].focus();
            focusOnEmptyInput();
            return null;
        }
        else {
            const data = await axios.post("http://103.184.242.25:8000/formdata", {
                stidt: stid,
                namet: name, dobt: dob, gendert: gender, fnamet: fname, fot: fo, fait: fai, fopht: foph, foat: foa, addt: add, pot: po, pint: pin, pst: ps, munt: mun, pht: ph, apht: aph, eit: ei, mnt: mn, mot: mo, mait: mai, mopht: moph, moat: moa, nost: nos, nobt: nob, nomt: nom, nos2t: nos2, nob2t: nob2, mo2t: mo2, coft: cof, noct: noc, attclgt: attclg, rost: ros, clngt: clng, strt: str, cest: ces, sbt: sb, aost: aos, oiat: oia, futt: fut
            }
            )
            console.log(data.data);
            const response = await axios.post(
                `http://103.184.242.25:8000/imageupload/uploadimage?stidt=${stid}`,
                formData
            ).then(res => { alert("Data Saved Successfully"); window.location.reload(); });
            console.log(response.data);

        }

    }

    function renderRequired(fieldValue) {
        if (fieldValue === "" || !fieldValue) {
            // return <span style={{ color: "red" }}>(required)</span>;
            return null;
        } else if (fieldValue.size > 600000) {
            return (
                <span style={{ color: "red" }}>
                    file size exceeds limit of 600 KB
                </span>
            );
        }
        return null;
    }

    function checkphone(value) {
        if (value === "") {
            // return <span style={{ color: "red" }}>(required)</span>;
            return null;
        } else if (value.length !== 10) {
            return (
                <span style={{ color: "red" }}>
                    invalid number
                </span>
            );
        }
        return null;
    }

    function checkEmail(value) {
        if (value === "") {
            // return <span style={{ color: "red" }}>(required)</span>;
            return null;
        } else if (!value.includes("@")) {
            return <span style={{ color: "red" }}>Invalid email</span>;
        }
        return null;
    }

    function checkpin(value) {
        if (value === "") {
            // return <span style={{ color: "red" }}>(required)</span>;
            return null;
        } else if (value.length !== 6) {
            return (
                <span style={{ color: "red" }}>
                    invalid pin
                </span>
            );
        }
        return null;
    }



    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior


        try {
            const response = await axios.post(
                "http://103.184.242.25:8000/imageupload/uploadimage", {
                formData, stid
            }

            );
            console.log(response.data); // Assuming the server is returning JSON
        } catch (error) {
            console.error("Error:", error);
        }
    }



    return (
        <>

            <div class="container" style={{backgroundColor: "#f6f9ff"}}>

                {/* <ContextProvider ids={id} /> */}
                <div className="container login" style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3em"
                }}>
                    <form style={{ backgroundColor: "white", padding:"36px" }} id="form">
                        <div id="q0" class="q">
                            <div>
                                <h3 style={{ width: "32%" }}>Personal Details</h3><hr />
                            </div>


                            <h5 style={{ width: "32%" }}>Name and Date of Birth</h5><hr />

                            <div class="row" style={{justifyContent:"space-between"}}>
                                <div class="col-md-4">

                                    <p>Full Name <span class="text-danger">*</span> </p>
                                    <input type="text" class="form-control" id="fname" ref={(el) => (inputRef.current[0] = el)} name="Full_Name" onChange={(e) => setName(e.target.value)} />
                                    {renderRequired(name)}
                                </div>

                                <div class="col-md-3">
                                    <p>Date of Birth <span class="text-danger">*</span></p>

                                    <div class="date_area input-group date form_date"  >

                                        <input class="form-control" type="date" ref={(el) => (inputRef.current[1] = el)} name="Date_of_Birth" id="startdate" onChange={(e) => setDob(e.target.value)} /><br />
                                        <div>
                                            {renderRequired(dob)}
                                        </div>


                                    </div>
                                </div>
                                <div class="col-md-4" style={{textAlign:"center"}}>
                                    <p style={{ margin: " 0.8em 5em" }}>Gender <span class="text-danger">*</span></p>
                                    <label class="radio-inline">
                                        <input type="radio" name="Gender" ref={(el) => (inputRef.current[2] = el)} value={"Male"} onChange={(e) => setGender(e.target.value)} />Male
                                    </label>
                                    <label class="radio-inline" style={{ marginLeft: "2em" }}>
                                        <input type="radio"  name="Gender" value={"Female"} onChange={(e) => setGender(e.target.value)} />Female
                                    </label>
                                    {renderRequired(gender)}
                                </div>


                                {/* </div> */}
                            </div>

                            <div class="row" style={{justifyContent:"space-between",marginTop:"38px"}}>
                            <div class="col-md-3">
                                        <p>Self-attested passport size photo with signature<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[38] = el)} name="Self_attested_Passport_size_photo_with_signature" onChange={(e) => setPsp(e.target.files[0])} /></p>
                                        {renderRequired(psp)}

                                    </div>
                                    <div class="col-md-3">
                                        <p>Student's bank account proof<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[45] = el)} name="Students_Bank_Account_proof" multiple onChange={(e) => setSbs(e.target.files[0])} /></p>
                                        {renderRequired(sbs)}
                                    </div>
                                    <div class="col-md-3">
                                        <p>Adhaar card<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[46] = el)} name="Adhaar_Card" multiple onChange={(e) => setAdh(e.target.files[0])} /></p>
                                        {renderRequired(adh)}

                                    </div>
                            </div>
                        </div>

                        {/* <h5 className='parentsname' style={{ width: "22%" }}>Parents Details</h5><hr />
                                    <br /> */}
                        <div className='plusheading' style={{ display: "flex" }}>
                            <h5 style={{ width: "22%"}}>Father Details</h5>{!isVisible ? <span style={{ alignSelf: "center" }}><i class="ri-add-fill" onClick={viewVisibility}></i></span> : <span style={{ alignSelf: "center" }}><i class="ri-indeterminate-circle-line" onClick={hideVisibility}></i></span>}
                        </div>
                        {isVisible ? <div>
                            <div class="row">

                                <div class="col-md-4">
                                    <p>Father’s Name <span class="text-danger">*</span></p>
                                    <input type="text" id="company" ref={(el) => (inputRef.current[3] = el)} name="Father_or_Guardian_Name" class="form-control" onChange={(e) => setFname(e.target.value)} />
                                    {renderRequired(fname)}
                                </div>

                                <div class="col-md-4">
                                    {/* <p>Mother’s Name: <span class="text-danger">*</span></p>
                                            <input type="text" id="company" name="Mother_Name" value="" class="form-control" /> */}
                                    <p>Father’s Occupation <span class="text-danger">*</span></p>
                                    <input type="text" id="Occupation" name="Father_Occupation" ref={(el) => (inputRef.current[4] = el)} class="form-control" onChange={(e) => setFo(e.target.value)} />
                                    {renderRequired(fo)}
                                </div>
                                <div class="col-md-4">
                                    <p>Annual Income <span class="text-danger">*</span></p>
                                    <input type="text" id="Income" ref={(el) => (inputRef.current[5] = el)} name="Annual_Income" onChange={(e) => setFai(e.target.value)} class="form-control" />
                                    {renderRequired(fai)}
                                </div>
                                

                            </div>
                            <br /> <div class="row">

                                <div class="col-md-4">
                                    <p>Office Phone No <span class="text-danger">*</span></p>
                                    <input type="number" id="Officephone" ref={(el) => (inputRef.current[6] = el)} name="Phone" onChange={(e) => setFoph(e.target.value)} class="form-control" />
                                    
                                </div>
                                <div class="col-md-8">
                                    <p>Office Address <span class="text-danger">*</span></p>
                                    <p><textarea class="form-control" ref={(el) => (inputRef.current[7] = el)} name="Office_Address" id="OfficeAddress" onChange={(e) => setFoa(e.target.value)}></textarea></p>
                                    
                                </div>

                            </div>

                            <br /> <div class="row" style={{justifyContent:"space-between"}}>
                                
                            <div class="col-md-3">
                                        <p>Father's ID Proof<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" name="Father's_ID_Proof" ref={(el) => (inputRef.current[40] = el)} multiple onChange={(e) => setFip(e.target.files[0])} /></p>
                                        {renderRequired(fip)}
                                    </div>

                                    <div class="col-md-3">
                                        <p>Father's Bank Statement(Past 6 months)<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" name="Father's_Bank_Statement" ref={(el) => (inputRef.current[43] = el)} multiple onChange={(e) => setFbs(e.target.files[0])} /></p>
                                        {renderRequired(fbs)}
                                    </div>
                                    <div class="col-md-3">
                                        <p>Self-attested photograph of parents<br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[42] = el)} name="Self-attested_photograph_of_parents" multiple onChange={(e) => setPop(e.target.files[0])} /></p>
                                        {renderRequired(pop)}

                                    </div>
                            </div>
                        </div> : null}

                        <div className='plusheading' style={{ display: "flex" }}>
                            <h5 style={{ width: "24%" }}>Address Details</h5>{!isVisible1 ? <span style={{ alignSelf: "center" }}><i class="ri-add-fill" onClick={viewVisibility1}></i></span> : <span style={{ alignSelf: "center" }}><i class="ri-indeterminate-circle-line" onClick={hideVisibility1}></i></span>}
                        </div>

                        <br /> {isVisible1 ? <div>
                            <div class="row" style={{justifyContent:"space-between"}}>
                                <div class="col-md-4">
                                    <p>Address <span class="text-danger">*</span></p>
                                    <p><textarea class="form-control" ref={(el) => (inputRef.current[8] = el)} name="Address" id="address" onChange={(e) => setAdd(e.target.value)}></textarea>{renderRequired(add)}</p>

                                </div>

                                <div class="col-md-3">
                                    <p>Post Office <span class="text-danger">*</span></p>
                                    <input type="text" id="Post" ref={(el) => (inputRef.current[9] = el)} name="Post_Office" onChange={(e) => setPo(e.target.value)} class="form-control" />
                                    {renderRequired(po)}
                                </div>

                                <div class="col-md-3">
                                    <p>Pincode <span class="text-danger">*</span></p>
                                    <input type="number" ref={(el) => (inputRef.current[10] = el)} id="Pincode" name="Pincode" onChange={(e) => setPin(e.target.value)} class="form-control" />
                                    {checkpin(pin)}
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-md-4">
                                    <p>Police Station <span class="text-danger">*</span></p>
                                    <input type="text" ref={(el) => (inputRef.current[11] = el)} id="Police_Station" name="Police_Station" onChange={(e) => setPs(e.target.value)} class="form-control" />
                                    {renderRequired(ps)}
                                </div>

                                <div class="col-md-8">
                                    <p>Municipality/Panchayat details <span class="text-danger">*</span></p>
                                    <p><textarea class="form-control" ref={(el) => (inputRef.current[12] = el)} name="Municipality/Panchayat_details" id="Municipality/Panchayat_details" onChange={(e) => setMun(e.target.value)}></textarea>{renderRequired(mun)}</p>
                                </div>

                            </div>
                        </div> : null}

                        <h5 style={{ width: "24%" }}>Contact Details</h5><hr />
                        <br />

                        <div class="row">
                            <div class="col-md-4">
                                <p>Phone No <span class="text-danger">*</span></p>
                                <p></p>
                                <input type="number" id="Phone" name="Phone" ref={(el) => (inputRef.current[13] = el)} class="form-control" onChange={(e) => setPh(e.target.value)} />
                                {checkphone(ph)}
                            </div>

                            <div class="col-md-4">
                                <p>Alternate No</p>
                                <input type="text" id="Alternate" name="Alternate_No" onChange={(e) => setAph(e.target.value)} class="form-control" />
                            </div>

                            <div class="col-md-4">
                                <p>Email id <span class="text-danger">*</span></p>
                                <input type="email" ref={(el) => (inputRef.current[14] = el)} id="email" name="Email" class="form-control" onChange={(e) => setEi(e.target.value)} />
                                {checkEmail(ei)}
                            </div>

                        </div>



                        <br />

                        <div className='plusheading' style={{ display: "flex" }}>
                            <h5 style={{ width: "24%" }}>Mother Details</h5>{!isVisible2 ? <span style={{ alignSelf: "center" }}><i class="ri-add-fill" onClick={viewVisibility2}></i></span> : <span style={{ alignSelf: "center" }}><i class="ri-indeterminate-circle-line" onClick={hideVisibility2}></i></span>}
                        </div>
                        {isVisible2 ? <div>
                            <div class="row">

                                <div class="col-md-4">
                                    <p>Mother’s Name <span class="text-danger">*</span></p>
                                    <input type="text" id="company" ref={(el) => (inputRef.current[15] = el)} name="Father_or_Guardian_Name" onChange={(e) => setMn(e.target.value)} class="form-control" />
                                    {renderRequired(mn)}
                                </div>

                                <div class="col-md-4">
                                    {/* <p>Mother’s Name: <span class="text-danger">*</span></p>
                                            <input type="text" id="company" name="Mother_Name" value="" class="form-control" /> */}
                                    <p>Mother’s Occupation <span class="text-danger">*</span></p>
                                    <input type="text" id="Occupation" ref={(el) => (inputRef.current[16] = el)} name="Father_Occupation" onChange={(e) => setMo(e.target.value)} class="form-control" />
                                    {renderRequired(mo)}
                                </div>
                                <div class="col-md-4">
                                    <p>Annual Income <span class="text-danger">*</span></p>
                                    <input type="text" id="Income" ref={(el) => (inputRef.current[17] = el)} name="Annual_Income" onChange={(e) => setMai(e.target.value)} class="form-control" />
                                    {renderRequired(mai)}
                                </div>

                            </div>
                            <br /> <div class="row">
                                

                                <div class="col-md-4">
                                    <p>Office Phone No <span class="text-danger">*</span></p>
                                    <input type="number" ref={(el) => (inputRef.current[18] = el)} id="Officephone" name="Phone" onChange={(e) => setMoph(e.target.value)} class="form-control" />
                                    
                                </div>
                                <div class="col-md-8">
                                    <p>Office Address <span class="text-danger">*</span></p>
                                    <p><textarea class="form-control" ref={(el) => (inputRef.current[19] = el)} name="Office_Address" id="OfficeAddress" onChange={(e) => setMoa(e.target.value)}></textarea>{renderRequired(moa)}</p>
                                </div>

                            </div>

                            <br /> <div class="row" style={{justifyContent:"space-between"}}>
                            <div class="col-md-4">
                                        <p>Mother's ID Proof<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" name="Mother's_ID_Proof" ref={(el) => (inputRef.current[41] = el)} multiple onChange={(e) => setMip(e.target.files[0])} /></p>
                                        {renderRequired(mip)}

                                    </div>
                                    <div class="col-md-4">
                                        <p>Mother's Bank Statement(Past 6 months)<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" name="Mother's_Bank_Statement" ref={(el) => (inputRef.current[44] = el)} multiple onChange={(e) => setMbs(e.target.files[0])} /></p>
                                        {renderRequired(mbs)}

                                    </div>

                            </div>
                        </div> : null}

                        <br />

                        <div id="q1" class="q">
                            <div className='plusheading' style={{ display: "flex" }}>
                                <h5 style={{ width: "34%" }}>Education Details</h5>{!isVisible3 ? <span style={{ alignSelf: "center" }}><i class="ri-add-fill" onClick={viewVisibility3}></i></span> : <span style={{ alignSelf: "center" }}><i class="ri-indeterminate-circle-line" onClick={hideVisibility3}></i></span>}
                            </div>
                            {isVisible3 ? <div>
                                <h5 style={{ width: "14%" }}>Class X</h5><hr />


                                <div class="row">
                                    <div class="col-md-4">
                                        <p>Name of School<span class="text-danger">*</span></p>
                                        <input type="text" id="SchoolName" ref={(el) => (inputRef.current[20] = el)} name="Educational_Qualification_Name_of_School-Class_X" onChange={(e) => setNos(e.target.value)} class="form-control" />
                                        {renderRequired(nos)}
                                    </div>

                                    <div class="col-md-4">
                                        <p>Name of Board/University<span class="text-danger">*</span></p>
                                        <input type="text" id="School_10_Board" ref={(el) => (inputRef.current[21] = el)} name="Educational_Qualification_Name_of_Board_or_University-Class_X" onChange={(e) => setNob(e.target.value)} class="form-control" />
                                        {renderRequired(nob)}
                                    </div>

                                    <div class="col-md-4">
                                        <p>Marks Obtained (In Percentage)<span class="text-danger">*</span></p>
                                        <input type="text" id="Marks_x" ref={(el) => (inputRef.current[22] = el)} name="Marks_Obtained_in_Class_X" onChange={(e) => setNom(e.target.value)} class="form-control" />
                                        {renderRequired(nom)}
                                    </div>

                                </div>
                                <br />

                                <h5 style={{ width: "14%" }}>Class XII</h5><hr />



                                <div class="row">
                                    <div class="col-md-4">
                                        <p>Name of School<span class="text-danger">*</span></p>
                                        <input type="text" id="School_12" ref={(el) => (inputRef.current[23] = el)} name="Educational_Qualification:_Name_of_School-Class_XII" onChange={(e) => setNos2(e.target.value)} class="form-control" />
                                        {renderRequired(nos2)}
                                    </div>

                                    <div class="col-md-4">
                                        <p>Name of Board/University<span class="text-danger">*</span></p>
                                        <input type="text" id="School_12_Board" ref={(el) => (inputRef.current[24] = el)} name="Educational_Qualification:_Name_of_Board_or_University-Class_XII" onChange={(e) => setNob2(e.target.value)} class="form-control" />
                                        {renderRequired(nob2)}
                                    </div>

                                    <div class="col-md-4">
                                        <p>Marks Obtained (In Percentage)<span class="text-danger">*</span></p>
                                        <input type="text" id="Marks_12" ref={(el) => (inputRef.current[25] = el)} name="Marks_Obtained_in_Class_XII" onChange={(e) => setMo2(e.target.value)} class="form-control" />
                                        {renderRequired(mo2)}
                                    </div>
                                </div>
                            </div> : null}

                            <br />

                            <div className='plusheading' style={{ display: "flex" }}>
                                <h5 style={{ width: "37%" }}>Scholarship Details</h5>{!isVisible4 ? <span style={{ alignSelf: "center" }}><i class="ri-add-fill" onClick={viewVisibility4}></i></span> : <span style={{ alignSelf: "center" }}><i class="ri-indeterminate-circle-line" onClick={hideVisibility4}></i></span>}
                            </div>

                            {isVisible4 ?
                                <div>
                                    <div class="row">


                                        <div class="col-md-4">
                                            <p>Course opted for <span class="text-danger">*</span></p>


                                            <select name="Course_opted_for" ref={(el) => (inputRef.current[26] = el)} class="form-control" onChange={(e) => setCof(e.target.value)}>
                                                <option value="">Please Select</option>

                                                <option value="Class XI/XIII">Class XI/XIII</option>
                                                <option value="Humanities">Humanities</option>
                                                <option value="Science">Science</option>
                                                <option value="Commerce">Commerce</option>
                                                <option value="B.Tech">B.Tech</option>
                                                <option value="Polytechnic courses">Polytechnic courses</option>
                                                <option value="Bachelor’s Degree courses in Arts, Science & Commerce">Bachelor’s Degree courses in Arts, Science & Commerce</option>
                                                <option value="Master’s Degree courses in Arts, Science & Commerce">Master’s Degree courses in Arts, Science & Commerce</option>
                                                <option value="Diploma Courses (XI & XII)">Diploma Courses (XI & XII)</option>
                                                <option value="Integrated LAW (BBA, LLB, UG, B.Sc.)">Integrated LAW (BBA, LLB, UG, B.Sc.)</option>
                                                <option value="Nursing (Auxiliary Nursing And Midwifery UG, GNM)">Nursing (Auxiliary Nursing And Midwifery UG, GNM)</option>
                                                <option value="Various Technical & Vocational Courses">Various Technical & Vocational Courses</option>
                                                <option value="Research Programmes (D.Pharma, M.Phil., Ph.D.& Rural Development)">Research Programmes (D.Pharma, M.Phil., Ph.D.& Rural Development)</option>
                                                <option value="Diploma Courses of Management & Computer Applications">Diploma Courses of Management & Computer Applications</option>
                                                <option value="Unger-graduate Courses of Management & Computer Applications">Unger-graduate Courses of Management & Computer Applications</option>
                                                <option value="Postgraduate Courses of Management & Computer Applications">Postgraduate Courses of Management & Computer Applications</option>
                                            </select>
                                            {renderRequired(cof)}

                                        </div>


                                        <div class="col-md-4">
                                            <p>Name of college or university <span class="text-danger">*</span></p>
                                            <input type="text" id="University_name" ref={(el) => (inputRef.current[27] = el)} name="Name_of_College_or_University" onChange={(e) => setNoc(e.target.value)} class="form-control" />
                                            {renderRequired(noc)}
                                        </div>


                                        <div class="col-md-4">
                                            <p>Are you the first to attend college from your family <span class="text-danger">*</span></p>
                                            <div style={{textAlign:"center"}}>
                                                <label class="radio-inline" style={{marginLeft:"33px"}}>
                                                    <input type="radio" ref={(el) => (inputRef.current[28] = el)} name="AttClg" value="Yes" onChange={(e) => setAttclg(e.target.value)} />Yes
                                                </label>
                                                <label class="radio-inline">
                                                    <input type="radio" ref={(el) => (inputRef.current[28] = el)} name="AttClg" value="No" onChange={(e) => setAttclg(e.target.value)} />No
                                                </label>
                                            </div>
                                            {renderRequired(attclg)}
                                        </div>

                                    </div>
                                    <br />

                                    <hr />
                                    <div class="row">


                                        <div class="col-md-3" >
                                            <p class="heightadjust">Reason for seeking scholarship.<span class="text-danger">*</span></p>
                                            <p><textarea class="form-control" name="Reason_for_seeking_scholarship" id="Reason_scholarship" ref={(el) => (inputRef.current[29] = el)} onChange={(e) => setRos(e.target.value)}></textarea>{renderRequired(ros)}</p>
                                        </div>


                                        <div class="col-md-3">
                                            <p >Talk about a time you overcame a challenge.<span class="text-danger">*</span></p>
                                            <p><textarea class="form-control" ref={(el) => (inputRef.current[30] = el)} name="Talk_About_A_Time_You_Overcame_A_Challenge" id="Overcame_Challenge" onChange={(e) => setClng(e.target.value)}></textarea>{renderRequired(clng)}</p>
                                        </div>


                                        <div class="col-md-3">
                                            <p>What are your strengths and weaknesses? <span class="text-danger">*</span></p>
                                            <p><textarea class="form-control" ref={(el) => (inputRef.current[31] = el)} name="What_are_your_Strengths_And_Weaknesses" id="Strengths_Weaknesses" onChange={(e) => setStr(e.target.value)}></textarea>{renderRequired(str)}</p>
                                        </div>

                                        <div class="col-md-3">
                                            <p>Current Education <br />Status <span class="text-danger">*</span></p>
                                            <p><textarea class="form-control" name="Current_Education_Status" ref={(el) => (inputRef.current[32] = el)} id="Current_Education_Status" placeholder="What are you currently studying or what semester you are in." onChange={(e) => setCes(e.target.value)}></textarea>{renderRequired(ces)}</p>
                                        </div>

                                    </div>
                                    <br />
                                    <hr />

                                    <div class="row">


                                        <div class="col-md-3">
                                            <p>I am a deserving candidate for the scholarship because ...(400 words)<span class="text-danger">*</span></p>
                                            <p><textarea class="form-control" ref={(el) => (inputRef.current[33] = el)} name="I_am_a_deserving_candidate_for_the_scholarship_because" id="deserving_scholarship" onChange={(e) => setSb(e.target.value)}></textarea>{renderRequired(dc)}</p>
                                        </div>


                                        <div class="col-md-3">
                                            <p>Are you availing of any other scholarship<span class="text-danger">*</span></p>
                                            <div style={{textAlign:"center"}}>
                                            <label class="radio-inline">
                                                <input type="radio" ref={(el) => (inputRef.current[34] = el)} name="AOS" id="avail_yes" value="Yes" onChange={(e) => setAos(e.target.value)} />Yes
                                            </label>
                                            <label class="radio-inline" style={{marginLeft:"33px"}}>
                                                <input type="radio" ref={(el) => (inputRef.current[35] = el)} name="AOS" id="avail_no" value="No" onChange={(e) => setAos(e.target.value)} />No
                                            </label>
                                            <p>
                                                {renderRequired(aos)}
                                            </p>
                                            </div>
                                        </div>



                                        <div class="col-md-3">
                                            <p class="heightadjust">Is there any other information you want to add? <span class="text-danger">*</span></p>
                                            <p><textarea class="form-control" ref={(el) => (inputRef.current[36] = el)} name="Is_there_any_other_information_you_want_to_add" id="add_information" onChange={(e) => setOia(e.target.value)}></textarea>{renderRequired(oia)}</p>
                                        </div>


                                        <div class="col-md-3">
                                            <p class="heightadjust">How would you contribute towards improving or giving back to society in the future? <span class="text-danger">*</span></p>
                                            <p><textarea class="form-control" ref={(el) => (inputRef.current[37] = el)} name="How_would_you_contribute_towards_improving_or_giving_back_to_society_in_the_future" id="add_information" onChange={(e) => setFut(e.target.value)}></textarea>{renderRequired(fut)}</p>
                                        </div>

                                    </div>
                                    <br />

                                </div>

                                : null}
                        </div>

                        <div id="q2" class="q">
                            
                            <div className='plusheading' style={{ display: "flex" }}>
                                <h5 style={{ width: "36%" }}>Upload Documents</h5>{!isVisible5 ? <span style={{ alignSelf: "center" }}><i class="ri-add-fill" onClick={viewVisibility5}></i></span> : <span style={{ alignSelf: "center" }}><i class="ri-indeterminate-circle-line" onClick={hideVisibility5}></i></span>}
                            </div>
                            {isVisible5 ? <div>
                                <div class="row" style={{justifyContent:"space-between"}}>

                                    <div class="col-md-4">
                                        <p>Permanent address proof<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" name="Permanent_address_proof" ref={(el) => (inputRef.current[39] = el)} onChange={(e) => setPap(e.target.files[0])} /></p>
                                        {renderRequired(pap)}

                                    </div>
                                    <div class="col-md-4">
                                        <p>Income declaration<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[51] = el)} name="Income_declaration" multiple onChange={(e) => setId(e.target.files[0])} /></p>
                                        {renderRequired(id)}

                                    </div>



                                </div>

                                <br /><hr />
            

                                <div class="row" style={{justifyContent:"space-between"}}>
                                    <div class="col-md-4">
                                        <p>Attested copies of mark sheet of all previous exams<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span><br /><span class="text-danger">(UG marks incase of PG candidate also to be included)</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[47] = el)} name="Attested_copies_of_mark_sheet_of_previous_exams" multiple onChange={(e) => setMsp(e.target.files[0])} /></p>
                                        {renderRequired(msp)}
                                    </div>

                                    <div class="col-md-4">
                                        <p>Institution verification form<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[48] = el)} name="Institution_Verification_Form" multiple onChange={(e) => setIvf(e.target.files[0])} /></p>
                                        {renderRequired(ivf)}
                                    </div>

                                </div>
                                <br /><hr />

                                <div class="row" style={{justifyContent:"space-between"}}>
                                    <div class="col-md-4">
                                        <p>Institute acceptance<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[49] = el)} name="Institute_acceptance" multiple onChange={(e) => setIa(e.target.files[0])} /></p>
                                        {renderRequired(ia)}

                                    </div>

                                    <div class="col-md-4">
                                        <p>Fee structure of current course year wise<span class="text-danger">*</span><br /><span class="text-danger">File Size : Max 600 KB</span></p>
                                        <p><input type="file" ref={(el) => (inputRef.current[50] = el)} name="Fee_Structure_of_current_course_year_wise" multiple onChange={(e) => setFsc(e.target.files[0])} /></p>
                                        {renderRequired(fsc)}

                                    </div>

                                </div>
                            

                            </div> : null}
                            <br /><hr />


                            {/* <span id="zxcv" style={{ display: "none" }}><div class="alert alert-info" role="alert">Submitting form..Please wait...</div></span> */}



                            {/* <p class="text-right">The right of selection lies at the discretion of the screening committee.</p> */}

                        </div><br />
                        {/* </div> */}
                    </form>

                </div>
                <div style={{textAlign:"end",margin:"70px"}}> <button className={`btn btn-primary ${files}`} onClick={postdata} style={{width:"160px"}}>SUBMIT </button></div>
            </div>

        </>
    )
}

export default Form