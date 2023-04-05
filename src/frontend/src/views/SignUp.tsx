import React from "react";
import backgroundImage from "@assets/images/cta.jpg";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="font-nunito text-base text-black dark:text-white dark:bg-slate-900">
            <section className="md:h-screen py-36 flex items-center bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                <div className="container">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                            <h5 className="my-6 text-xl font-semibold">Signup</h5>
                            <form action="auth-signup-success.html" className="ltr:text-left rtl:text-right">
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="RegisterName">Your Name:</label>
                                        <input id="RegisterName" type="text" className="form-input mt-3" placeholder="Harry" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                        <input id="LoginEmail" type="email" className="form-input mt-3" placeholder="name@example.com" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                                        <input id="LoginPassword" type="password" className="form-input mt-3" placeholder="Password:" />
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-center w-full mb-0">
                                            <input className="form-checkbox text-indigo-600 rounded w-4 h-4 ltr:mr-2 rtl:ml-2 border border-inherit" type="checkbox" value="" id="AcceptT&C" />
                                            <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">I Accept <a href="" className="text-indigo-600">Terms And Condition</a></label>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <input type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" value="Register" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-slate-400 ltr:mr-2 rtl:ml-2">Already have an account ? </span> 
                                        <Link to="/signin" className="text-black dark:text-white font-bold inline-block">Sign in</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
   )
}

export default SignUp;