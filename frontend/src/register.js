import React, { createContext, useState, useContext } from 'react'
// import "../App.css";
import axios from 'axios';

// import { Link ,useNavigate} from 'react-router-dom';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './home';




const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    async function postdata(e) {
        e.preventDefault();
        const value = await axios.post('http://localhost:8000/registeruser', {
            username: email, pass: password
        }).then(res => console.log(res))
        navigate("/")

    }


    return (<>
        <div class="container">
            <img src="qlogo.jpg" style={{ width: "15em" }} alt='logo' />
        </div>
        <div class="container">
            <div class="row" style={{ alignItems: "center" }}>
                <div class="col-lg-6">
                    <h2>Scholarship Management System</h2>
                </div>
                <div class="col-lg-6">
                    {/* <ContextProvider ids={id} /> */}
                    <div className="container login" style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "3em"
                    }}>
                        <form >
                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <input type="email" id="form2Example1" placeholder='Email address' className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                {/* <label className="form-label" for="form2Example1">Email address</label> */}
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-4">
                                <input type="text" id="form2Example2" placeholder='Password' className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                {/* <label className="form-label" for="form2Example2">Password</label> */}
                            </div>



                            {/* <!-- Submit button --> */}
                            <button type="button" className="btn btn-primary btn-block mb-4" style={{ width: '100%' }} onClick={postdata}>Register</button>


                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}


export default Register;


