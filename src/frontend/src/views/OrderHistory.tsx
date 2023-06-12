import React, { useState } from "react";
import { X } from "react-feather";
import { Link } from "react-router-dom";

const OrderHistory = () => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    return (
        <div className="pb-16 pt-20 min-h-[40rem]">
             <div className="container lg:mt-16 mt-8">
                <p className="text-2xl font-bold dark:text-white mb-2">Order history</p>
                <p className="font-normal text-slate-700 dark:text-white text-[15px] mb-10">Check the status of recent orders, manage returns, and download invoices.</p>
                {!isEmpty && <div className="w-full">
                    <div className="flex justify-between rounded-md bg-slate-100 dark:bg-slate-800 p-5">
                        <div className="grid grid-cols-3 gap-12">
                            <div>
                                <p className="font-bold">Date place</p>
                                <p className="text-slate-700 dark:text-white text-[15px]">January 22, 2021</p>
                            </div>
                            <div>
                                <p className="font-bold">Order number</p>
                                <p className="text-slate-700 dark:text-white text-[15px]">WU88191111</p>
                            </div>
                            <div>
                                <p className="font-bold">Total amount</p>
                                <p className="font-bold text-[15px]">$238.00</p>
                            </div>
                        </div>
                        <button className="rounded-md border border-transparent bg-white text-base font-medium text-black shadow-sm px-4 mt-2 h-[35px]">View Invoice</button>
                    </div>
                    <table className="mt-12 w-full">
                        <thead className="border-b-[1px] border-gray-200 pb-2">
                            <tr className="text-slate-400">
                                <th className="font-normal w-2/5 text-left">Product</th>
                                <th className="font-normal w-1/5 text-left">Price</th>
                                <th className="font-normal w-1/5 text-left">Status</th>
                                <th className="font-normal w-1/5 text-right">Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b-[1px] border-gray-200">
                                <td className="p-3">
                                    <div className="flex">
                                        <img className="w-1/5 object-cover object-center" src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"/>
                                        <p className="font-bold m-auto">Machined Pen and Pencil Set</p>
                                    </div>
                                </td>
                                <td className="text-slate-700 dark:text-white">$70.00</td>
                                <td className="text-slate-700 dark:text-white">Delivered Jan 25, 2021</td>
                                <td className="text-right"><Link to="" className="text-blue-500">View product</Link></td>
                            </tr>
                            <tr className="border-b-[1px] border-gray-200">
                                <td className="p-3">
                                    <div className="flex">
                                        <img className="w-1/5 object-cover object-center" src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"/>
                                        <p className="font-bold m-auto">Machined Pen and Pencil Set</p>
                                    </div>
                                </td>
                                <td className="text-slate-700 dark:text-white">$70.00</td>
                                <td className="text-slate-700 dark:text-white">Delivered Jan 25, 2021</td>
                                <td className="text-right"><Link to="" className="text-blue-500">View product</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
                {isEmpty && <>
                   <div className="flex flex-col">
                       <p className="mx-auto font-bold text-medium text-2xl dark:text-white">You have no order</p>
                       <button className="mx-auto justify-center rounded-md border border-transparent bg-indigo-600 mt-5 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Search for food</button>
                   </div>
                </>}
             </div>
        </div>
   )
}

export default OrderHistory;