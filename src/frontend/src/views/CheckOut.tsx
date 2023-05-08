import Radio from "@components/common/Radio";
import React, { useEffect, useState } from "react";
import * as Unicons from '@iconscout/react-unicons';
import { Link } from "react-router-dom";
import Select from "@components/common/Select";

const CheckOut = () => {
    return (
        <div className="pb-16 pt-20 min-h-[40rem]">
            <div className="container lg:mt-16 mt-8">
                <div className="lg:mt-16 mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col divide-y">
                        <div className="w-full divide-gray-200 pb-10">
                            <p className="text-xl font-bold font-medium text-gray-900 dark:text-white pb-5">Contact information</p>
                            <label className="font-bold form-label font-medium">Email address</label>
                            <input 
                                type="text" 
                                className="form-input mt-2"
                            />
                        </div>
                        <div className="w-full pt-8 pb-10">
                            <p className="text-xl font-bold font-medium text-gray-900 dark:text-white">Shipping information</p>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <label className="font-bold form-label font-medium">First name</label>
                                    <input 
                                        type="text" 
                                        className="form-input mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold form-label font-medium">Last name</label>
                                    <input 
                                        type="text" 
                                        className="form-input mt-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="font-bold form-label font-medium">Company</label>
                                <input 
                                    type="text" 
                                    className="form-input mt-2"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="font-bold form-label font-medium">Address</label>
                                <input 
                                    type="text" 
                                    className="form-input mt-2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-4">
                                <div>
                                    <label className="font-bold form-label font-medium">City</label>
                                    <input 
                                        type="text" 
                                        className="form-input mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold form-label font-medium">Country</label>
                                    <Select 
                                        id="country"
                                        className="mt-2"
                                        options={[{ text: "United States", value: "en" }, { text: "Canada", value: "swe" }, { text: "Mexico", value: "swe" }]} 
                                        onChange={() => {}}     
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-4">
                                <div>
                                    <label className="font-bold form-label font-medium">State / Province</label>
                                    <Select 
                                        id="province"
                                        className="mt-2"
                                        options={[{ text: "United States", value: "en" }, { text: "Canada", value: "swe" }, { text: "Mexico", value: "swe" }]} 
                                        onChange={() => {}}         
                                    />
                                </div>
                                <div>
                                    <label className="font-bold form-label font-medium">Postal code</label>
                                    <input 
                                        type="text" 
                                        className="form-input mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-8 pb-10">
                            <p className="text-xl font-bold font-medium text-gray-900 dark:text-white">Delivery method</p>
                            <div className="grid grid-cols-2 gap-5 mt-3">
                                <div className="group/regular rounded-lg border hover:border-2 hover:border-indigo-600 cursor-pointer p-3">
                                    <div className="flex justify-between">
                                        <p className="font-bold text-base">Regular</p>
                                        <Unicons.UilCheckCircle className="w-5 h-5 text-indigo-600 invisible group-hover/regular:visible"/>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-white">1 days</p>
                                    <p className="font-bold text-base mt-5">$10.00</p>
                                </div>
                                <div className="group/express rounded-lg border hover:border-2 hover:border-indigo-600 cursor-pointer p-3">
                                    <div className="flex justify-between">
                                        <p className="font-bold text-base">Express</p>
                                        <Unicons.UilCheckCircle className="w-5 h-5 text-indigo-600 invisible group-hover/express:visible"/>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-white">2 days</p>
                                    <p className="font-bold text-base mt-5">$25.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full divide-gray-200 mt-1 pt-8">
                            <p className="text-xl font-bold font-medium text-gray-900 dark:text-white pb-5">Payment</p>
                            <div className="grid grid-cols-2">
                                <Radio 
                                    id="creditCard" 
                                    label="Credit card" 
                                    checked={true}
                                    onChange={() => {}}
                                />
                                <Radio 
                                    id="cashOnDelivery" 
                                    label="Cash on delivery" 
                                    checked={false}
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="grid grid-cols-2">
                                <Radio 
                                    id="availableCard" 
                                    label="Available credit cards" 
                                    checked={true}
                                    onChange={() => {}}
                                />
                                <Radio 
                                    id="newCard" 
                                    label="New credit card" 
                                    checked={false}
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="mt-3">
                                <label className="font-bold form-label font-medium">Name on card</label>
                                <input 
                                    type="text" 
                                    className="form-input mt-2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <label className="font-bold form-label font-medium">Card number</label>
                                    <input 
                                        type="text" 
                                        className="form-input mt-2"
                                    />
                                </div> 
                                <div>
                                    <label className="font-bold form-label font-medium">Security code</label>
                                    <input 
                                        type="text" 
                                        className="form-input mt-2"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <label className="font-bold form-label font-medium">Expiration year</label>
                                    <Select 
                                        id="expiredYear"
                                        className="mt-2"
                                        options={[
                                            { text: "2023", value: "2023" }, 
                                            { text: "2022", value: "2022" }, 
                                            { text: "2021", value: "2021" }
                                        ]} 
                                        onChange={() => {}}         
                                    />
                                </div> 
                                <div>
                                    <label className="font-bold form-label font-medium">Expiration month</label>
                                    <Select 
                                        id="expiredMonth"
                                        className="mt-2"
                                        options={[
                                            { text: "1", value: "1" }, 
                                            { text: "2", value: "2" }, 
                                            { text: "3", value: "3" },
                                            { text: "4", value: "4" },
                                            { text: "5", value: "5" },
                                            { text: "6", value: "6" },
                                            { text: "7", value: "7" },
                                            { text: "8", value: "8" },
                                            { text: "9", value: "9" },
                                            { text: "10", value: "10" },
                                            { text: "11", value: "11" },
                                            { text: "12", value: "12" },
                                        ]} 
                                        onChange={() => {}}         
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0">
                        <p className="text-xl font-bold font-medium text-gray-900 dark:text-white pb-5">Order summary</p>
                        <div className="shadow p-6">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    <li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                    <h3>
                                                        <Link to="#">Throwback Hip Bag</Link>
                                                    </h3>
                                                    <p className="ml-4 text-sm text-gray-500">
                                                        <Unicons.UilTrashAlt className="h-6 w-6 cursor-pointer"/>
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-gray-900 dark:text-white font-bold">$90.00</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex justify-end w-full">
                                                        <input 
                                                            type="number" 
                                                            className="form-input text-sm !w-1/5"
                                                            defaultValue={1}
                                                        />
                                                    </div>
                                                </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="border-t border-gray-200 py-6 mt-10">
                                <div className="text-base font-medium text-gray-900 dark:text-white">
                                    <label className="font-bold form-label font-medium">Discount code</label>
                                    <div className="grid grid-cols-4 gap-5 mt-2">
                                        <input 
                                            type="text" 
                                            className="col-span-3 form-input"
                                        />
                                        <button className="col-span-1 rounded-md border border-transparent bg-slate-300 text-base font-medium text-slate-800 shadow-sm hover:bg-slate-400 py-1">Apply</button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-rows-3 gap-3 pb-3">
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <p>Subtotal</p>
                                    <p>$262.00</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <p>Shipping</p>
                                    <p>$262.00</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <p>Taxes</p>
                                    <p>$262.00</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 py-3">
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <p className="font-bold text-xl">Total</p>
                                    <p className="font-bold text-xl">$262.00</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-6">
                                <button className="w-full rounded-md border border-transparent bg-indigo-600 px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Confirm Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   )
}

export default CheckOut;