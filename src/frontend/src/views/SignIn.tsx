import React from "react";
import backgroundImage from "@assets/images/cta.jpg";
import { Link } from "react-router-dom";
import AuthService from "../AuthService";

const SignIn = () => {
    const signIn = () => {
        AuthService.login();
    }

    return (
        <div className="font-nunito text-base text-black dark:text-white dark:bg-slate-900" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <section className={`md:h-screen py-36 flex items-center bg-no-repeat bg-center bg-cover`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                   <div className="container">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                            <h5 className="my-6 mt-2 text-xl text-center font-semibold">Login</h5>
                            {/* <form className="ltr:text-left rtl:text-right"> */}
                                <div className="grid grid-cols-1">
                                    {/* <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                        <input id="LoginEmail" type="email" className="form-input mt-3" placeholder="name@example.com" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                                        <input id="LoginPassword" type="password" className="form-input mt-3" placeholder="Password:" />
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <label htmlFor="RememberMe" className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox border dark:border-gray-700 rounded text-indigo-600" />
                                            <span className="text-slate-400 ml-2">Remember me</span>
                                        </label>
                                        <p className="text-slate-400 mb-0">
                                            <Link to="/reset-password" className="text-slate-400">Forgot password ?</Link>
                                        </p>
                                    </div> */}
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
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
   )
}

export default SignIn;