import React from 'react'
import StudentInput from './studentsearch'

const Studentform = () => {

    return (
        <>

            <div class="container" style={{ backgroundColor: "#f6f9ff" }}>
                <h2>Student Registration</h2>

                {/* <ContextProvider ids={id} /> */}
                <div className="container" style={{
                    marginTop: "3em"
                }}>
                    {/* <form style={{ backgroundColor: "white", padding:"36px" }} id="forms"> */}
                    <div id="q0" class="q">
                        <div>
                            <StudentInput />
                        </div>
                    </div>

                    {/* </form> */}

                </div>
                {/* <div style={{textAlign:"end",margin:"70px"}}> <button className={`btn btn-primary ${files}`} onClick={postdata} style={{width:"160px"}}>SUBMIT </button></div><hr/> */}

            </div>


        </>
    )
}


export default Studentform