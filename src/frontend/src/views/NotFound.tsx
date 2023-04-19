import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
        <section className="relative bg-indigo-600/5">
            <div className="container-fluid relative">
                <div className="grid grid-cols-1">
                    <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                        <div className="title-heading text-center my-auto">
                            <img src={require("./../assets/images/404.svg")} className="w-1/5 mx-auto" alt="" />
                            <h1 className="mt-3 mb-6 md:text-5xl text-3xl font-bold">Page Not Found?</h1>
                            <p className="text-slate-400">Whoops, this is embarassing. <br/> Looks like the page you were looking for wasn't found.</p>           
                            <div className="mt-4">
                                <Link to="/" className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md">Back to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default NotFound;