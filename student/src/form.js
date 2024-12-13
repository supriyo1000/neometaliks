import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ipAddress from './ipconfig';
import "./App.css";
import AlertSuccesfull from './alertSuccesfull';
// import "./bootstrap.css";

const Form = () => {

    const [isAlert, setIsAlert] = useState(false);

    const inputRef = useRef([]);
    // const inputRef1 = useRef([]);

    const [isVisible, setIsVisible] = useState(true);
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(true);
    const [isVisible3, setIsVisible3] = useState(true);
    const [isVisible4, setIsVisible4] = useState(true);
    const [isVisible5, setIsVisible5] = useState(true);
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
    const [xpYear, setXpYear] = useState('');
    const [xiipYear, setXiipYear] = useState('');
    const [subject, setSubject] = useState('');
    const [lastexam, setLastexam] = useState('');
    const [leYear, setLeYear] = useState('');
    const [lecollege, setLecollege] = useState('');
    const [lemarks, setLemarks] = useState('');
    const [marksdoc, setMarksdoc] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [files, setFiles] = useState("");

    const [ispdf, setIspdf] = useState(false);
    const [ispdf2, setIspdf2] = useState(true);
    const [isStudentExist, setIsStudentExist] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    const stid = localStorage.getItem("studentid");

    const checkusersubmit = async () => {
        // const val = await axios.post("http://103.184.242.25:8000/checkuser", { stidt: stid });
        // if (val.status === 202) {
        //     setFiles("disabled");
        // }
        // console.log(val);
        // console.log(files);
    }


    async function checkStudentExist(stid) {
        const studentexist = await fetch(`http://${ipAddress}:8000/users/checkStudentDataExist?userId=${stid}`).then(res => res.json());
        console.log(studentexist);

        if (studentexist[0].stu_master === 1 && studentexist[0].files_master === 1 && studentexist[0].scholar_master === 1 && studentexist[0].m_master === 1 && studentexist[0].f_master === 1 && studentexist[0].edu_master === 1 && studentexist[0].add_master === 1) {
            setIsStudentExist(true);
        } else {
            setIsStudentExist(false);
        }
    }

    useEffect(() => {
        // setFiles("")
        checkStudentExist(stid);
        checkusersubmit();
    }, [])

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
    if (marksdoc !== '') {
        formData.append("marksdoc", marksdoc);
    }




    const focusOnEmptyInput = (e) => {
        // e.preventDefault();

        let isEmptyField = false;

        for (let i = 0; i < inputRef.current.length; i++) {
            const input = inputRef.current[i];
            if (input.value.trim() === "" || input.value.length > 240 || (input.name === "Phone" && input.value.length !== 10) || (input.name === "Pincode" && input.value.length !== 6) || (input.name === "Email" && !input.value.includes("@")) || (input.name === "Gender" && gender === "") || (input.name === "AttClg" && attclg === "") || (input.name === "AOS" && aos === "")) {
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


    function isImageFile(file) {
        if (!file) {
            // Handle the case where the filename is undefined or empty
            return false;
        }

        // Get the file extension
        const fileExtension = file.name.split('.').pop();

        // List of image file extensions (add more as needed)
        const imageExtensions = ['jpg', 'jpeg', 'png'];
        if (imageExtensions.includes(fileExtension.toLowerCase()) === false) {
            return (
                <span style={{ color: "red" }}>
                    ***Only jpg ,jpeg ,png File Allowed***
                </span>
            );
        }

    }

    function checkfile(file) {
        if (!file) {
            return null;
        }
        const fileExtension = file.name.split('.').pop();

        const imageExtensions = ['jpg', 'jpeg', 'png'];
        if (imageExtensions.includes(fileExtension.toLowerCase()) === false) {
            return setIspdf(true);
        } else {
            return setIspdf(false);
        }
    }
    function checkpdf(file) {
        if (!file) {
            return null;
        }
        else if (file.size > 600000) {
            return (
                <span style={{ color: "red" }}>
                    ***File length Exceeds 600 KB***
                </span>
            );
        } else {
            const fileExtension = file.name.split('.')[1];
            console.log(fileExtension);
            const imageExtensions = 'pdf';
            if (fileExtension.toLowerCase() === imageExtensions) {
                return setIspdf2(true);
            } else {
                return setIspdf2(false);
            }
        }

    }





    const postdata = async (e) => {
        e.preventDefault();
        focusOnEmptyInput();

        if (name.length === 0) {
            console.log(name);
            return null;
        }
        else if (dob.length === 0) {
            console.log(dob);
            return null;
        }
        else if (gender.length === 0) {
            console.log(gender);
            return null;
        }
        else if (fname.length === 0) {
            console.log(fname);
            return null;
        }
        else if (fo.length === 0) {
            console.log(fo);
            return null;
        }
        else if (fai === null || fai === "") {
            console.log(fai);
            return null;
        }
        else if (foph.length === 0 || foph.length !== 10) {
            console.log(foph);
            return null;
        }
        else if (foa.length === 0) {
            console.log(foa);
            focusOnEmptyInput();
            return null;
        }
        else if (add.length === 0) {
            console.log(add);
            focusOnEmptyInput();
            return null;
        }
        else if (po.length === 0) {
            console.log(po);
            focusOnEmptyInput();
            return null;
        }
        else if (pin.length === 0 || pin.length !== 6) {
            console.log(pin);
            focusOnEmptyInput();
            return null;
        }
        else if (ps.length === 0) {
            console.log(ps);
            focusOnEmptyInput();
            return null;
        }
        else if (mun.length === 0) {
            console.log(mun);
            focusOnEmptyInput();
            return null;
        }
        else if (ph.length === 0 || ph.length !== 10) {
            console.log(ph);
            focusOnEmptyInput();
            return null;
        }

        else if (aph.length > 0 && aph.length !== 10) {
            alert("Invalid Alternate Phone number!!");
            console.log(ph);
        }
        else if (ei.length === 0) {
            console.log(ei);
            focusOnEmptyInput();
            return null;
        }
        else if (mn.length === 0) {
            console.log(mn);
            focusOnEmptyInput();
            return null;
        }
        else if (mo.length === 0) {
            console.log(mo);
            focusOnEmptyInput();
            return null;
        }
        else if (mai === null || mai === "") {
            console.log(mai);
            return null;
        }
        else if (moph.length === 0 || moph.length !== 10) {
            console.log(moph);
            focusOnEmptyInput();
            return null;
        }
        else if (moa.length === 0) {
            console.log(moa);
            focusOnEmptyInput();
            return null;
        }
        else if (nos.length === 0) {
            console.log(nos);
            focusOnEmptyInput();
            return null;
        }
        else if (nob.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (nom.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (nos2.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (nob2.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (mo2.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (cof.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (noc.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (attclg.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (ros.length === 0 || ros.length > 240) {
            focusOnEmptyInput();
            return null;
        }
        else if (clng.length === 0 || clng.length > 240) {
            focusOnEmptyInput();
            return null;
        }
        else if (str.length === 0 || str.length > 240) {
            focusOnEmptyInput();
            return null;
        }
        else if (ces.length === 0 || ces.length > 240) {
            focusOnEmptyInput();
            return null;
        }
        else if (sb.length === 0 || sb.length > 240) {
            focusOnEmptyInput();
            return null;
        }
        else if (aos.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (oia.length === 0 || oia.length > 240) {
            focusOnEmptyInput();
            return null;
        }
        else if (fut.length === 0 || fut.length > 240) {
            focusOnEmptyInput();
            return null;
        }
        else if (xpYear.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (xiipYear.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (subject.length === 0) {
            focusOnEmptyInput();
            return null;
        }
        else if (!psp || psp.size > 600000 || ispdf === true) {
            focusOnEmptyInput();
            return null;
        }
        else if (!pap || pap.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!fip || fip.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!mip || mip.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!pop || pop.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!fbs || fbs.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!mbs || mbs.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!sbs || sbs.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!adh || adh.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!msp || msp.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!ivf || ivf.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!ia || ia.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!fsc || fsc.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (!id || id.size > 600000) {
            focusOnEmptyInput();
            return null;
        }
        else if (ispdf2 === false || marksdoc.size > 600000) {
            alert("Check File Format Or Size");
            return null;
        }
        else if ((marksdoc.length > 0 || marksdoc !== "") && (lastexam === "" || leYear === "" || lecollege === "" || lemarks === "")) {
            console.log(marksdoc);
            alert("Please fill the Last Exam/Sem Details!!");
        }
        else {
        const studentexist = await fetch(`http://${ipAddress}:8000/users/checkStudentDataExist?userId=${stid}`).then(res => res.json());
        console.log(studentexist);

        if (studentexist[0].stu_master === 0 && studentexist[0].files_master === 0 && studentexist[0].scholar_master === 0 && studentexist[0].m_master === 0 && studentexist[0].f_master === 0 && studentexist[0].edu_master === 0 && studentexist[0].add_master === 0) {

            setIsLoading(true)
            const data = await axios.post(`http://${ipAddress}:8001/formdata`, {
                stidt: stid,
                namet: name, dobt: dob, gendert: gender, fnamet: fname, fot: fo, fait: fai, fopht: foph, foat: foa, addt: add, pot: po, pint: pin, pst: ps, munt: mun, pht: ph, apht: aph, eit: ei, mnt: mn, mot: mo, mait: mai, mopht: moph, moat: moa, nost: nos, nobt: nob, nomt: nom, nos2t: nos2, nob2t: nob2, mo2t: mo2, coft: cof, noct: noc, attclgt: attclg, rost: ros, clngt: clng, strt: str, cest: ces, sbt: sb, aost: aos, oiat: oia, futt: fut, xyear: xpYear, xiiyear: xiipYear, sub: subject, lexam: lastexam, lyear: leYear, lclg: lecollege, lmarks: lemarks
            }
            )


            console.log(data.data);
            const response = await axios.post(
                `http://${ipAddress}:8001/imageupload/uploadimage?stidt=${stid}`,
                formData
            )
        }

        else if (studentexist[0].stu_master === 0) {
            setIsLoading(true)
            const data = await axios.post(`http://${ipAddress}:8001/unset_formdata`, {
                stidt: stid, mode: 1,
                namet: name, dobt: dob, gendert: gender, fnamet: fname, fot: fo, fait: fai, fopht: foph, foat: foa, addt: add, pot: po, pint: pin, pst: ps, munt: mun, pht: ph, apht: aph, eit: ei, mnt: mn, mot: mo, mait: mai, mopht: moph, moat: moa, nost: nos, nobt: nob, nomt: nom, nos2t: nos2, nob2t: nob2, mo2t: mo2, coft: cof, noct: noc, attclgt: attclg, rost: ros, clngt: clng, strt: str, cest: ces, sbt: sb, aost: aos, oiat: oia, futt: fut, xyear: xpYear, xiiyear: xiipYear, sub: subject, lexam: lastexam, lyear: leYear, lclg: lecollege, lmarks: lemarks
            }
            )
        }
        else if (studentexist[0].scholar_master === 0) {
            setIsLoading(true)
            const data = await axios.post(`http://${ipAddress}:8001/unset_formdata`, {
                stidt: stid, mode: 2,
                namet: name, dobt: dob, gendert: gender, fnamet: fname, fot: fo, fait: fai, fopht: foph, foat: foa, addt: add, pot: po, pint: pin, pst: ps, munt: mun, pht: ph, apht: aph, eit: ei, mnt: mn, mot: mo, mait: mai, mopht: moph, moat: moa, nost: nos, nobt: nob, nomt: nom, nos2t: nos2, nob2t: nob2, mo2t: mo2, coft: cof, noct: noc, attclgt: attclg, rost: ros, clngt: clng, strt: str, cest: ces, sbt: sb, aost: aos, oiat: oia, futt: fut, xyear: xpYear, xiiyear: xiipYear, sub: subject, lexam: lastexam, lyear: leYear, lclg: lecollege, lmarks: lemarks
            }
            )
        }
        else if (studentexist[0].m_master === 0) {
            setIsLoading(true)
            const data = await axios.post(`http://${ipAddress}:8001/unset_formdata`, {
                stidt: stid, mode: 3,
                namet: name, dobt: dob, gendert: gender, fnamet: fname, fot: fo, fait: fai, fopht: foph, foat: foa, addt: add, pot: po, pint: pin, pst: ps, munt: mun, pht: ph, apht: aph, eit: ei, mnt: mn, mot: mo, mait: mai, mopht: moph, moat: moa, nost: nos, nobt: nob, nomt: nom, nos2t: nos2, nob2t: nob2, mo2t: mo2, coft: cof, noct: noc, attclgt: attclg, rost: ros, clngt: clng, strt: str, cest: ces, sbt: sb, aost: aos, oiat: oia, futt: fut, xyear: xpYear, xiiyear: xiipYear, sub: subject, lexam: lastexam, lyear: leYear, lclg: lecollege, lmarks: lemarks
            }
            )
        }
        else if (studentexist[0].f_master === 0) {
            setIsLoading(true)
            const data = await axios.post(`http://${ipAddress}:8001/unset_formdata`, {
                stidt: stid, mode: 4,
                namet: name, dobt: dob, gendert: gender, fnamet: fname, fot: fo, fait: fai, fopht: foph, foat: foa, addt: add, pot: po, pint: pin, pst: ps, munt: mun, pht: ph, apht: aph, eit: ei, mnt: mn, mot: mo, mait: mai, mopht: moph, moat: moa, nost: nos, nobt: nob, nomt: nom, nos2t: nos2, nob2t: nob2, mo2t: mo2, coft: cof, noct: noc, attclgt: attclg, rost: ros, clngt: clng, strt: str, cest: ces, sbt: sb, aost: aos, oiat: oia, futt: fut, xyear: xpYear, xiiyear: xiipYear, sub: subject, lexam: lastexam, lyear: leYear, lclg: lecollege, lmarks: lemarks
            }
            )
        }
        else if (studentexist[0].edu_master === 0) {
            setIsLoading(true)
            const data = await axios.post(`http://${ipAddress}:8001/unset_formdata`, {
                stidt: stid, mode: 5,
                namet: name, dobt: dob, gendert: gender, fnamet: fname, fot: fo, fait: fai, fopht: foph, foat: foa, addt: add, pot: po, pint: pin, pst: ps, munt: mun, pht: ph, apht: aph, eit: ei, mnt: mn, mot: mo, mait: mai, mopht: moph, moat: moa, nost: nos, nobt: nob, nomt: nom, nos2t: nos2, nob2t: nob2, mo2t: mo2, coft: cof, noct: noc, attclgt: attclg, rost: ros, clngt: clng, strt: str, cest: ces, sbt: sb, aost: aos, oiat: oia, futt: fut, xyear: xpYear, xiiyear: xiipYear, sub: subject, lexam: lastexam, lyear: leYear, lclg: lecollege, lmarks: lemarks
            }
            )
        }
        
        else if (studentexist[0].add_master === 0) {
            setIsLoading(true)
            const data = await axios.post(`http://${ipAddress}:8001/unset_formdata`, {
                stidt: stid, mode: 6,
                namet: name, dobt: dob, gendert: gender, fnamet: fname, fot: fo, fait: fai, fopht: foph, foat: foa, addt: add, pot: po, pint: pin, pst: ps, munt: mun, pht: ph, apht: aph, eit: ei, mnt: mn, mot: mo, mait: mai, mopht: moph, moat: moa, nost: nos, nobt: nob, nomt: nom, nos2t: nos2, nob2t: nob2, mo2t: mo2, coft: cof, noct: noc, attclgt: attclg, rost: ros, clngt: clng, strt: str, cest: ces, sbt: sb, aost: aos, oiat: oia, futt: fut, xyear: xpYear, xiiyear: xiipYear, sub: subject, lexam: lastexam, lyear: leYear, lclg: lecollege, lmarks: lemarks
            }
            )
        }
        else if (studentexist[0].files_master === 0) {
            setIsLoading(true)
            const response = await axios.post(
                `http://${ipAddress}:8001/imageupload/uploadimage?stidt=${stid}`,
                formData
            )
        }


        setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        setIsAlert(true);
    }
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const current_day = date.getDate();
    const current_month = date.getMonth() + 1;
    const current_year = date.getFullYear();

    const formattedDate = `${current_year}-${current_month < 10 ? '0' : ''}${current_month}-${current_day < 10 ? '0' : ''}${current_day}`;

    return formattedDate;
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

function checkLength(value) {
    if (value.length > 240) {
        return (
            <span style={{ color: "red" }}>
                Input Text exceeds limit of 240 Words!!
            </span>
        );
    }
}

function incomeRequired(fieldValue) {
    if (fieldValue === "" || fieldValue === null) {
        return <span style={{ color: "red" }}>If No Income Enter 0</span>;
        // return null;
    }
    // else if (fieldValue.size > 600000) {
    //     return (
    //         <span style={{ color: "red" }}>
    //             file size exceeds limit of 600 KB
    //         </span>
    //     );
    // }
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
            `http://${ipAddress}:8000/imageupload/uploadimage`, {
            formData, stid
        }

        );
        console.log(response.data); // Assuming the server is returning JSON
    } catch (error) {
        console.error("Error:", error);
    }
}

const handleKeyDown = (e) => {
    // Prevent any keypress events for manual input
    e.preventDefault();
};


return (
    <>

        <div className="container" style={{ backgroundColor: "#f6f9ff" }}>
            {/* {isLoading && (
                    <div className="loading-container">
                        <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
                    </div>
                )} */}
            
            {isStudentExist && (
                <div className='overlay' style={{ alignItems: "center" }}>
                    <div className="card">
                        <div className="card-header">
                            Message
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>You have Already Submitted Your Data!!</p>
                                <footer className="blockquote-footer">Message By -<cite title="Source Title">Siksha Samarth Program</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className='overlay' style={{ alignItems: "center" }}>
                    <div className="loading-container">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}

            {/* <ContextProvider ids={id} /> */}
            <div className="container login" style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "3em"
            }}>
                <form style={{ backgroundColor: "white", padding: "36px" }} id="form">
                    <div id="q0" className="q">
                        <div>
                            <h3 style={{ width: "38%" }}>Student Personal Details</h3><hr />
                        </div>


                        <h5 style={{ width: "32%" }}>Name and Date of Birth</h5><hr />

                        <div className="row" style={{ justifyContent: "space-between" }}>
                            <div className="col-md-4">

                                <p>Full Name <span className="text-danger">*</span> </p>
                                <input type="text" className="form-control" id="fname" ref={(el) => (inputRef.current[0] = el)} name="Full_Name" onChange={(e) => setName(e.target.value)} />
                                {renderRequired(name)}
                            </div>

                            <div className="col-md-3">
                                <p>Date of Birth <span className="text-danger">*</span></p>

                                <div className="date_area input-group date form_date"  >

                                    <input className="form-control"
                                        type="date"
                                        ref={(el) => (inputRef.current[1] = el)}
                                        name="Date_of_Birth" id="startdate"
                                        onChange={(e) => setDob(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e)}
                                    /><br />
                                    <div>
                                        {renderRequired(dob)}
                                    </div>


                                </div>
                            </div>
                            <div className="col-md-4" style={{ textAlign: "center" }}>
                                <p style={{ margin: " 0.8em 5em" }}>Gender <span className="text-danger">*</span></p>
                                <label className="radio-inline">
                                    <input type="radio" name="Gender" ref={(el) => (inputRef.current[2] = el)} value={"Male"} onChange={(e) => setGender(e.target.value)} />Male
                                </label>
                                <label className="radio-inline" style={{ marginLeft: "2em" }}>
                                    <input type="radio" name="Gender" ref={(el) => (inputRef.current[3] = el)} value={"Female"} onChange={(e) => setGender(e.target.value)} />Female
                                </label>
                                {renderRequired(gender)}
                            </div>


                            {/* </div> */}
                        </div>

                        <div className="row" style={{ justifyContent: "space-between", marginTop: "38px" }}>
                            <div className="col-md-3">
                                <p>Self-attested passport size photo with signature<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                <p><input type="file" ref={(el) => (inputRef.current[4] = el)} name="Self_attested_Passport_size_photo_with_signature" onChange={(e) => { setPsp(e.target.files[0]); checkfile(e.target.files[0]) }} /></p>
                                {renderRequired(psp)}{isImageFile(psp)}

                            </div>
                            <div className="col-md-3">
                                <p>Student's bank account proof<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                <p><input type="file" ref={(el) => (inputRef.current[5] = el)} name="Students_Bank_Account_proof" multiple onChange={(e) => setSbs(e.target.files[0])} /></p>
                                {renderRequired(sbs)}
                            </div>
                            <div className="col-md-3">
                                <p>Adhaar card<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                <p><input type="file" ref={(el) => (inputRef.current[6] = el)} name="Adhaar_Card" multiple onChange={(e) => setAdh(e.target.files[0])} /></p>
                                {renderRequired(adh)}

                            </div>
                        </div>
                    </div>

                    {/* <h5 className='parentsname' style={{ width: "22%" }}>Parents Details</h5><hr />
                                    <br /> */}
                    <div className='plusheading' style={{ display: "flex" }}>
                        <h5 style={{ width: "22%" }}>Father Details</h5>
                        {/* {!isVisible ? <span style={{ alignSelf: "center" }}><i className="ri-add-fill" onClick={viewVisibility}></i></span> : <span style={{ alignSelf: "center" }}><i className="ri-indeterminate-circle-line" onClick={hideVisibility}></i></span>} */}
                    </div>
                    {isVisible ? <div>
                        <div className="row">

                            <div className="col-md-4">
                                <p>Father’s Name <span className="text-danger">*</span></p>
                                <input type="text" id="company" ref={(el) => (inputRef.current[7] = el)} name="Father_or_Guardian_Name" value={fname} className="form-control" onChange={(e) => setFname(e.target.value)} />
                                {renderRequired(fname)}
                            </div>

                            <div className="col-md-4">
                                {/* <p>Mother’s Name: <span className="text-danger">*</span></p>
                                            <input type="text" id="company" name="Mother_Name" value="" className="form-control" /> */}
                                <p>Father’s Occupation <span className="text-danger">*</span></p>
                                <input type="text" id="Occupation" value={fo} name="Father_Occupation" ref={(el) => (inputRef.current[8] = el)} className="form-control" onChange={(e) => setFo(e.target.value)} />
                                {renderRequired(fo)}
                            </div>
                            <div className="col-md-4">
                                <p>Annual Income <span className="text-danger">*</span></p>
                                <input type="number" id="Income" ref={(el) => (inputRef.current[9] = el)} value={fai} name="Annual_Income" onChange={(e) => setFai(e.target.value)} className="form-control" />
                                {incomeRequired(fai)}
                            </div>


                        </div>
                        <br /> <div className="row">

                            <div className="col-md-4">
                                <p>Office Phone No <span className="text-danger">*</span></p>
                                <input type="number" id="Officephone" ref={(el) => (inputRef.current[10] = el)} value={foph} name="Phone" onChange={(e) => setFoph(e.target.value)} className="form-control" />
                                {checkphone(foph)}
                            </div>
                            <div className="col-md-8">
                                <p>Office Address <span className="text-danger">*</span></p>
                                <p><textarea className="form-control" ref={(el) => (inputRef.current[11] = el)} value={foa} name="Office_Address" id="OfficeAddress" onChange={(e) => setFoa(e.target.value)}></textarea>
                                    {checkLength(foa)}
                                </p>

                            </div>

                        </div>

                        <br /> <div className="row" style={{ justifyContent: "space-between" }}>

                            <div className="col-md-3">
                                <p>Father's ID Proof<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                <p><input type="file" name="Father's_ID_Proof" ref={(el) => (inputRef.current[12] = el)} onChange={(e) => setFip(e.target.files[0])} /></p>
                                {renderRequired(fip)}
                            </div>

                            <div className="col-md-3">
                                <p>Father's Bank Statement(Past 6 months)<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                <p><input type="file" name="Father's_Bank_Statement" ref={(el) => (inputRef.current[13] = el)} multiple onChange={(e) => setFbs(e.target.files[0])} /></p>
                                {renderRequired(fbs)}
                            </div>
                            <div className="col-md-3">
                                <p>Self-attested photograph of parents<br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                <p><input type="file" ref={(el) => (inputRef.current[14] = el)} name="Self-attested_photograph_of_parents" multiple onChange={(e) => setPop(e.target.files[0])} /></p>
                                {renderRequired(pop)}

                            </div>
                        </div>
                    </div> : null}

                    <div className='plusheading' style={{ display: "flex" }}>
                        <h5 style={{ width: "24%" }}>Address Details</h5>
                        {/* {!isVisible1 ? <span style={{ alignSelf: "center" }}><i className="ri-add-fill" onClick={viewVisibility1}></i></span> : <span style={{ alignSelf: "center" }}><i className="ri-indeterminate-circle-line" onClick={hideVisibility1}></i></span>} */}
                    </div>

                    <br /> {isVisible1 ? <div>
                        <div className="row" style={{ justifyContent: "space-between" }}>
                            <div className="col-md-4">
                                <p>Address <span className="text-danger">*</span></p>
                                <p><textarea className="form-control" ref={(el) => (inputRef.current[15] = el)} name="Address" id="address" onChange={(e) => setAdd(e.target.value)}></textarea>{renderRequired(add)}
                                    {checkLength(add)}
                                </p>

                            </div>

                            <div className="col-md-3">
                                <p>Post Office <span className="text-danger">*</span></p>
                                <input type="text" id="Post" ref={(el) => (inputRef.current[16] = el)} name="Post_Office" onChange={(e) => setPo(e.target.value)} className="form-control" />
                                {renderRequired(po)}
                            </div>

                            <div className="col-md-3">
                                <p>Pincode <span className="text-danger">*</span></p>
                                <input type="number" ref={(el) => (inputRef.current[17] = el)} id="Pincode" name="Pincode" onChange={(e) => setPin(e.target.value)} className="form-control" />
                                {checkpin(pin)}
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-4">
                                <p>Police Station <span className="text-danger">*</span></p>
                                <input type="text" ref={(el) => (inputRef.current[18] = el)} id="Police_Station" name="Police_Station" onChange={(e) => setPs(e.target.value)} className="form-control" />
                                {renderRequired(ps)}
                            </div>

                            <div className="col-md-8">
                                <p>Municipality/Panchayat details <span className="text-danger">*</span></p>
                                <p><textarea className="form-control" ref={(el) => (inputRef.current[19] = el)} name="Municipality/Panchayat_details" id="Municipality/Panchayat_details" onChange={(e) => setMun(e.target.value)}></textarea>{renderRequired(mun)}
                                    {checkLength(mun)}
                                </p>
                            </div>

                        </div>
                    </div> : null}

                    <h5 style={{ width: "24%" }}>Contact Details</h5><hr />
                    <br />

                    <div className="row">
                        <div className="col-md-4">
                            <p>Phone No <span className="text-danger">*</span></p>
                            <p></p>
                            <input type="number" id="Phone" name="Phone" ref={(el) => (inputRef.current[20] = el)} className="form-control" onChange={(e) => setPh(e.target.value)} />
                            {checkphone(ph)}
                        </div>

                        <div className="col-md-4">
                            <p>Alternate No</p>
                            <input type="text" id="Alternate" name="Alternate_No" onChange={(e) => setAph(e.target.value)} className="form-control" />
                            {checkphone(aph)}
                        </div>

                        <div className="col-md-4">
                            <p>Email id <span className="text-danger">*</span></p>
                            <input type="email" ref={(el) => (inputRef.current[21] = el)} id="email" name="Email" className="form-control" onChange={(e) => setEi(e.target.value)} />
                            {checkEmail(ei)}
                        </div>

                    </div>



                    <br />

                    <div className='plusheading' style={{ display: "flex" }}>
                        <h5 style={{ width: "24%" }}>Mother Details</h5>
                        {/* {!isVisible2 ? <span style={{ alignSelf: "center" }}><i className="ri-add-fill" onClick={viewVisibility2}></i></span> : <span style={{ alignSelf: "center" }}><i className="ri-indeterminate-circle-line" onClick={hideVisibility2}></i></span>} */}
                    </div>
                    {isVisible2 ? <div>
                        <div className="row">

                            <div className="col-md-4">
                                <p>Mother’s Name <span className="text-danger">*</span></p>
                                <input type="text" id="company" ref={(el) => (inputRef.current[22] = el)} name="Father_or_Guardian_Name" onChange={(e) => setMn(e.target.value)} className="form-control" />
                                {renderRequired(mn)}
                            </div>

                            <div className="col-md-4">
                                {/* <p>Mother’s Name: <span className="text-danger">*</span></p>
                                            <input type="text" id="company" name="Mother_Name" value="" className="form-control" /> */}
                                <p>Mother’s Occupation <span className="text-danger">*</span></p>
                                <input type="text" id="Occupation" ref={(el) => (inputRef.current[23] = el)} name="Father_Occupation" onChange={(e) => setMo(e.target.value)} className="form-control" />
                                {renderRequired(mo)}
                            </div>
                            <div className="col-md-4">
                                <p>Annual Income <span className="text-danger">*</span></p>
                                <input type="number" id="Income" ref={(el) => (inputRef.current[24] = el)} name="Annual_Income" onChange={(e) => setMai(e.target.value)} className="form-control" />
                                {incomeRequired(mai)}
                            </div>

                        </div>
                        <br /> <div className="row">


                            <div className="col-md-4">
                                <p>Office Phone No <span className="text-danger">*</span></p>
                                <input type="number" ref={(el) => (inputRef.current[25] = el)} id="Officephone" name="Phone" onChange={(e) => setMoph(e.target.value)} className="form-control" />
                                {checkphone(moph)}
                            </div>
                            <div className="col-md-8">
                                <p>Office Address <span className="text-danger">*</span></p>
                                <p><textarea className="form-control" ref={(el) => (inputRef.current[26] = el)} name="Office_Address" id="OfficeAddress" onChange={(e) => setMoa(e.target.value)}></textarea>{renderRequired(moa)}
                                    {checkLength(moa)}
                                </p>
                            </div>

                        </div>

                        <br /> <div className="row" style={{ justifyContent: "space-between" }}>
                            <div className="col-md-4">
                                <p>Mother's ID Proof<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                <p><input type="file" name="Mother's_ID_Proof" ref={(el) => (inputRef.current[27] = el)} multiple onChange={(e) => setMip(e.target.files[0])} /></p>
                                {renderRequired(mip)}

                            </div>
                            <div className="col-md-4">
                                <p>Mother's Bank Statement(Past 6 months)<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                <p><input type="file" name="Mother's_Bank_Statement" ref={(el) => (inputRef.current[28] = el)} multiple onChange={(e) => setMbs(e.target.files[0])} /></p>
                                {renderRequired(mbs)}

                            </div>

                        </div>
                    </div> : null}

                    <br />

                    <div id="q1" className="q">
                        <div className='plusheading' style={{ display: "flex" }}>
                            <h5 style={{ width: "34%" }}>Education Details</h5>
                            {/* {!isVisible3 ? <span style={{ alignSelf: "center" }}><i className="ri-add-fill" onClick={viewVisibility3}></i></span> : <span style={{ alignSelf: "center" }}><i className="ri-indeterminate-circle-line" onClick={hideVisibility3}></i></span>} */}
                        </div>
                        {isVisible3 ? <div>
                            <h5 style={{ width: "14%" }}>Class X</h5><hr />


                            <div className="row">
                                <div className="col-md-3">
                                    <p>Name of School<span className="text-danger">*</span></p>
                                    <input type="text" id="SchoolName" ref={(el) => (inputRef.current[29] = el)} name="Educational_Qualification_Name_of_School-Class_X" onChange={(e) => setNos(e.target.value)} className="form-control" />
                                    {renderRequired(nos)}
                                </div>

                                <div className="col-md-3">
                                    <p>Year Of Passing<span className="text-danger">*</span></p>
                                    <input type="date" id="xpassingyear" ref={(el) => (inputRef.current[30] = el)} name="Passing_year_Class_X" onChange={(e) => setXpYear(formatDate(e.target.value))} className="form-control" onKeyDown={(e) => handleKeyDown(e)} />
                                    {renderRequired(xpYear)}
                                </div>

                                <div className="col-md-3">
                                    <p>Name of Board/University<span className="text-danger">*</span></p>
                                    <input type="text" id="School_10_Board" ref={(el) => (inputRef.current[31] = el)} name="Educational_Qualification_Name_of_Board_or_University-Class_X" onChange={(e) => setNob(e.target.value)} className="form-control" />
                                    {renderRequired(nob)}
                                </div>

                                <div className="col-md-3">
                                    <p>Marks Obtained (In Percentage)<span className="text-danger">*</span></p>
                                    <input type="number" id="Marks_x" ref={(el) => (inputRef.current[32] = el)} name="Marks_Obtained_in_Class_X" onChange={(e) => setNom(e.target.value)} className="form-control" />
                                    {renderRequired(nom)}
                                </div>

                            </div>
                            <br />

                            <h5 style={{ width: "14%" }}>Class XII</h5><hr />



                            <div className="row">
                                <div className="col-md-3">
                                    <p>Name of School<span className="text-danger">*</span></p>
                                    <input type="text" id="School_12" ref={(el) => (inputRef.current[33] = el)} name="Educational_Qualification:_Name_of_School-Class_XII" onChange={(e) => setNos2(e.target.value)} className="form-control" />
                                    {renderRequired(nos2)}
                                </div>
                                <div className="col-md-3">
                                    <p>Year Of Passing<span className="text-danger">*</span></p>
                                    <input type="date" id="xiipassingyear" ref={(el) => (inputRef.current[34] = el)} name="Passing_year_Class_Xii" onChange={(e) => setXiipYear(formatDate(e.target.value))} className="form-control" onKeyDown={(e) => handleKeyDown(e)} />
                                    {renderRequired(xiipYear)}
                                </div>

                                <div className="col-md-3">
                                    <p>Name of Board/University<span className="text-danger">*</span></p>
                                    <input type="text" id="School_12_Board" ref={(el) => (inputRef.current[35] = el)} name="Educational_Qualification:_Name_of_Board_or_University-Class_XII" onChange={(e) => setNob2(e.target.value)} className="form-control" />
                                    {renderRequired(nob2)}
                                </div>

                                <div className="col-md-3">
                                    <p>Marks Obtained (In Percentage)<span className="text-danger">*</span></p>
                                    <input type="number" id="Marks_12" ref={(el) => (inputRef.current[36] = el)} name="Marks_Obtained_in_Class_XII" onChange={(e) => setMo2(e.target.value)} className="form-control" />
                                    {renderRequired(mo2)}
                                </div>
                            </div>
                            <br />

                            <h5>Last Exam/Sem Details</h5><hr />



                            <div className="row">
                                <div className="col-md-3">
                                    <p>Last Exam Name</p>
                                    <input type="text" id="School_12" name="Educational_Qualification:_Name_of_School-Class_XII" onChange={(e) => setLastexam(e.target.value)} className="form-control" />

                                </div>
                                <div className="col-md-2">
                                    <p>Year Of Passing</p>
                                    <input type="date" id="xiipassingyear" name="Passing_year_Class_Xii" onChange={(e) => setLeYear(formatDate(e.target.value))} className="form-control" onKeyDown={(e) => handleKeyDown(e)} />

                                </div>

                                <div className="col-md-2">
                                    <p>Name of College</p>
                                    <input type="text" id="School_12_Board" name="Educational_Qualification:_Name_of_Board_or_University-Class_XII" onChange={(e) => setLecollege(e.target.value)} className="form-control" />
                                    {/* {renderRequired(nob2)} */}
                                </div>

                                <div className="col-md-2">
                                    <p>Marks(Percentage)</p>
                                    <input type="number" id="Marks_12" name="Marks_Obtained_in_Class_XII" onChange={(e) => setLemarks(e.target.value)} className="form-control" />
                                    {/* {renderRequired(mo2)} */}
                                </div>

                                <div className="col-md-3">
                                    <p>Exam Marksheet (pdf)<br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                    <p><input type="file" name="Permanent_address_proof" onChange={(e) => { setMarksdoc(e.target.files[0]); checkpdf(e.target.files[0]) }} /></p>
                                    <p style={{ display: ispdf2 === true ? "none" : "block", color: "red" }}>(Only pdf File Allowed)</p>

                                </div>
                            </div>
                        </div> : null}

                        <br />

                        <div className='plusheading' style={{ display: "flex" }}>
                            <h5 style={{ width: "37%" }}>Scholarship Details</h5>
                            {/* {!isVisible4 ? <span style={{ alignSelf: "center" }}><i className="ri-add-fill" onClick={viewVisibility4}></i></span> : <span style={{ alignSelf: "center" }}><i className="ri-indeterminate-circle-line" onClick={hideVisibility4}></i></span>} */}
                        </div>

                        {isVisible4 ?
                            <div>
                                <div className="row">


                                    <div className="col-md-3">
                                        <p>Course opted for <span className="text-danger">*</span></p>


                                        <select name="Course_opted_for" ref={(el) => (inputRef.current[37] = el)} className="form-control" onChange={(e) => setCof(e.target.value)}>
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

                                    <div className="col-md-3">
                                        <p>Subjects <span className="text-danger">*</span></p>
                                        <input type="text" id="subjects" ref={(el) => (inputRef.current[38] = el)} name="subjects" onChange={(e) => setSubject(e.target.value)} className="form-control" placeholder='e.g physics,chemistry' />
                                        {renderRequired(subject)}
                                    </div>


                                    <div className="col-md-3">
                                        <p>Name of college(Current) <span className="text-danger">*</span></p>
                                        <input type="text" id="University_name" ref={(el) => (inputRef.current[39] = el)} name="Name_of_College_or_University" onChange={(e) => setNoc(e.target.value)} className="form-control" />
                                        {renderRequired(noc)}
                                    </div>


                                    <div className="col-md-3">
                                        <p>Are you the first to attend college from your family <span className="text-danger">*</span></p>
                                        <div style={{ textAlign: "center" }}>
                                            <label className="radio-inline">
                                                <input type="radio" ref={(el) => (inputRef.current[40] = el)} name="AttClg" value="Yes" onChange={(e) => setAttclg(e.target.value)} />Yes
                                            </label>
                                            <label className="radio-inline" style={{ marginLeft: "33px" }}>
                                                <input type="radio" ref={(el) => (inputRef.current[41] = el)} name="AttClg" value="No" onChange={(e) => setAttclg(e.target.value)} />No
                                            </label>
                                        </div>
                                        {renderRequired(attclg)}
                                    </div>

                                </div>
                                <br />

                                <hr />
                                <div className="row">


                                    <div className="col-md-3" >
                                        <p className="heightadjust">Reason for seeking scholarship.<span className="text-danger">*</span></p>
                                        <p><textarea className="form-control" name="Reason_for_seeking_scholarship" id="Reason_scholarship" maxLength={200} ref={(el) => (inputRef.current[42] = el)} onChange={(e) => setRos(e.target.value)}></textarea>{renderRequired(ros)}
                                            {checkLength(ros)}
                                        </p>
                                    </div>


                                    <div className="col-md-3">
                                        <p >Talk about a time you overcame a challenge.<span className="text-danger">*</span></p>
                                        <p><textarea className="form-control" ref={(el) => (inputRef.current[43] = el)} name="Talk_About_A_Time_You_Overcame_A_Challenge" id="Overcame_Challenge" onChange={(e) => setClng(e.target.value)}></textarea>{renderRequired(clng)}
                                            {checkLength(clng)}
                                        </p>
                                    </div>


                                    <div className="col-md-3">
                                        <p>What are your strengths and weaknesses? <span className="text-danger">*</span></p>
                                        <p><textarea className="form-control" ref={(el) => (inputRef.current[44] = el)} name="What_are_your_Strengths_And_Weaknesses" id="Strengths_Weaknesses" onChange={(e) => setStr(e.target.value)}></textarea>{renderRequired(str)}{checkLength(str)}</p>
                                    </div>

                                    <div className="col-md-3">
                                        <p>Current Education <br />Status <span className="text-danger">*</span></p>
                                        <p><textarea className="form-control" name="Current_Education_Status" ref={(el) => (inputRef.current[45] = el)} id="Current_Education_Status" placeholder="What are you currently studying or what semester you are in." onChange={(e) => setCes(e.target.value)}></textarea>{renderRequired(ces)}{checkLength(ces)}</p>
                                    </div>

                                </div>
                                <br />
                                <hr />

                                <div className="row">


                                    <div className="col-md-3">
                                        <p>I am a deserving candidate for the scholarship because ...(240 words)<span className="text-danger">*</span></p>
                                        <p><textarea className="form-control" ref={(el) => (inputRef.current[46] = el)} name="I_am_a_deserving_candidate_for_the_scholarship_because" id="deserving_scholarship" onChange={(e) => setSb(e.target.value)}></textarea>{renderRequired(sb)}
                                            {checkLength(sb)}</p>
                                    </div>


                                    <div className="col-md-3">
                                        <p>Are you availing of any other scholarship<span className="text-danger">*</span></p>
                                        <div style={{ textAlign: "center" }}>
                                            <label className="radio-inline">
                                                <input type="radio" ref={(el) => (inputRef.current[47] = el)} name="AOS" id="avail_yes" value="Yes" onChange={(e) => setAos(e.target.value)} />Yes
                                            </label>
                                            <label className="radio-inline" style={{ marginLeft: "33px" }}>
                                                <input type="radio" ref={(el) => (inputRef.current[48] = el)} name="AOS" id="avail_no" value="No" onChange={(e) => setAos(e.target.value)} />No
                                            </label>
                                            <p>
                                                {renderRequired(aos)}
                                            </p>
                                        </div>
                                    </div>



                                    <div className="col-md-3">
                                        <p className="heightadjust">Is there any other information you want to add? <span className="text-danger">*</span></p>
                                        <p><textarea className="form-control" ref={(el) => (inputRef.current[49] = el)} name="Is_there_any_other_information_you_want_to_add" id="add_information" onChange={(e) => setOia(e.target.value)}></textarea>{renderRequired(oia)}
                                            {checkLength(oia)}
                                        </p>
                                    </div>


                                    <div className="col-md-3">
                                        <p className="heightadjust">How would you contribute towards improving or giving back to society in the future? <span className="text-danger">*</span></p>
                                        <p><textarea className="form-control" ref={(el) => (inputRef.current[50] = el)} name="How_would_you_contribute_towards_improving_or_giving_back_to_society_in_the_future" id="add_information" onChange={(e) => setFut(e.target.value)}></textarea>{renderRequired(fut)}
                                            {checkLength(fut)}
                                        </p>
                                    </div>

                                </div>
                                <br />

                            </div>

                            : null}
                    </div>

                    <div id="q2" className="q">

                        <div className='plusheading' style={{ display: "flex" }}>
                            <h5 style={{ width: "36%" }}>Upload Documents</h5>
                            {/* {!isVisible5 ? <span style={{ alignSelf: "center" }}><i className="ri-add-fill" onClick={viewVisibility5}></i></span> : <span style={{ alignSelf: "center" }}><i className="ri-indeterminate-circle-line" onClick={hideVisibility5}></i></span>} */}
                        </div>
                        {isVisible5 ? <div>
                            <div className="row" style={{ justifyContent: "space-between" }}>

                                <div className="col-md-4">
                                    <p>Permanent address proof<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                    <p><input type="file" name="Permanent_address_proof" ref={(el) => (inputRef.current[51] = el)} onChange={(e) => setPap(e.target.files[0])} /></p>
                                    {renderRequired(pap)}

                                </div>
                                <div className="col-md-4">
                                    <p>Income declaration<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                    <p><input type="file" ref={(el) => (inputRef.current[52] = el)} name="Income_declaration" multiple onChange={(e) => setId(e.target.files[0])} /></p>
                                    {renderRequired(id)}

                                </div>



                            </div>

                            <br /><hr />


                            <div className="row" style={{ justifyContent: "space-between" }}>
                                <div className="col-md-4">
                                    <p>Attested copies of mark sheet of all previous exams<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span><br /><span className="text-danger">(UG marks incase of PG candidate also to be included)</span></p>
                                    <p><input type="file" ref={(el) => (inputRef.current[53] = el)} name="Attested_copies_of_mark_sheet_of_previous_exams" multiple onChange={(e) => setMsp(e.target.files[0])} /></p>
                                    {renderRequired(msp)}
                                </div>

                                <div className="col-md-4">
                                    <p>Institution verification form<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                    <p><input type="file" ref={(el) => (inputRef.current[54] = el)} name="Institution_Verification_Form" multiple onChange={(e) => setIvf(e.target.files[0])} /></p>
                                    {renderRequired(ivf)}
                                </div>

                            </div>
                            <br /><hr />

                            <div className="row" style={{ justifyContent: "space-between" }}>
                                <div className="col-md-4">
                                    <p>Institute acceptance<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                    <p><input type="file" ref={(el) => (inputRef.current[55] = el)} name="Institute_acceptance" multiple onChange={(e) => setIa(e.target.files[0])} /></p>
                                    {renderRequired(ia)}

                                </div>

                                <div className="col-md-4">
                                    <p>Fee structure of current course year wise<span className="text-danger">*</span><br /><span className="text-danger">File Size : Max 600 KB</span></p>
                                    <p><input type="file" ref={(el) => (inputRef.current[56] = el)} name="Fee_Structure_of_current_course_year_wise" multiple onChange={(e) => setFsc(e.target.files[0])} /></p>
                                    {renderRequired(fsc)}

                                </div>

                            </div>


                        </div> : null}
                        <br /><hr />


                        {/* <span id="zxcv" style={{ display: "none" }}><div className="alert alert-info" role="alert">Submitting form..Please wait...</div></span> */}



                        {/* <p className="text-right">The right of selection lies at the discretion of the screening committee.</p> */}

                    </div><br />
                    {/* </div> */}
                </form>
                {isAlert && <AlertSuccesfull />}


            </div>
            <div style={{ textAlign: "end", margin: "70px" }}> <button className={`btn btn-primary ${files}`} disabled={isStudentExist} onClick={postdata} style={{ width: "160px" }}>SUBMIT </button></div>
        </div>

    </>
)
}

export default Form