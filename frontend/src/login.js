// import React, { createContext, useState, useContext } from 'react'
// // import "../App.css";
// import axios from 'axios';

// import { Link, useNavigate } from 'react-router-dom';
// import Home from './home';



// const Login = () => {
//     const [email, setEmail] = useState();
//     const [id, setId] = useState("s");
//     const [password, setPassword] = useState();
//     const [path, setPath] = useState("");
//     const [st, setSt] = useState({ display: "none" });
//     const [remind, setRemind] = useState("");
//     const navigate = useNavigate();

//     async function postdata(e) {
//         e.preventDefault();
//         const value = await axios.post('http://192.168.1.8:8000/register', {
//             username: email, pass: password
//         });
//         console.log(value);
//         // if (email === value.data[0].username && password === value.data[0].mypassword) {
//             navigate("/register")
//         // }



//     }


//     return (<>
//         <div class="container">
//             <img src="qlogo.jpg" style={{ width: "15em" }} alt='logo' />
//         </div>
//         <div class="container">
//             <div class="row" style={{ alignItems: "center" }}>
//                 <div class="col-lg-6">
//                     <h2>Scholarship Management System</h2>
//                 </div>
//                 <div class="col-lg-6">
//                     {/* <ContextProvider ids={id} /> */}
//                     <div className="container login" style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         marginTop: "3em"
//                     }}>
//                         <form >
//                             {/* <!-- Email input --> */}
//                             <div className="form-outline mb-4">
//                                 <input type="email" id="form2Example1" placeholder='User Id' className="form-control" onChange={(e) => setEmail(e.target.value)} />
//                                 {/* <label className="form-label" for="form2Example1">Email address</label> */}
//                             </div>

//                             {/* <!-- Password input --> */}
//                             <div className="form-outline mb-4">
//                                 <input type="password" id="form2Example2" placeholder='Password' className="form-control" onChange={(e) => setPassword(e.target.value)} />
//                                 {/* <label className="form-label" for="form2Example2">Password</label> */}
//                             </div>

//                             <div className="row mb-4">
//                                 <div className="col d-flex justify-content-center">
//                                     {/* <!-- Checkbox --> */}
//                                     <div className="form-check">
//                                         <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
//                                         <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
//                                     </div>
//                                 </div>

//                                 <div className="col">
//                                     {/* <!-- Simple link --> */}
//                                     <Link to={"/register"}>Forgot password?</Link>
//                                 </div>
//                             </div>


//                             {/* <!-- Submit button --> */}
//                             <Link to={"#"}>
//                                 <button type="button" className="btn btn-primary btn-block mb-4" style={{ width: '100%' }} onClick={postdata}>Log in</button>
//                             </Link>


//                             <p style={st}>invalid email or password</p>
//                             <p>{remind}</p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     </>
//     )
// }


// export default Login



import React, { createContext, useState, useContext } from 'react'
// import "../App.css";
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import Home from './home';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Indexpage from './indexpage';


export const UserContext = createContext();


const Login = () => {
    const [email, setEmail] = useState("abc");
    const [id, setId] = useState("s");
    const [password, setPassword] = useState();
    const [path, setPath] = useState("");
    const [st, setSt] = useState({ display: "none" });
    const [remind, setRemind] = useState("");
    const navigate = useNavigate();

    console.log(email);
    // async function postdata(e) {
    //     e.preventDefault();
    //     const value = await axios.post('http://103.184.242.25:8000/register', {
    //         username: email, pass: password
    //     });
    //     console.log(value);

    //     console.log(value.data.id);
    //     localStorage.setItem("studentid", value.data.id)
    //     localStorage.setItem("username", value.data.username)
    //     if (email === "admin" && password === "admin123") {
    //         navigate("/indexpage")
    //     } else {
    //         navigate("/formlayout")
    //     }




    // }

    async function postdata(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register', {
                username: email,
                pass: password
            });

            console.log(response);
            const value = response.data;

            if (response.status === 200) {
                console.log(value.id);
                localStorage.setItem("userid", 7);
                // localStorage.setItem("username", value.username);

                if (email === "admin" && password === "admin123") {
                    navigate("/home");
                } else {
                    navigate("/home");
                }
            } else if (response.status === 500) {
                alert("Invalid Email or Password");
            }
        } catch (error) {
            console.error(error);
            alert("Please Check your Email And Password");
        }
    }


    const location = useLocation();

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    }, []);


    return (
        <>
            {/* <div class="container" style={{background:"url("assets/img/bimage.jpg")"}}>
                <img src="assets/img/neologo.jpg" style={{ width: "25em",marginTop:"2em" }} alt='logo' />
            </div> */}
            <div className="container" >
                <img src="assets/img/neologo.jpg" style={{ width: "25em", marginTop: "2em" }} alt="logo" />
                {/* </div> */}

                <div class="container logincon">
                    <div class="row" style={{ alignItems: "center" }}>
                        <div class="col-lg-6" style={{ margin: "56px 0" }}>
                            <h2>Scholarship Management System (Demo)</h2>
                            <img src='assets/img/bimage.jpg' style={{ width: "100%" }} />
                        </div>
                        <div class="col-lg-6">
                            <div style={{ textAlign: "center" }}>
                                <h3>Log In</h3>
                            </div>
                            {/* <ContextProvider ids={id} /> */}
                            <div className="container login" style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "3em"
                            }}>


                                <form >
                                    {/* <!-- Email input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="email" id="form2Example1" placeholder='User Id' className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                        {/* <label className="form-label" for="form2Example1">Email address</label> */}
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="password" id="form2Example2" placeholder='Password' className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                        {/* <label className="form-label" for="form2Example2">Password</label> */}
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col d-flex justify-content-center">
                                            {/* <!-- Checkbox --> */}

                                        </div>

                                        {/* <div className="col">
                                        
                                        <Link to={"/register"}>Register</Link>
                                    </div> */}
                                    </div>


                                    {/* <!-- Submit button --> */}
                                    <Link to={"#"}>
                                        <button type="button" className="btn btn-primary btn-block mb-4" style={{ width: '100%' }} onClick={postdata}>Log in</button>
                                    </Link>


                                    <p style={st}>invalid email or password</p>
                                    <p>{remind}</p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <img src='qlogo.jpg' alt='qlogo' style={{ width: "106px" }} />
                        <p>Developed And Maintained By <strong>Quobotic Consulting Private Limited</strong></p>
                    </div>

                </div>
            </div>

        </>

    )
}





export default Login


