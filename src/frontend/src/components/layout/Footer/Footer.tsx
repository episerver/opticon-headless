import React, { useEffect, useState } from "react";
import { getContentLoader } from "../../../DefaultContext";
import LayoutSetting from "@models/block/LayoutSetting";
import { ChevronRight, Facebook, Instagram, Linkedin, Mail, Twitter } from "react-feather";
import AmericanExpress from "../../../assets/images/payments/american-ex.png";
import Discovery from "../../../assets/images/payments/discover.png";
import MasterCard from "../../../assets/images/payments/master-card.png";
import PayPal from "../../../assets/images/payments/paypal.png";
import Visa from "../../../assets/images/payments/visa.png";
import "./Footer.scss";

const Footer: React.FC = () => {
    const [layoutSettings, setLayoutSettings] = useState<LayoutSetting | undefined>(undefined);

    const getLayoutSetting = async () => {
        const contentLoader = getContentLoader();
        const content = (await contentLoader.getContent("de079474-5e46-429a-b3fc-2ef582254785", {
            branch: "en",
        })) as LayoutSetting;
        setLayoutSettings(content);
    };

    useEffect(() => {
        getLayoutSetting();
    }, []);

    return (
        <footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200">
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="py-[60px] px-0">
                            <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                <div className="lg:col-span-4 md:col-span-12">
                                    <a href="#" className="text-[22px] focus:outline-none">
                                        <img style={{ maxWidth: "60%" }} src={layoutSettings?.footerLogo.url} alt="" />
                                    </a>
                                    <p className="mt-6 text-gray-300">{layoutSettings?.introduction}</p>
                                    <ul className="list-none mt-6">
                                        <li className="inline">
                                            <a
                                                href={layoutSettings?.linkedInUrl}
                                                target="_blank"
                                                className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                            >
                                                <Linkedin height={16} width={16} />
                                            </a>
                                        </li>
                                        <li className="inline">
                                            <a
                                                href={layoutSettings?.facebookUrl}
                                                target="_blank"
                                                className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                            >
                                                <Facebook height={16} width={16} />
                                            </a>
                                        </li>
                                        <li className="inline">
                                            <a
                                                href={layoutSettings?.instagramUrl}
                                                target="_blank"
                                                className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                            >
                                                <Instagram height={16} width={16} />
                                            </a>
                                        </li>
                                        <li className="inline">
                                            <a
                                                href={layoutSettings?.twitterUrl}
                                                target="_blank"
                                                className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                            >
                                                <Twitter height={16} width={16} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="lg:col-span-2 md:col-span-4">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold">
                                        {layoutSettings?.header1}
                                    </h5>
                                    <ul className="list-none footer-list mt-6">
                                        {layoutSettings?.header1Links?.map((item, index) => (
                                            <li key={index} className={index != 0 ? "mt-[10px]" : ""}>
                                                <a
                                                    href={item.href}
                                                    target={item.target}
                                                    className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                                                >
                                                    <ChevronRight
                                                        style={{ paddingBottom: "3px", display: "inline-block" }}
                                                    />
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:col-span-3 md:col-span-4">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold">
                                        {layoutSettings?.header2}
                                    </h5>
                                    <ul className="list-none footer-list mt-6">
                                        {layoutSettings?.header2Links?.map((item, index) => (
                                            <li key={index} className={index != 0 ? "mt-[10px]" : ""}>
                                                <a
                                                    href={item.href}
                                                    target={item.target}
                                                    className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                                                >
                                                    <ChevronRight
                                                        style={{ paddingBottom: "3px", display: "inline-block" }}
                                                    />
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="lg:col-span-3 md:col-span-4">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold">Newsletter</h5>
                                    <p className="mt-6">Sign up and receive the latest tips via email.</p>
                                    <form>
                                        <div className="grid grid-cols-1">
                                            <div className="foot-subscribe my-3">
                                                <label className="form-label">
                                                    Write your email <span className="text-red-600">*</span>
                                                </label>
                                                <div className="form-icon relative mt-2">
                                                    <Mail className="w-4 h-4 absolute top-3 ltr:left-4 rtl:right-4" />
                                                    <input
                                                        type="email"
                                                        className="form-input bg-gray-800 border border-gray-800 text-gray-100 ltr:pl-12 rtl:pr-12 focus:shadow-none"
                                                        placeholder="Email"
                                                        name="email"
                                                        required={false}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
                                            >
                                                Subscribe
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-[30px] px-0 border-t border-slate-800">
                <div className="container text-center">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="ltr:md:text-left rtl:md:text-right text-center">
                            <p className="mb-0">{layoutSettings?.copyright}</p>
                        </div>

                        <ul className="list-none ltr:md:text-right rtl:md:text-left text-center mt-6 md:mt-0">
                            <li className="inline">
                                <img src={AmericanExpress} className="max-h-6 inline" title="American Express" alt="" />
                            </li>
                            <li className="inline ml-1">
                                <img src={Discovery} className="max-h-6 inline" title="Discover" />
                            </li>
                            <li className="inline ml-1">
                                <img src={MasterCard} className="max-h-6 inline" title="Master Card" />
                            </li>
                            <li className="inline ml-1">
                                <img src={PayPal} className="max-h-6 inline" title="Paypal" />
                            </li>
                            <li className="inline ml-1">
                                <img src={Visa} className="max-h-6 inline" title="Visa" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
