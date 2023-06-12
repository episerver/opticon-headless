import React, { useContext, useState } from "react";
import { ShoppingCart, X } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/DataProvider";
import { getData } from "../../utils/FetchData";
import { useEffect } from "react";
import LineItem from "@models/cart/LineItem";
import { deleteItem } from "../../store/Action";
import { Currencies } from "../../constants/Currencies";
import Modal from "@components/common/Modal";

const CartMenu = () => {
    const navigate = useNavigate();
    const { state: { cart, market, cartValidation, lineItemImages }, dispatch } = useContext(DataContext);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<LineItem>();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const redirect = (path: string) => {
        setShowMenu(false);
        navigate(path);
    };

    return (
        <>
            <div className="relative">
                <button
                    className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white"
                    onClick={toggleMenu}
                >
                    <ShoppingCart className="h-4 w-4" />
                </button>
                {cart.shipments && cart.shipments[0].lineItems.length > 0 && <span className="absolute w-4 h-4 rounded-full text-indigo-800 bg-white border border-indigo-800 text-xs font-bold text-center -ml-3 -mt-1">{cart.shipments[0].lineItems.length}</span>}
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
                                                        {cart.shipments?.[0].lineItems.map((lineItem: LineItem, index: number) => (
                                                            <li key={lineItem.contentId} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    {lineItemImages[index] && <img
                                                                        src={lineItemImages[index]}
                                                                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                                        className="h-full w-full object-cover object-center"
                                                                    />}
                                                                </div>
                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <Link to="#">{lineItem.displayName}</Link>
                                                                            </h3>
                                                                            <p className="ml-4 text-sm text-gray-500">
                                                                                {lineItem.quantity} items
                                                                            </p>
                                                                        </div>
                                                                        <p className="mt-1 text-gray-900 font-bold">{Currencies[market.currency]?.["symbol_native"]} {lineItem.placedPrice.toLocaleString('en-US')}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <div className="flex">
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                onClick={() => {
                                                                                    setSelectedItem(lineItem);
                                                                                    setShowConfirmation(true);
                                                                                }}
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))} 
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.subTotal.toLocaleString('en-US')}</p>
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
            <Modal 
                content={`Are you sure you want to remove "${selectedItem?.displayName}"?`}
                show={showConfirmation} 
                onOK={() => {
                    dispatch(deleteItem(selectedItem?.contentId ?? "", cart));
                    setShowConfirmation(false);
                }}
                onCancel={() => setShowConfirmation(false)}
            />
        </>
    );
};

export default CartMenu;
