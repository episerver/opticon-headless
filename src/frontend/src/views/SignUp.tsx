import React, { useEffect, useState } from "react";
import backgroundImage from "@assets/images/cta.jpg";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import SignUpModel from "@models/SignUp";
import axios from "axios";
import qs from "qs";
import Config from "../config.json";
import AuthService from "../AuthService";
import { toast } from "react-toastify";

const SignUp = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isDirty },
    } = useForm<SignUpModel>({
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            firstName: "",
            lastName: ""
        },
    });

    const values = watch();

    const onSubmit = async (form: SignUpModel) => {
        // Get anonymous token for signing up
        setLoading(true);
        try{
            let res = await axios({
                url: "/api/episerver/connect/token/anonymous",
                method: "post",
                baseURL: Config.BASE_URL,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: qs.stringify({
                    grant_type: "anonymous",
                    client_id: "frontend",
                    scope: "anonymous_id"
                }),
            });
    
            if(res.status === 200){ 
                const {confirmPassword, ...data} = form;
                res = await axios({
                    url: "/api/episerver/v3.0/me/signup",
                    method: "post",
                    baseURL: Config.BASE_URL,
                    withCredentials: false,
                    headers: {
                        Authorization: `Bearer ${res.data.access_token}`,
                        "Content-Type": "application/json",
                    },
                    data: data,
                });
                if(res.status === 201){
                    AuthService.signIn();
                }
            }
            setLoading(false);
        }catch(err: any){
            setLoading(false);
        }
    }

    useEffect(() => {
        AuthService.signOutSilent();
    }, [])

    return (
        <div className="font-nunito text-base text-black dark:text-white dark:bg-slate-900">
            <section className="md:h-screen py-36 flex items-center bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                <div className="container">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                            <h5 className="my-6 text-xl font-semibold">Sign Up</h5>
                            <form action="auth-signup-success.html" className="ltr:text-left rtl:text-right">
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="RegisterName">Username</label>
                                        <Controller
                                            name={"username"}
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "The username is required",
                                                },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <input 
                                                    id="username" 
                                                    type="text" 
                                                    className="form-input mt-3"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        {!!errors.username?.message && <p className="text-red-500">
                                            {errors.username?.message ?? ""}
                                        </p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Email Address</label>
                                        <Controller
                                            name={"email"}
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Email Address is required",
                                                },
                                                pattern: {
                                                    value: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i,
                                                    message: "Email Address is invalid",
                                                },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <input 
                                                    id="email" 
                                                    type="email" 
                                                    className="form-input mt-3"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        {!!errors.email?.message && <p className="text-red-500">
                                            {errors.email?.message ?? ""}
                                        </p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Password</label>
                                        <Controller
                                            name={"password"}
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Password is required",
                                                },
                                                pattern: {
                                                    value: /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
                                                    message: "Passwords must have at least one non alphanumeric character, one lowercase ('a'-'z'), one uppercase ('A'-'Z'), one digit (0-9) and have a length of at least of 6.",
                                                },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <input 
                                                    id="password" 
                                                    type="password" 
                                                    className="form-input mt-3"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        {!!errors.password?.message && <p className="text-red-500">
                                            {errors.password?.message ?? ""}
                                        </p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Confirm Password</label>
                                        <Controller
                                            name={"confirmPassword"}
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Confirm Password is required",
                                                },
                                                validate: {
                                                    ["confirmPassword"]: (v) => {
                                                        if (v !== values.password) {
                                                            return "Password and Confirm Password doesn't match";
                                                        } else {
                                                            return true;
                                                        }
                                                    },
                                                },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <input 
                                                    id="confirmPassword" 
                                                    type="password" 
                                                    className="form-input mt-3"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        {!!errors.confirmPassword?.message && <p className="text-red-500">
                                            {errors.confirmPassword?.message ?? ""}
                                        </p>}
                                    </div>
                                    <div className="mb-4">
                                        <button 
                                            className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full"
                                            onClick={handleSubmit(onSubmit)}
                                        >
                                            {loading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                            </svg>}    
                                           Sign up
                                        </button>
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