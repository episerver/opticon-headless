import React, { useEffect, useState } from "react";
import backgroundImage from "@assets/images/cta.jpg";
import { Controller, useForm } from "react-hook-form";
import SignUpModel from "@models/page/SignUp";
import * as Unicons from '@iconscout/react-unicons';
import AuthService from "../AuthService";
import { postData } from "../utils/FetchData";

const SignUp = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
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
        setLoading(true);
        try{
            const {confirmPassword, ...data} = form;
            const res = await postData("/api/episerver/v3.0/me/signup", data);
            if(res.status === 201){
                AuthService.signIn();
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
                                        <label className="font-semibold" htmlFor="username">Username</label>
                                        <Controller
                                            name={"username"}
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Username is required",
                                                },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <input 
                                                    id="username" 
                                                    type="text" 
                                                    className="form-input mt-3"
                                                    defaultValue={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        {!!errors.username?.message && <p className="text-red-500">
                                            {errors.username?.message ?? ""}
                                        </p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="email">Email Address</label>
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
                                                    defaultValue={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        {!!errors.email?.message && <p className="text-red-500">
                                            {errors.email?.message ?? ""}
                                        </p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="password">Password</label>
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
                                                    defaultValue={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        {!!errors.password?.message && <p className="text-red-500">
                                            {errors.password?.message ?? ""}
                                        </p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="confirmPassword">Confirm Password</label>
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
                                                    defaultValue={value}
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
                                            {loading && <Unicons.UilSpinner className="inline w-4 h-4 mr-3 text-white animate-spin"/>}
                                           Sign up
                                        </button>
                                    </div>
                                    <div className="text-center">   
                                        <span className="text-slate-400 ltr:mr-2 rtl:ml-2">Already have an account ? </span> 
                                        <p onClick={() => AuthService.signIn()} className="text-black dark:text-white font-bold inline-block cursor-pointer">Sign in</p>
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