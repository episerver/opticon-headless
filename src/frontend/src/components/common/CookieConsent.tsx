import React, { useState } from "react";
import * as Unicons from '@iconscout/react-unicons';
import { Link } from "react-router-dom";

const CookieConsent = () => {
    const [show, setShow] = useState<Boolean>(true);
    
    const accept = () => {
        setShow(false)
    }

    const deny = () => {
        setShow(false)
    }


    return (
        <>
            {show && <div className="cookie-popup fixed max-w-lg bottom-3 ltr:right-3 rtl:left-3 left-3 sm:left-0 sm:right-0 mx-auto bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md py-5 px-6 z-50">
                <p className="text-slate-400 text-center">
                    This website uses cookies to provide you with a great user experience. By using it, you accept our 
                    By using it, you accept our <Link to="https://shreethemes.in" target="_blank" className="text-emerald-600 dark:text-emerald-500 font-semibold ml-1">use of cookies</Link>
                </p>
                <div className="cookie-popup-actions ltr:text-right rtl:text-left">
                    <button className="absolute border-none bg-none p-0 cursor-pointer font-semibold top-2 ltr:right-2 rtl:left-2" onClick={() => setShow(false)}>
                        <Unicons.UilTimes className="text-dark dark:text-slate-200 text-2xl" />
                    </button>
                </div>
                <div className="flex justify-center mt-3">
                    <button className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md !py-1 !px-3 ltr:mr-2 rtl:ml-2 mt-2" onClick={() => accept()}>Accept</button>
                    <button className="btn bg-transparent border-indigo-600 text-indigo-600 rounded-md mt-2 !py-1 !px-3" onClick={() => deny()}>Deny</button>
                </div>
            </div>}
        </>
   )
}

export default CookieConsent;