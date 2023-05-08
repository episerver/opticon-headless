import React, { useState } from "react";
import { X } from "react-feather";
import * as Unicons from '@iconscout/react-unicons';
import { Link } from "react-router-dom";

const OrderSummaries = () => {
    return (
        <div className="pb-16 pt-20 min-h-[40rem]">
             <div className="container lg:mt-16 mt-8">
                <p className="text-2xl font-bold dark:text-white pb-7">Order Summaries</p>
                <div className="w-full">
                    <p className="font-bold mt-2">Tracking number</p>
                    <Link to="" className="text-blue-500">51547878755545848512</Link>
                    <div className="lg:grid lg:grid-cols-3">
                        <div className="lg:col-span-2 py-6">
                            <div className="flow-root border-t border-gray-200 p-5">
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
                                                    <p className="ml-4 text-sm text-gray-500 dark:text-white">
                                                        1 items
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-gray-900 dark:text-white font-bold">$90.00</p>
                                                </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="grid grid-rows-3 gap-3 pt-3 pb-3 border-t border-gray-200">
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
                                    <p className="font-bold text-lg">Total</p>
                                    <p className="font-bold text-lg">$262.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 lg:ml-16 gap-12 p-5">
                            <div>
                                <p className="font-bold">Shipping Address</p>
                                <p>Kristin Watson</p>
                                <p>7363 Cynthia Pass</p>
                                <p>Toronto, ON N3Y 4H8</p>
                            </div>
                            <div>
                                <p className="font-bold">Payment Information</p>
                                <p>Ending with 4242</p>
                                <p>Expires 12 / 21</p>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                    >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </button>
                </div>
             </div>
        </div>
   )
}

export default OrderSummaries;