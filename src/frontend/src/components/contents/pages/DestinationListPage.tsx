import React, { useEffect, useState } from "react";
import PropertyContentArea from "@components/contents/properties/PropertyContentArea";
import DestinationItem from "@models/page/DestinationItem";
import { getContentLoader } from "../../../DefaultContext";
import { ContentData } from "@episerver/content-delivery";
import { ContentArea } from "@models/property/ContentArea";
import { ChevronLeft, ChevronRight, MapPin } from "react-feather";
import Config from "../../../config.json";
import { Link } from "react-router-dom";

interface DestinationListPageProps extends ContentData {
    mainContentArea: ContentArea;
}

const DestinationListPage: React.FC<DestinationListPageProps> = (props) => {
    const [destinations, setDestinations] = useState<DestinationItem[]>([]);

    const getDestinations = async () => {
        const contentLoader = getContentLoader();

        let children = (await contentLoader.getChildren(props.contentLink.guidValue, {
            branch: "en",
        })) as DestinationItem[];

        setDestinations(children);
    };

    useEffect(() => {
        getDestinations();
    }, []);

    return (
        <>
            <PropertyContentArea value={props.mainContentArea} />
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        {destinations?.map((d, index) => (
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
                        ))}
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

export default DestinationListPage;
