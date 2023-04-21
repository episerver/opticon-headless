import DropDown from "@components/common/DropDown";
import TextValue from "@models/common/TextValue";
import React from "react";
import { Mail, User, UserCheck } from "react-feather";

const Setting = () => {
    return (
        <section className="relative lg:pb-24 pb-16 pt-20">
            <div className="container md:mt-16 mt-8">
                <div className="mx-auto">
                    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                        <h5 className="text-center text-2xl font-semibold mb-10">My Setting</h5>
                        <form>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                                <div>
                                    <label className="form-label font-medium">Username : <span className="text-red-600">*</span></label>
                                    <div className="form-icon relative mt-2">
                                        <User className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4"/>
                                        <input type="text" className="form-input ltr:pl-12 rtl:pr-12" id="username" name="username"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-medium">First Name : <span className="text-red-600">*</span></label>
                                    <div className="form-icon relative mt-2">
                                        <User className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4"/>
                                        <input type="text" className="form-input ltr:pl-12 rtl:pr-12" id="firstname" name="name"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-medium">Last Name : <span className="text-red-600">*</span></label>
                                    <div className="form-icon relative mt-2">
                                        <UserCheck className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4"/>
                                        <input type="text" className="form-input ltr:pl-12 rtl:pr-12" id="lastname" name="name"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-medium">Your Email : <span className="text-red-600">*</span></label>
                                    <div className="form-icon relative mt-2">
                                        <Mail className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4"/>
                                        <input type="email" className="form-input ltr:pl-12 rtl:pr-12" id="mail" name="email"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-medium">Language : </label>
                                    <div className="form-icon relative mt-2">
                                        <DropDown 
                                            id={"language"} 
                                            listItems={[{text: "English", value: "en"}, {text: "Sweden", value: "swe"}]} 
                                            value={"en"} 
                                            onChange={(item: TextValue) => {console.log(item)}} 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-medium">Currency : </label>
                                    <div className="form-icon relative mt-2">
                                        <DropDown 
                                            id={"currency"} 
                                            listItems={[{text: "USD", value: "usd"}, {text: "MXN", value: "mxn"}]} 
                                            value={"usd"} 
                                            onChange={(item: TextValue) => {console.log(item)}} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full text-center mt-5">
                                <button className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-5">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Setting;