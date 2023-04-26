import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { Link } from "react-router-dom";

const CartDetail = () => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    return (
        <div className="pb-16 pt-20 min-h-[40rem]">
             <div className="container md:mt-16 mt-8">
                {!isEmpty && <>
                    <p className="w-2/3 text-2xl font-bold font-medium text-gray-900 dark:text-white border-b-[1px] border-gray-200 pb-10">Cart</p>
                        <div className="md:grid md:grid-cols-3 md:gap-12">
                            <ul className="md:col-span-2 divide-y divide-gray-200">
                                <li className="flex py-8">
                                    <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-slate-100">
                                        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                <h3>
                                                    <Link to="#">Throwback Hip Bag</Link>
                                                </h3>
                                                <p className="ml-4 text-sm text-gray-500">
                                                    <X className="h-5 w-5"/>    
                                                </p>
                                            </div>
                                            <p className="mt-1 text-gray-900 dark:text-white font-bold">$90.00</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm"></div>
                                    </div>
                                </li>
                                <li className="flex py-8">
                                    <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-slate-100">
                                        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="h-full w-full object-cover object-center"/>
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                <h3>
                                                    <Link to="#">Medium Stuff Satchel</Link>
                                                </h3>
                                                <p className="ml-4 text-sm text-gray-500">
                                                    <X className="h-5 w-5"/>
                                                </p>
                                            </div>
                                            <p className="mt-1 text-gray-900  dark:text-white font-bold">$90.00</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm"></div>
                                    </div>
                                </li>
                            </ul>
                            <div className="md:col-span-1 p-7 bg-slate-100 dark:bg-slate-500 rounded-lg h-fit">
                                <p className="text-xl font-bold font-medium text-gray-900 dark:text-white">Order Summary</p>
                                <ul className="divide-y divide-gray-200">
                                    <li className="py-8">
                                        <p className="float-left">Subtotal</p>
                                        <p className="font-bold float-right">$99.00</p>
                                    </li>
                                    <li className="py-8">
                                        <p className="float-left">Shipping estimate</p>
                                        <p className="font-bold float-right">$5.00</p>
                                    </li>
                                    <li className="py-8">
                                        <p className="float-left">Tax estimate</p>
                                        <p className="font-bold float-right">$5.00</p>
                                    </li>
                                    <li className="py-8 font-bold">
                                        <p className="font-bold float-left">Order total</p>
                                        <p className="float-right">$112.32</p>
                                    </li>
                                </ul>
                                <button className="w-full mx-auto justify-center rounded-md border border-transparent bg-indigo-600 mt-5 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</button>
                            </div>
                        </div>
                </>}
                {isEmpty && <>
                   <div className="flex flex-col">
                       <p className="mx-auto font-bold text-medium text-2xl dark:text-white">Your cart is empty</p>
                       <button className="mx-auto justify-center rounded-md border border-transparent bg-indigo-600 mt-5 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Search for travel</button>
                   </div>
                </>}
             </div>
        </div>
   )
}

export default CartDetail;