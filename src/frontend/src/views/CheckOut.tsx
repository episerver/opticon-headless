import Radio from "@components/common/Radio";
import React, { useContext, useEffect, useState } from "react";
import * as Unicons from '@iconscout/react-unicons';
import { Link, useNavigate } from "react-router-dom";
import Select from "@components/common/Select";
import LineItem from "@models/cart/LineItem";
import { DataContext } from "../store/DataProvider";
import { Controller, useForm } from "react-hook-form";
import Cart from "@models/cart/Cart";
import _ from 'lodash';
import Modal from "@components/common/Modal";
import { ACTIONS, deleteItem, updateQuantity, updateShippingMethod } from "../store/Action";
import { Currencies } from "../constants/Currencies";
import { getData, postData, putData } from "../utils/FetchData";
import { isEmptyCart } from "../utils/Cart";
import TextValue from "@models/common/TextValue";
import ShippingMethod from "@models/ShippingMethod";
import { Languages } from "../constants/Languages";
import PaymentMethod from "@models/PaymentMethod";
import BoltPayment from "@components/payment/Bolt";

const CheckOut = () => {
    const navigate = useNavigate();
    const { state: { cart, market, cartValidation, lineItemImages }, dispatch } = useContext(DataContext);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [selectedLineItem, setSelectedLineItem] = useState<LineItem>();
    const [countries, setContries] = useState<TextValue[]>([]);
    const [regions, setRegions] = useState<TextValue[]>([]);
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [isNewBillingAddress, setIsNewBillingAddress] = useState<boolean>(false);
    const [couponCode, setCouponCode] = useState<string>("");

    const {
        control,
        reset,
        watch,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<Cart>({
        mode: "onChange",
        defaultValues: {},
    });

    const values = watch();

    const onChangeQuantity = (contentId: string, e: any, onchange: Function) => {
        onchange(e);
        const quantity = !!e.target.value ? parseFloat(e.target.value) : 0;
        if(quantity > 0){
            dispatch(updateQuantity(contentId, cart, quantity));
        }
    }

    const getCountries = async () => {
        const res = await getData("api/episerver/v3.0/countries");
        const data = res.data.map((d: any) => ({text: d.name, value: d.code}));
        setContries(data);

        if(data.length > 0){
            if(values.shipments?.[0].shippingAddress.countryName){
                setValue("shipments.0.shippingAddress.countryName", values.shipments[0].shippingAddress.countryName);
            }else{
                setValue("shipments.0.shippingAddress.countryName", data[0].text);
            }
            
            if(values.shipments?.[0].shippingAddress.countryCode){
                setValue("shipments.0.shippingAddress.countryCode", values.shipments[0].shippingAddress.countryCode);
                getRegions(values.shipments[0].shippingAddress.countryCode);
            }else{
                setValue("shipments.0.shippingAddress.countryCode", data[0].value);
                getRegions(data[0].value);
            }
        }
    }

    const getRegions = async (countryCode: string) => {
        const res = await getData(`api/episerver/v3.0/countries/${countryCode}/regions`);
        const data = res.data.map((d: any) => ({text: d, value: d}));
        setRegions(data);

        if(data.length > 0){
            if(values.shipments?.[0].shippingAddress.regionName){
                setValue("shipments.0.shippingAddress.regionName", values.shipments[0].shippingAddress.regionName);
            }else{
                setValue("shipments.0.shippingAddress.regionName", data[0].value);
            }
        }else{
            setValue("shipments.0.shippingAddress.regionName", countryCode);
            setRegions([{text: countryCode, value: countryCode}]);
        }
    }

    const getShippingMethods = async () => {
        const res = await getData(`api/episerver/v3.0/shippings/shippingmethods`);
        let data = res.data.filter((s: any) => s.isActive && s.currencyId === market.currency && Languages[s.languageId]);
        data = _.orderBy(data, ["ordering"], ["asc"]);
        setShippingMethods(data);

        const defaultShippingMethod = data.find((s:any) => s.isDefault)?.shippingMethodId;
        if(defaultShippingMethod){
            dispatch(updateShippingMethod(defaultShippingMethod, cart));
        }
    }

    const getPaymentMethods = async () => {
        const res = await getData(`api/episerver/v3.0/paymentmethods/${market.language}/${market.marketId}`);
        let data = (res.data as PaymentMethod[]).filter((p: any) => p.isActive && Languages[p.languageId]);
        data = _.orderBy(data, ["ordering"], ["asc"]);
        setPaymentMethods(data);
    }

    const onChangePaymentMethod = async (paymentMethod: PaymentMethod) => {
        setValue("payments.0.paymentId", paymentMethod.paymentMethodId);
        setValue("payments.0.systemKeyword", paymentMethod.systemKeyword);
    }

    const onChangeCountry = async (country: string) => {
        const data = countries.find(c => c.value === country);
        if(data){
            setValue("shipments.0.shippingAddress.regionName", "");
            setValue("shipments.0.shippingAddress.countryName", data.text);
            setValue("shipments.0.shippingAddress.countryCode", data.value);
            getRegions(country);
        }
    }

    const applyCouponCode = async () => {
        if(!!couponCode){
            dispatch({ 
                type: ACTIONS.UPDATE_CART,
                payload: {...cart, couponCodes: [couponCode]}
            })
            dispatch({ type: 'NOTIFY', payload: {success: 'Your coupon code has been applied.'} });
        }else{
            dispatch({ 
                type: ACTIONS.UPDATE_CART,
                payload: {...cart, couponCodes: []}
            })
            dispatch({ type: 'NOTIFY', payload: {success: 'Your coupon code has been removed.'} });
        }
    }

    const onSubmit = async (data: Cart) => {
        const res = await putData(`api/episerver/v3.0/me/carts`, data);
        if(res.status === 200){
            dispatch({ type: 'NOTIFY', payload: {isLoading: true} });
            const res = await postData(`api/episerver/v3.0/me/cart/Default/${market.marketId}/converttoorder`, null);
            dispatch({ type: 'NOTIFY', payload: {isLoading: false} });
    
            if(res.status === 200){
                const res = await getData(`api/episerver/v3.0/me/carts/Default/${market.marketId}/true`);
                const {lastUpdated, ...rest} = res.data;
                if(!_.isEqual(cart, rest)){
                    const cart = rest as Cart;
                    dispatch({ 
                        type: ACTIONS.UPDATE_CART,
                        payload: cart
                    })
                }
                navigate(`/order-summaries/${res.data.orderNumber}`);
            }else{
                dispatch({ type: 'NOTIFY', payload: {error: 'Fail to create order.'} });
            }
        }else{
            dispatch({ type: 'NOTIFY', payload: {error: 'Fail to create order.'} });
        }
    }

    useEffect(() => {
        if(!_.isEmpty(cart)){
            reset(cart);
            setCouponCode(cart.couponCodes?.[0] ?? "");
        }
    }, [cart])

    useEffect(() => {
        if(!_.isEmpty(cart)){
            getCountries();
            getShippingMethods();
            getPaymentMethods();
        }
    }, [_.isEmpty(cart)])
    
    return (
        <>
            <div className="pb-16 pt-20 min-h-[40rem]">
                <div className="container lg:mt-16 mt-8">
                    {!isEmptyCart(cart) && values.shipments && values.couponCodes && <div className="lg:mt-16 mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col divide-y"> 
                                <div className="w-full divide-gray-200 pb-10">
                                    <p className="text-2xl font-medium text-gray-900 dark:text-white pb-5">Shipping information</p>
                                    <div className="grid grid-cols-2 gap-5 mt-3">
                                        <div>
                                            <label className="form-label font-medium">Phone number</label>
                                            <Controller
                                                name={`shipments.0.shippingAddress.phoneNumber`}
                                                control={control}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Phone number is required",
                                                    }
                                                }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input 
                                                        id={`shipments.0.shippingAddress.phoneNumber`}
                                                        type="number" 
                                                        className="form-input mt-2"
                                                        defaultValue={value ?? ""}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                            {errors.shipments?.[0]?.shippingAddress?.phoneNumber && <p className="text-red-500 text-sm pt-1">{errors.shipments?.[0]?.shippingAddress?.phoneNumber.message}</p>}
                                        </div>
                                        <div>
                                            <label className="form-label font-medium">Email address</label>
                                            <Controller
                                                name={`shipments.0.shippingAddress.email`}
                                                control={control}
                                                rules={{
                                                    validate: {
                                                        ["email"]: (v) => {
                                                            if (v && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(v)) {
                                                                return "Email address is invalid";
                                                            } else {
                                                                return true;
                                                            }
                                                        },
                                                    },
                                                }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input 
                                                        id={`shipments.0.shippingAddress.email`}
                                                        type="text" 
                                                        className="form-input mt-2"
                                                        defaultValue={value ?? ""}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                            {errors.shipments?.[0]?.shippingAddress?.email && <p className="text-red-500 text-sm pt-1">{errors.shipments?.[0]?.shippingAddress?.email.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5 mt-3">
                                        <div>
                                            <label className="form-label font-medium">First name</label>
                                            <Controller
                                                name={`shipments.0.shippingAddress.firstName`}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <input 
                                                        id={`shipments.0.shippingAddress.firstName`}
                                                        type="text" 
                                                        className="form-input mt-2"
                                                        defaultValue={value ?? ""}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label font-medium">Last name</label>
                                            <Controller
                                                name={`shipments.0.shippingAddress.lastName`}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <input 
                                                        id={`shipments.0.shippingAddress.lastName`}
                                                        type="text" 
                                                        className="form-input mt-2"
                                                        defaultValue={value ?? ""}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="form-label font-medium">Organization</label>
                                        <input 
                                            type="text" 
                                            className="form-input mt-2"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <label className="form-label font-medium">Address line 1</label>
                                        <Controller
                                            name={`shipments.0.shippingAddress.line1`}
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input 
                                                    id={`shipments.0.shippingAddress.line1`}
                                                    type="text" 
                                                    className="form-input mt-2"
                                                    defaultValue={value ?? ""}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <label className="form-label font-medium">Address line 2</label>
                                        <Controller
                                            name={`shipments.0.shippingAddress.line2`}
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input 
                                                    id={`shipments.0.shippingAddress.line2`}
                                                    type="text" 
                                                    className="form-input mt-2"
                                                    defaultValue={value ?? ""}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5 mt-4">
                                        <div>
                                            <label className="form-label font-medium">City</label>
                                            <Controller
                                                name={`shipments.0.shippingAddress.city`}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <input 
                                                        id={`shipments.0.shippingAddress.city`}
                                                        type="text" 
                                                        className="form-input mt-2"
                                                        defaultValue={value ?? ""}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label font-medium">Country</label>
                                            <Select 
                                                id="country-billing"
                                                className="mt-2"
                                                options={countries} 
                                                onChange={(val) => onChangeCountry(val)}     
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5 mt-4">
                                        <div>
                                            <label className="form-label font-medium">State / Province</label>
                                            <Select 
                                                id="province-billing"
                                                className="mt-2"
                                                options={regions} 
                                                onChange={(val) => setValue("shipments.0.shippingAddress.regionName", val)}         
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label font-medium">Postal code</label>
                                            <Controller
                                                name={`shipments.0.shippingAddress.postalCode`}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <input 
                                                        id={`shipments.0.shippingAddress.postalCode`}
                                                        type="text" 
                                                        className="form-input mt-2"
                                                        defaultValue={value ?? ""}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full pt-10">
                                        <p className="text-xl font-medium text-gray-900 dark:text-white">Choose delivery</p>
                                        <div className="grid grid-cols-2 gap-5 mt-3">
                                            {shippingMethods.map(s => 
                                                <div 
                                                    key={s.shippingMethodId} 
                                                    className={`group/regular rounded-lg border ${s.shippingMethodId === values.shipments[0].shippingMethodId ? "border-2 border-indigo-600" : ""} hover:border-2 hover:border-indigo-600 cursor-pointer p-3`}
                                                    onClick={() => dispatch(updateShippingMethod(s.shippingMethodId, cart))}
                                                >
                                                    <div className="flex justify-between">
                                                        <p className="font-bold text-base">{s.displayName}</p>
                                                        <Unicons.UilCheckCircle className={`w-5 h-5 text-indigo-600 ${s.shippingMethodId === values.shipments[0].shippingMethodId ? "visible" : "invisible"} group-hover/regular:visible`}/>
                                                    </div>
                                                    <p className="mt-1 text-sm text-slate-600 dark:text-white">{s.description}</p>
                                                    <p className="font-bold text-base mt-1">{Currencies[market.currency]?.["symbol_native"]} {s.basePrice.toLocaleString('en-US')}</p>
                                                </div>)}      
                                        </div>
                                    </div>
                                </div> 
                                <div className="w-full mt-1 pt-8">
                                    <p className="text-2xl font-medium text-gray-900 dark:text-white pb-5">Payment information</p>     
                                    <div className="w-full">
                                        <div className="grid grid-cols-2 mt-5">
                                            <Radio 
                                                id="useShippingAddress" 
                                                label="Use shipping address" 
                                                checked={!isNewBillingAddress}
                                                onChange={() => {
                                                    clearErrors();
                                                    setIsNewBillingAddress(false);
                                                }}
                                            />
                                            <Radio 
                                                id="newBillingAddress" 
                                                label="New billing address" 
                                                checked={isNewBillingAddress}
                                                onChange={() => {
                                                    setIsNewBillingAddress(true);
                                                }}
                                            />
                                        </div>
                                    {isNewBillingAddress && <>
                                        <div className="grid grid-cols-2 gap-5 mt-3">
                                            <div>
                                                <label className="form-label font-medium">Phone number</label>
                                                <Controller
                                                    name={`payments.0.billingAddress.phoneNumber`}
                                                    control={control}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "Phone number is required",
                                                        }
                                                    }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input 
                                                            id={`payments.0.billingAddress.phoneNumber`}
                                                            type="number" 
                                                            className="form-input mt-2"
                                                            defaultValue={value ?? ""}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                                {errors.payments?.[0]?.billingAddress?.phoneNumber && <p className="text-red-500 text-sm pt-1">{errors.payments?.[0]?.billingAddress?.phoneNumber.message}</p>}
                                            </div>
                                            <div>
                                                <label className="form-label font-medium">Email address</label>
                                                <Controller
                                                    name={`payments.0.billingAddress.email`}
                                                    control={control}
                                                    rules={{
                                                        validate: {
                                                            ["email"]: (v) => {
                                                                if (v && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(v)) {
                                                                    return "Email address is invalid";
                                                                } else {
                                                                    return true;
                                                                }
                                                            },
                                                        },
                                                    }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input 
                                                            id={`payments.0.billingAddress.email`}
                                                            type="text" 
                                                            className="form-input mt-2"
                                                            defaultValue={value ?? ""}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                                {errors.payments?.[0]?.billingAddress?.email && <p className="text-red-500 text-sm pt-1">{errors.payments?.[0]?.billingAddress?.email.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-5 mt-3">
                                            <div>
                                                <label className="form-label font-medium">First name</label>
                                                <Controller
                                                    name={`payments.0.billingAddress.firstName`}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input 
                                                            id={`payments.0.billingAddress.firstName`}
                                                            type="text" 
                                                            className="form-input mt-2"
                                                            defaultValue={value ?? ""}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label font-medium">Last name</label>
                                                <Controller
                                                    name={`payments.0.billingAddress.lastName`}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input 
                                                            id={`payments.0.billingAddress.lastName`}
                                                            type="text" 
                                                            className="form-input mt-2"
                                                            defaultValue={value ?? ""}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="form-label font-medium">Organization</label>
                                            <input 
                                                type="text" 
                                                className="form-input mt-2"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <label className="form-label font-medium">Address line 1</label>
                                            <Controller
                                                name={`payments.0.billingAddress.line1`}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <input 
                                                        id={`payments.0.billingAddress.line1`}
                                                        type="text" 
                                                        className="form-input mt-2"
                                                        defaultValue={value ?? ""}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <label className="form-label font-medium">Address line 2</label>
                                            <Controller
                                                name={`payments.0.billingAddress.line2`}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <input 
                                                        id={`payments.0.billingAddress.line2`}
                                                        type="text" 
                                                        className="form-input mt-2"
                                                        defaultValue={value ?? ""}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-5 mt-4">
                                            <div>
                                                <label className="form-label font-medium">City</label>
                                                <Controller
                                                    name={`payments.0.billingAddress.city`}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input 
                                                            id={`payments.0.billingAddress.city`}
                                                            type="text" 
                                                            className="form-input mt-2"
                                                            defaultValue={value ?? ""}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label font-medium">Country</label>
                                                <Select 
                                                    id="country"
                                                    className="mt-2"
                                                    options={countries} 
                                                    onChange={(val) => onChangeCountry(val)}     
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-5 mt-4 mb-10">
                                            <div>
                                                <label className="form-label font-medium">State / Province</label>
                                                <Select 
                                                    id="province"
                                                    className="mt-2"
                                                    options={regions} 
                                                    onChange={(val) => setValue("payments.0.billingAddress.regionName", val)}         
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label font-medium">Postal code</label>
                                                <Controller
                                                    name={`payments.0.billingAddress.postalCode`}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input 
                                                            id={`payments.0.billingAddress.postalCode`}
                                                            type="text" 
                                                            className="form-input mt-2"
                                                            defaultValue={value ?? ""}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </>}
                                    </div>
                                    <p className="text-xl font-medium text-gray-900 dark:text-white mt-5">Choose payment</p>
                                    <div className="grid grid-cols-2 gap-5 mt-3 mb-5">
                                        {paymentMethods.map(p => 
                                            <div 
                                                key={p.paymentMethodId} 
                                                className={`group/regular rounded-lg border ${p.paymentMethodId === values.payments?.[0]?.paymentId ? "border-2 border-indigo-600" : ""} hover:border-2 hover:border-indigo-600 cursor-pointer p-3`}
                                                onClick={() => onChangePaymentMethod(p)}
                                            >
                                                <div className="flex justify-between">
                                                    <p className="font-bold text-base">{p.name}</p>
                                                    <Unicons.UilCheckCircle className={`w-5 h-5 text-indigo-600 ${p.paymentMethodId === values.payments?.[0]?.paymentId ? "visible" : "invisible"} group-hover/regular:visible`}/>
                                                </div>
                                                <p className="mt-1 text-sm text-slate-600 dark:text-white">{p.description}</p>
                                            </div>)}      
                                    </div> 
                                    { values.payments?.[0]?.systemKeyword === "Bolt" && <BoltPayment/>}
                                </div>
                            </div>
                            <div className="mt-10 lg:mt-0">
                                <p className="text-2xl font-medium text-gray-900 dark:text-white pb-5">Order summary</p>
                                <div className="shadow p-6">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {values?.shipments?.[0]?.lineItems.map((lineItem: LineItem, index: number) => (
                                                <li key={lineItem.contentId} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        {lineItemImages[index] && <img src={lineItemImages[index]} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>}
                                                    </div>
                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                                <h3>
                                                                    <Link to="#">{lineItem.displayName}</Link>
                                                                </h3>
                                                                <p className="ml-4 text-sm text-gray-500">
                                                                    <Unicons.UilTrashAlt 
                                                                        className="h-6 w-6 cursor-pointer"
                                                                        onClick={() => {
                                                                            setSelectedLineItem(lineItem);
                                                                            setShowConfirmation(true);
                                                                        }}
                                                                    />
                                                                </p>
                                                            </div>
                                                            <p className="mt-1 text-gray-900 dark:text-white font-bold">{Currencies[market.currency]?.["symbol_native"]} {lineItem.placedPrice.toLocaleString('en-US')}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <div className="flex justify-end w-full">
                                                            <Controller
                                                                name={`shipments.0.lineItems.${index}.quantity`}
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
                                                                        id={`shipments.0.lineItems.${index}.quantity`}
                                                                        type="number"
                                                                        className="form-input text-sm !w-1/5"
                                                                        defaultValue={value ?? ""}
                                                                        onChange={(e) => onChangeQuantity(lineItem.contentId, e, onChange) }
                                                                    />
                                                                )}
                                                            />
                                                            {errors.shipments?.[0]?.lineItems?.[0]?.quantity && <p className="absolute text-red-500 text-sm mt-10">{errors.shipments[0].lineItems[0].quantity.message}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))} 
                                        </ul>
                                    </div>
                                    <div className="border-t border-gray-200 py-6 mt-10">
                                        <div className="text-base font-medium text-gray-900 dark:text-white">
                                            <label className="form-label font-medium">Coupon Code</label>
                                            <div className="grid grid-cols-4 gap-5 mt-2">
                                                <input 
                                                    type="text" 
                                                    className="col-span-3 form-input"
                                                    defaultValue={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                />
                                                <button 
                                                    className="col-span-1 rounded-md border border-transparent bg-slate-300 text-base font-medium text-slate-800 shadow-sm hover:bg-slate-400 py-1"
                                                    onClick={applyCouponCode}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-rows-3 gap-3 pb-3">
                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                            <p>Subtotal</p>
                                            <p>{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.subTotal.toLocaleString('en-US') ?? 0}</p>
                                        </div>
                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                            <p>Shipping</p>
                                            <p>{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.shippingTotal.toLocaleString('en-US') ?? 0}</p>
                                        </div>
                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                            <p>Taxes</p>
                                            <p>{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.taxTotal.toLocaleString('en-US') ?? 0}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 py-3">
                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                            <p className="font-bold text-lg">Total</p>
                                            <p className="font-bold text-lg">{Currencies[market.currency]?.["symbol_native"]} {cartValidation.totals?.total.toLocaleString('en-US') ?? 0}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 pt-6">
                                        <button 
                                            className="w-full rounded-md border border-transparent bg-indigo-600 px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            onClick={handleSubmit(onSubmit)}
                                        >Confirm Order</button>
                                    </div>
                                </div>
                            </div>
                    </div>}
                    {
                        isEmptyCart(cart) &&
                        <div className="flex flex-col">
                            <p className="mx-auto font-bold text-medium text-2xl dark:text-white">Your cart is empty</p>
                            <button className="mx-auto justify-center rounded-md border border-transparent bg-indigo-600 mt-5 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Search for food</button>
                        </div>
                    }
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

export default CheckOut;