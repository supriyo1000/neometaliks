import React, { useEffect, useState } from 'react';

const AlertSuccesfull = () => {
    const [isAlertSuccess, setIsAlertSuccess] = useState(false);



    useEffect(() => {
        isAlertSuccess && window.location.reload()
    },[isAlertSuccess])

    return (
        <>
            <div className='overlay'>
                {/* <!-- Modal HTML --> */}
                <div class="modal" style={{ display: "block" }}>
                    <div class="modal-dialog modal-confirm" style={{
                        display: 'flex',
                        justifyContent: 'center', width: '50vw'
                    }}>
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="icon-box">
                                    <i class="bi bi-check"></i>
                                </div>
                                <h4 class="modal-title w-100">Successfull!</h4>
                            </div>
                            <div class="modal-body">
                                <p class="text-center">Your Data Submitted Successfully!!. </p>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success btn-block" onClick={()=> setIsAlertSuccess(true)}
                                >OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertSuccesfull