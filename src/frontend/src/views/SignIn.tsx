import React from "react";
import backgroundImage from "@assets/images/cta.jpg";
import { Link } from "react-router-dom";
import AuthService from "../AuthService";

const SignIn = () => {
    const signIn = () => {
        AuthService.signIn();
    }
    
    return (
        <div className="font-nunito text-base text-black dark:text-white dark:bg-slate-900" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <section className={`md:h-screen py-36 flex items-center bg-no-repeat bg-center bg-cover`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                   <div className="container">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                            <h5 className="my-6 mt-2 text-xl text-center font-semibold">Sign In</h5>
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <button className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" onClick={signIn}>
                                          Sign in
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-slate-400 ltr:mr-2 rtl:ml-2">Don't have an account ?</span> 
                                        <Link to="/signup" className="text-black dark:text-white font-bold inline-block">Sign Up</Link>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
   )
}

export default SignIn;