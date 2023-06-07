import React, { useContext, useState } from "react";
import { ShoppingCart, X } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/DataProvider";
import Cart from "@models/cart/Cart";
import { getData } from "../../utils/FetchData";
import { useEffect } from "react";
import LineItem from "@models/cart/LineItem";

const CartMenu = () => {
    const navigate = useNavigate();
    const { state: { market, cart }, dispatch } = useContext(DataContext);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const redirect = (path: string) => {
        setShowMenu(false);
        navigate(path);
    };

    const getImages = async () => {
        const promisesArr = [] as Promise<any>[];
        cart.shipments?.[0].lineItems.forEach((lineItem: LineItem) => {
            promisesArr.push(getData(`api/episerver/v3.0/content/${lineItem.contentId}`));
        })
        if(promisesArr.length > 0){
            Promise.all(promisesArr).then(res => {
                console.log(res);
            });
        }
    }

    useEffect(() => {
        getImages();
    }, [cart?.shipments?.[0].lineItems])

    return (
        <div className="relative">
            <button
                className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white"
                onClick={toggleMenu}
            >
                <ShoppingCart className="h-4 w-4" />
            </button>
            <span className="absolute w-4 h-4 rounded-full text-indigo-800 bg-white border border-indigo-800 text-xs font-bold text-center -ml-3 -mt-1">1</span>
            <div
                id="cart-menu"
                className={`${showMenu ? "" : "hidden"} ease-in relative z-10`}
                aria-labelledby="slide-over-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
                <div className="fixed inset-0">
                    <div className="absolute inset-0">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col bg-white shadow-xl">
                                    <div className="flex-1 px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                                                Cart
                                            </h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={toggleMenu}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <X className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    <li className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                                                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <Link to="#">Throwback Hip Bag</Link>
                                                                    </h3>
                                                                    <p className="ml-4 text-sm text-gray-500">
                                                                        1 items
                                                                    </p>
                                                                </div>
                                                                <p className="mt-1 text-gray-900 font-bold">$90.00</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="flex">
                                                                    <button
                                                                        type="button"
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                                                                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <Link to="#">Medium Stuff Satchel</Link>
                                                                    </h3>
                                                                    <p className="ml-4 text-sm text-gray-500">
                                                                        1 items
                                                                    </p>
                                                                </div>
                                                                <p className="mt-1 text-gray-900 font-bold">$90.00</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="flex">
                                                                    <button
                                                                        type="button"
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>$262.00</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Shipping and taxes calculated at checkout.
                                        </p>
                                        <div className="mt-6 flex justify-center gap-2">
                                            <button
                                                onClick={() => redirect("/checkout")}
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 w-1/2 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Checkout
                                            </button>
                                            <button
                                                onClick={() => redirect("/cart-detail")}
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 w-1/2 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                View Detail
                                            </button>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartMenu;
