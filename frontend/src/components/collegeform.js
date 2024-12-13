import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import CollegeSearch from './collegesearch';
import InputForm from './collegesearch';
import Table from './table';

const Collegeform = () => {

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
        // checkusersubmit();
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

            {/* <div class="container" style={{backgroundColor: "#f6f9ff"}}>
                <h2>College Registration</h2> */}

                {/* <ContextProvider ids={id} /> */}
                <div className="container" style={{
                    marginTop: "3em"
                }}>
                    {/* <form style={{ backgroundColor: "white", padding:"36px" }} id="forms"> */}
                        <div id="q0" class="q">
                            <div>
                                <InputForm/>
                            </div>
                        </div>

                    {/* </form> */}

                </div>
                {/* <div style={{textAlign:"end",margin:"70px"}}> <button className={`btn btn-primary ${files}`} onClick={postdata} style={{width:"160px"}}>SUBMIT </button></div><hr/> */}

            {/* </div> */}
            

        </>
    )
}

export default Collegeform;