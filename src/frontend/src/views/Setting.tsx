import DropDown from "@components/common/DropDown";
import TextValue from "@models/common/TextValue";
import SettingModal from "@models/page/Setting";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Mail, User, UserCheck } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import * as Unicons from '@iconscout/react-unicons';
import Config from "../config.json";
import authService from "../AuthService";
import AuthService from "../AuthService";

const Setting = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<SettingModal>({
        mode: "onChange",
        defaultValues: {},
    });

    const loadSetting = async () => {
        setLoading(true);
        const accessToken = await authService.getAccessToken();
        try{
            const res = await axios({
                url: "/api/episerver/v3.0/me",
                method: "get",
                baseURL: Config.BASE_URL,
                withCredentials: false,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const setting = res.data as SettingModal;
            const user = await AuthService.getUser();
            reset({
                username: user?.profile.name,
                email: setting.email,
                firstName: setting.firstName,
                lastName: setting.lastName,
                preferredCurrency: setting.preferredCurrency,
                preferredLanguage: setting.preferredLanguage
            });
            setLoading(false);
        }catch(err: any){
            setLoading(false);
        }
    }

    const onSubmit = async (form: SettingModal) => {
        try{
            setLoading(true);
            const {username, ...data} = form;
            const accessToken = await authService.getAccessToken();
            await axios({
                url: "/api/episerver/v3.0/me",
                method: "put",
                baseURL: Config.BASE_URL,
                withCredentials: false,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                data: data,
            });
            setLoading(false);
        }catch(err: any){
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSetting();
    }, [])

    return (
        <section className="relative lg:pb-24 pb-16 pt-20">
            <div className="container md:mt-16 mt-8">
                <div className="mx-auto">
                    <div className="p-6 rounded-md bg-white dark:bg-slate-900">
                        <h5 className="text-2xl font-semibold mb-10">My Setting</h5>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                            <div>
                                <label className="form-label font-medium">Username</label>
                                <div className="form-icon relative mt-2">
                                    <User className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4"/>
                                    <Controller
                                        name={"username"}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <input 
                                                disabled 
                                                id="username" 
                                                type="text" 
                                                className="form-input ltr:pl-12 rtl:pr-12"
                                                defaultValue={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form-label font-medium">First Name</label>
                                <div className="form-icon relative mt-2">
                                    <User className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4"/>
                                    <Controller
                                        name={"firstName"}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <input 
                                                id="firstName" 
                                                type="text" 
                                                className="form-input ltr:pl-12 rtl:pr-12"
                                                defaultValue={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form-label font-medium">Last Name</label>
                                <div className="form-icon relative mt-2">
                                    <UserCheck className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4"/>
                                    <Controller
                                        name={"lastName"}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <input 
                                                id="lastName" 
                                                type="text" 
                                                className="form-input ltr:pl-12 rtl:pr-12"
                                                defaultValue={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form-label font-medium">Your Email</label>
                                <div className="form-icon relative mt-2">
                                    <Mail className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4"/>
                                    <Controller
                                        name={"email"}
                                        control={control}
                                        rules={{
                                            validate: {
                                                ["email"]: (v) => {
                                                    if (v && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(v)) {
                                                        return "Email Address is invalid";
                                                    } else {
                                                        return true;
                                                    }
                                                },
                                            },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <input 
                                                id="email" 
                                                type="text" 
                                                className="form-input ltr:pl-12 rtl:pr-12"
                                                defaultValue={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    {!!errors.email?.message && <p className="text-red-500">
                                        {errors.email?.message ?? ""}
                                    </p>}
                                </div>
                            </div>
                            <div>
                                <label className="form-label font-medium">Language </label>
                                <div className="form-icon relative mt-2">
                                    <Controller
                                        name={"preferredLanguage"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <DropDown 
                                                id={"preferredLanguage"} 
                                                listItems={[{text: "English", value: "en"}, {text: "Sweden", value: "swe"}]} 
                                                value={value} 
                                                onChange={(item: TextValue) => {
                                                    setValue("preferredLanguage", item.value)
                                                }} 
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form-label font-medium">Currency </label>
                                <div className="form-icon relative mt-2">
                                    <Controller
                                        name={"preferredCurrency"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <DropDown 
                                                id={"preferredCurrency"} 
                                                listItems={[{text: "USD", value: "USD"}, {text: "MXN", value: "MXN"}]} 
                                                value={value}
                                                onChange={(item: TextValue) => {
                                                    setValue("preferredCurrency", item.value)
                                                }} 
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <button 
                                className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-5"
                                onClick={handleSubmit(onSubmit)}
                            >
                                {loading && <Unicons.UilSpinner className="float-left mr-1"/>} <span className="float-left">Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Setting;