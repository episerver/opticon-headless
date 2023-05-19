import React, { useEffect } from "react";
import PropertyContentArea from "@components/contents/properties/PropertyContentArea";
import { ContentData } from "@episerver/content-delivery";
import { ContentArea } from "@models/property/ContentArea";
import DestinationItem from "@models/page/DestinationItem";
import { MapPin } from "react-feather";

const DestinationItemPage: React.FC<DestinationItem> = (props) => {
    console.log("destination", props);
    useEffect(() => {}, []);

    return (
        <>
            <div className="relative truncate" style={{ paddingBottom: `25%` }}>
                <div
                    className="absolute w-full h-full bg-cover bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${props.pageImage.url})` }}
                ></div>

                <div className="absolute w-full h-full" style={{ backgroundColor: "black", opacity: 0.5 }}></div>
                <div className="absolute w-full h-full flex flex-col" style={{ justifyContent: "center" }}>
                    <div className="relative p-0 m-12" style={{ color: "white", textAlign: "center" }}>
                        <div className="no-tailwindcss-base">
                            <h1>{props.name}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container md:mt-24 mt-16">
                <div className="md:flex">
                    <div className="lg:w-2/3 md:w-1/2 md:p-4 px-3">
                        <h4 className="text-2xl font-medium">{props.name}</h4>

                        <ul className="py-6 flex items-center list-none">
                            <li className="flex items-center ltr:lg:mr-6 rtl:lg:ml-6 ltr:mr-4 rtl:ml-4">
                                <MapPin className="uil uil-compress-arrows lg:text-3xl text-2xl ltr:mr-2 rtl:ml-2 text-indigo-600" />
                                <span className="lg:text-xl">{props.continent}</span>
                            </li>

                            <li className="flex items-center ltr:lg:mr-6 rtl:lg:ml-6 ltr:mr-4 rtl:ml-4">
                                <span className="lg:text-xl">{props.country}</span>
                            </li>
                        </ul>
                        <p className="text-slate-400 mb-4">{props.mainIntro}</p>
                        <div
                            className="no-tailwindcss-base"
                            dangerouslySetInnerHTML={{ __html: props.mainBody ?? "" }}
                        />

                        <div className="w-full leading-[0] border-0 mt-6">
                            {/* <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                                style="border:0"
                                className="w-full h-[500px]"
                                allowFullScreen={false}
                            ></iframe> */}
                        </div>
                    </div>

                    <div className="lg:w-1/3 md:w-1/2 md:p-4 px-3 mt-8 md:mt-0">
                        <div className="sticky top-20">
                            <div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow dark:shadow-gray-800">
                                <div className="p-6">
                                    <h5 className="text-2xl font-medium">Information:</h5>

                                    <ul className="list-none mt-4">
                                        <li className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Airport initials</span>
                                            <span className="font-medium text-sm">{props.airportInitials}</span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2">
                                            <span className="text-slate-400 text-sm">Average temperature</span>
                                            <span className="font-medium text-sm">{props.avgTemp}</span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2">
                                            <span className="text-slate-400 text-sm">Yearly passengers</span>
                                            <span className="font-medium text-sm">{props.yearlyPassengers}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DestinationItemPage;
