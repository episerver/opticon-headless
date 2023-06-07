import React, { useEffect, useState } from "react";
import backgroundImage from "@assets/images/products/house.jpg";
import * as Unicons from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import Config from "../config.json";
import BlogItem from "@models/page/BlogItem";
import Pagination from "@models/common/Pagination";
import { ChevronLeft, ChevronRight, MapPin } from "react-feather";
import Product from "@models/Product";
import { getContentLoader } from "../DefaultContext";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: 1,
        pageSize: 20,
    });
    const [totalPage, setTotalPage] = useState<number>(10);

    const getProducts = async () => {
        // const contentLoader = getContentLoader();
        // let children = (await contentLoader.getChildren(, {
        //     branch: "en",
        // })) as BlogItem[];
        // setBlogs(children);
    };

    useEffect(() => {
        getProducts();
    }, [pagination.pageIndex]);
    return (
        <>
            <section
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
                            Product List
                        </h3>
                    </div>
                </div>
            </section>
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        <div className="group rounded-md bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-800 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
                            <div className="relative">
                                <img src="assets/images/real/property/1.jpg" alt="" />

                                <div className="absolute top-6 ltr:right-6 rtl:left-6">
                                    <a
                                        href=""
                                        className="btn btn-icon text-lg bg-white dark:bg-slate-900 border-0 shadow dark:shadow-gray-800 rounded-full text-red-600"
                                    >
                                        <i className="mdi mdi-heart"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="pb-6">
                                    <a
                                        href="property-detail.html"
                                        className="text-lg hover:text-indigo-600 font-medium ease-in-out duration-500"
                                    >
                                        10765 Hillshire Ave, Baton Rouge, LA 70810, USA
                                    </a>
                                </div>

                                <ul className="py-6 border-y border-gray-100 dark:border-gray-800 flex items-center list-none">
                                    <li className="flex items-center ltr:mr-4 rtl:ml-4">
                                        <i className="uil uil-compress-arrows text-2xl ltr:mr-2 rtl:ml-2 text-indigo-600"></i>
                                        <span>8000sqf</span>
                                    </li>

                                    <li className="flex items-center ltr:mr-4 rtl:ml-4">
                                        <i className="uil uil-bed-double text-2xl ltr:mr-2 rtl:ml-2 text-indigo-600"></i>
                                        <span>4 Beds</span>
                                    </li>

                                    <li className="flex items-center">
                                        <i className="uil uil-bath text-2xl ltr:mr-2 rtl:ml-2 text-indigo-600"></i>
                                        <span>4 Baths</span>
                                    </li>
                                </ul>

                                <ul className="pt-6 flex justify-between items-center list-none">
                                    <li>
                                        <span className="text-slate-400">Price</span>
                                        <p className="text-lg font-medium">$5000</p>
                                    </li>

                                    <li>
                                        <span className="text-slate-400">Rating</span>
                                        <ul className="text-lg font-medium text-amber-400 list-none">
                                            <li className="inline">
                                                <i className="mdi mdi-star"></i>
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star"></i>
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star"></i>
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star"></i>
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star"></i>
                                            </li>
                                            <li className="inline text-black dark:text-white">5.0(30)</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* {products?.map((d, index) => (
                            <div
                                key={index}
                                className="group rounded-md bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-800 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500"
                            >
                                <div className="relative">
                                    <Link to={d.contentLink.url.replace(Config.BASE_URL, "")}>
                                        <img className="aspect-[8/5]" src={d.pageImage?.url} alt={d.name} />
                                    </Link>
                                </div>

                                <div className="p-6">
                                    <div className="pb-6">
                                        <Link
                                            to={d.contentLink.url.replace(Config.BASE_URL, "")}
                                            className="text-lg hover:text-indigo-600 font-medium ease-in-out duration-500"
                                        >
                                            {d.name}
                                        </Link>
                                    </div>

                                    <ul className="py-6 border-y border-gray-100 dark:border-gray-800 flex items-center list-none">
                                        <li className="flex items-center ltr:mr-4 rtl:ml-4">
                                            <MapPin className="ltr:mr-2 rtl:ml-2 text-indigo-600" />
                                            <span>{d.continent}</span>
                                        </li>

                                        <li className="flex items-center ltr:mr-4 rtl:ml-4">
                                            <span>{d.country}</span>
                                        </li>
                                    </ul>

                                    <ul className="pt-6 flex justify-between items-center list-none">
                                        <li>
                                            <span className="text-slate-400">Yearly passengers</span>
                                            <p className="text-lg font-medium">{d.yearlyPassengers}</p>
                                        </li>

                                        <li>
                                            <span className="text-slate-400">Airport initials</span>
                                            <ul className="text-lg font-medium text-amber-400 list-none">
                                                <li className="inline text-black dark:text-white">
                                                    {d.airportInitials}
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))} */}
                    </div>

                    <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                        <div className="md:col-span-12 text-center">
                            <nav>
                                <ul className="inline-flex items-center -space-x-px">
                                    <li>
                                        <a
                                            href="#"
                                            className="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 ltr:rounded-l-lg rtl:rounded-r-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                        >
                                            <i className="uil uil-angle-left text-[20px] rtl:rotate-180 rtl:-mt-1"></i>
                                            <ChevronLeft height={13} width={13} strokeWidth={3} />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                        >
                                            1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                        >
                                            2
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            aria-current="page"
                                            className="z-10 w-[40px] h-[40px] inline-flex justify-center items-center text-white bg-indigo-600 border border-indigo-600"
                                        >
                                            3
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                        >
                                            4
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                        >
                                            5
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 ltr:rounded-r-lg rtl:rounded-l-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                        >
                                            <ChevronRight height={13} width={13} strokeWidth={3} />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductList;
