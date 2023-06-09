import LineItem from "@models/cart/LineItem";
import React, { useContext, useEffect, useState } from "react";
import { X } from "react-feather";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../store/DataProvider";
import { Currencies } from "../constants/Currencies";
import Modal from "@components/common/Modal";
import { deleteItem, updateQuantity } from "../store/Action";
import _ from 'lodash';
import Shipment from "@models/cart/Shipment";

const CartDetail = () => {
    const navigate = useNavigate();
    const { state: { cart, market, cartValidation }, dispatch } = useContext(DataContext);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [selectedLineItem, setSelectedLineItem] = useState<LineItem>();

    const {
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<Shipment>({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            lineItems: [],
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "lineItems"
      });

    const values = watch();

    const onChangeInput = (contentId: string, e: any, onchange: Function) => {
        onchange(e);
        const quantity = !!e.target.value ? parseFloat(e.target.value) : 0;
        if(quantity > 0){
            dispatch(updateQuantity(contentId, cart, quantity));
        }
    }

    const isCartEmpty = () => {
        return !(!cart.shipments || cart.shipments && cart.shipments[0].lineItems.length > 0);
    }

    useEffect(() => {
        if(_.isEmpty(values.lineItems) && !_.isEmpty(cart.shipments?.[0].lineItems)){
            reset(cart.shipments?.[0]);
        }
    }, [cart.shipments?.[0]])
    
    return (
        <>
            <div className="pb-16 pt-20 min-h-[40rem]">
                <div className="container lg:mt-16 mt-8">
                    {!isCartEmpty() && <>
                        <p className="lg:w-2/3 text-2xl font-medium text-gray-900 dark:text-white border-b-[1px] border-gray-200 pb-5">Cart</p>
                        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                            <ul className="lg:col-span-2 divide-y divide-gray-200">
                                {fields.map((lineItem: LineItem, index: number) => (
                                    <li key={lineItem.contentId} className="flex py-8">
                                        <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-slate-100">
                                            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col relative">
                                            <div className="grid grid-cols-6 text-base font-medium text-gray-900 dark:text-white ">
                                                <h3 className="col-span-4">
                                                    <Link to="#">{lineItem.displayName}</Link>
                                                </h3>
                                                <div>
                                                    <Controller
                                                        name={`lineItems.${index}.quantity`}
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: "The quantity is required",
                                                            },
                                                            min: {
                                                                value: 1,
                                                                message: "The quantity is invalid",
                                                            },
                                                        }}
                                                        render={({ field: { onChange, value } }) => (
                                                            <input 
                                                                id={`lineItems.${index}.quantity`}
                                                                type="number"
                                                                className="col-span-1 form-input"
                                                                defaultValue={value ?? ""}
                                                                onChange={(e) => onChangeInput(lineItem.contentId, e, onChange) }
                                                            />
                                                        )}
                                                    />
                                                    {errors.lineItems?.[0]?.quantity && <p className="absolute text-red-500 text-sm mt-1">{errors.lineItems?.[0]?.quantity.message}</p>}
                                                </div>
                                                <p
                                                    className="col-span-1 ml-4 text-sm text-gray-500" 
                                                    onClick={() => {
                                                        setSelectedLineItem(lineItem);
                                                        setShowConfirmation(true);
                                                    }}
                                                >
                                                    <X className="h-5 w-5 float-right cursor-pointer"/>    
                                                </p>
                                            </div>
                                            <p className="mt-1 text-gray-900 dark:text-white font-bold">{Currencies[market.currency]?.["symbol_native"]} {lineItem.placedPrice.toLocaleString('en-US')}</p>
                                        </div>
                                    </li>
                                ))}  
                            </ul>
                            <div className="lg:col-span-1 p-7 bg-slate-100 dark:bg-slate-500 rounded-lg h-fit">
                                <p className="text-xl font-medium text-gray-900 dark:text-white">Order Summary</p>
                                <ul className="divide-y divide-gray-200 mt-6">
                                    <li className="w-full py-3 h-12">
                                        <p className="float-left">Subtotal</p>
                                        <p className="font-bold float-right">{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.subTotal.toLocaleString('en-US') ?? 0}</p>
                                    </li>
                                    <li className="w-full py-3 h-12">
                                        <p className="float-left">Shipping</p>
                                        <p className="font-bold float-right">{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.shippingTotal.toLocaleString('en-US') ?? 0}</p>
                                    </li>
                                    <li className="w-full py-3 h-12">
                                        <p className="float-left">Tax</p>
                                        <p className="font-bold float-right">{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.taxTotal.toLocaleString('en-US') ?? 0}</p>
                                    </li>
                                    <li className="font-bold py-3 w-full h-12">
                                        <p className="font-bold float-left">Order total</p>
                                        <p className="float-right">{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.total.toLocaleString('en-US') ?? 0}</p>
                                    </li>
                                </ul>
                                <button 
                                    className="w-full mx-auto justify-center rounded-md border border-transparent bg-indigo-600 mt-5 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    onClick={() => navigate("/checkout")}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>}
                    {isCartEmpty() && <>
                    <div className="flex flex-col">
                        <p className="mx-auto font-bold text-medium text-2xl dark:text-white">Your cart is empty</p>
                        <button className="mx-auto justify-center rounded-md border border-transparent bg-indigo-600 mt-5 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Search for travel</button>
                    </div>
                    </>}
                </div>
            </div>
            <Modal 
                content={`Are you sure you want to remove "${selectedLineItem?.displayName}"?`}
                show={showConfirmation} 
                onOK={() => {
                    dispatch(deleteItem(selectedLineItem?.contentId ?? "", cart));
                    setShowConfirmation(false);
                }}
                onCancel={() => setShowConfirmation(false)}
            />
        </>
   )
}

export default CartDetail;