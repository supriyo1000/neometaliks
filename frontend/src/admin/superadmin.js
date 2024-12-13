import React from 'react'
import "../test.css"
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CameraComponent from '../components/camera'
import VideoRecorder from '../components/videorecoder'


const Superadmin = () => {
    return (
        <div>
            <Navbar />
            {/* <!-- End Header --> */}

            {/* <!-- ======= Sidebar ======= --> */}
            <Sidebar />
            {/* <!-- End Sidebar--> */}

            <main id="main" class="main" style={{ marginLeft: "240px", position: "relative" }}>

                <div className='adminbox'>

                    <div className='adminhead'>
                        {/* <img src='assets/img/ribbon2.png' /> */}
                        <h2 className='text'>SUPER ADMIN PAGE</h2>
                    </div>
                </div>



                {/* <section class="section dashboard"> */}
                <div className='container spadmincontent'>
                    <div className='row'>
                        <div className='col-md-5' style={{ alignSelf: "center" }}>
                            <div className='style1'>
                                <ul class="list-group">
                                    <li class="list-group-item bg-transparent text-white" style={{ border: "2px solid white" }}>
                                        <div className='listhead'>
                                            <label>ACCESS CONTROL</label>
                                        </div>
                                    </li>

                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label class="form-check-label" for="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-md-4' style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d" style={{ boxShadow: "5px 4px 7px black", border: "0" }}><div class="MuiBox-root css-15m7mkq"><h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi">SET Password</h4>
                                <p class="MuiTypography-root MuiTypography-h4" style={{ color: "white", fontWeight: "bold" }}>NEO METALIKS LTD</p><div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-dp2bsp">

                                </div>
                            </div>
                                <div class="MuiBox-root css-1iu09ww">
                                    <form class="MuiBox-root css-1ircn5c" role="form">
                                        <div class="MuiBox-root css-16pyyvj">
                                            <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-16qtvyo">
                                                <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-1hiu5rg" data-shrink="false" for=":r13:" id=":r13:-label">Email</label>
                                                <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-11fp4xj">
                                                    <input aria-invalid="false" id=":r13:" type="email" class="MuiInputBase-input MuiOutlinedInput-input css-1pvpzft" value="" />
                                                    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-at8z4h">
                                                        <legend class="css-yjsfm1"><span>Email</span></legend></fieldset></div>
                                            </div>
                                        </div>
                                        <div class="MuiBox-root css-16pyyvj"><div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-16qtvyo"><label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-1hiu5rg" data-shrink="false" for=":r14:" id=":r14:-label">Password</label>
                                            <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-11fp4xj">
                                                <input aria-invalid="false" id=":r14:" type="password" class="MuiInputBase-input MuiOutlinedInput-input css-1pvpzft" value="" />
                                                <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-at8z4h">
                                                    <legend class="css-yjsfm1"><span>Password</span></legend></fieldset></div>
                                        </div>
                                        </div>
                                        <div class="MuiBox-root css-oh6zk8"><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">
                                            <input class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox" />
                                            <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                            <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                            <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29">&nbsp;&nbsp;Confirm</span>
                                        </div>
                                        <div class="MuiBox-root css-1id64jh">
                                            <button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-oagsia" tabindex="0" type="button">REGISTER ADMIN<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* </section> */}

            </main>
            {/* <!-- End #main --> */}


            <div style={{ textAlign: "center" }}>
                {/* <VideoRecorder /> */}
                <CameraComponent />
            </div>
            
            






        </div>
    )
}

export default Superadmin