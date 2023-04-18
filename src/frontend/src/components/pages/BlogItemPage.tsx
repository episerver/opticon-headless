import React, { FC } from "react";
import Slide02 from "@assets/images/blog/slide02.jpg";
import Blog06 from "@assets/images/blog/06.jpg";
import Blog07 from "@assets/images/blog/07.jpg";
import Blog08 from "@assets/images/blog/08.jpg";
import Client01 from "@assets/images/client/01.jpg";
import Client05 from "@assets/images/client/05.jpg";
import backgroundImage from "@assets/images/blog/bg.jpg";
import { Link } from "react-router-dom";
import ReplyIcon from "mdi-react/ReplyIcon";
import moment from "moment";
import { User, Mail, MessageCircle, Facebook, Twitter, Linkedin, GitHub, Youtube, Gitlab } from 'react-feather';
import { BlogItem } from "@models/Blog";

const BlogItemPage: FC<BlogItem> = (props) => {
    return (
        <>
            <section className="relative table w-full py-32 lg:py-36 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="mb-3 text-3xl leading-normal font-medium text-white">{props.name}</h3>
                        <ul className="list-none mt-6">
                            <li className="inline-block font-semibold text-white/50 mx-5"> <span className="text-white block">Date :</span> <span className="block">{moment(props.startPublish).format('ll')}</span></li>
                            <li className="inline-block font-semibold text-white/50 mx-5"> <span className="text-white block">Time :</span> <span className="block">{props.minsToRead ?? 0} Min Read</span></li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute right-0 sm:-bottom-px -bottom-[2px] left-0 overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-8 md:col-span-6">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800">
                                <img src={Slide02} className="rounded-md" alt=""/>
                                <div className="mt-6" dangerouslySetInnerHTML={{
                                    __html: props.mainBody ?? ""
                                }}>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 md:col-span-6">
                            <div className="sticky top-20">
                                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center">Author</h5>
                                <div className="text-center mt-8">
                                    <img src={Client05} className="h-24 w-24 mx-auto rounded-full shadow mb-4" alt=""/>
                                    <Link to="" className="text-lg font-semibold hover:text-indigo-600 transition-all duration-500 ease-in-out">Cristina Romsey</Link>
                                    <p className="text-slate-400">Content Writer</p>
                                </div>
                                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center mt-8">Recent post</h5>
                                <div className="flex items-center mt-8">
                                    <img src={Blog06} className="h-16 rounded-md shadow dark:shadow-gray-800" alt=""/>
                                    <div className="ltr:ml-3 rtl:mr-3">
                                        <Link to="" className="font-semibold hover:text-indigo-600">Consultant Business</Link>
                                        <p className="text-sm text-slate-400">1st May 2022</p>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <img src={Blog07} className="h-16 rounded-md shadow dark:shadow-gray-800" alt=""/>
                                    <div className="ltr:ml-3 rtl:mr-3">
                                        <Link to="" className="font-semibold hover:text-indigo-600">Grow Your Business</Link>
                                        <p className="text-sm text-slate-400">1st May 2022</p>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <img src={Blog08} className="h-16 rounded-md shadow dark:shadow-gray-800" alt=""/>
                                    <div className="ltr:ml-3 rtl:mr-3">
                                        <Link to="" className="font-semibold hover:text-indigo-600">Look On The Glorious Balance</Link>
                                        <p className="text-sm text-slate-400">1st May 2022</p>
                                    </div>
                                </div>
                                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center mt-8">Social sites</h5>
                                <ul className="list-none text-center mt-8">
                                    <li className="inline">
                                        <Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600">
                                            <Facebook className="h-4 w-4"/>
                                        </Link>
                                    </li>
                                    <li className="inline">
                                        <Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600">
                                            <Twitter className="h-4 w-4"/>
                                        </Link>
                                    </li>
                                    <li className="inline">
                                        <Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600">
                                            <Linkedin className="h-4 w-4"/>
                                        </Link>
                                    </li>
                                    <li className="inline">
                                        <Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600">
                                            <GitHub className="h-4 w-4"/>
                                        </Link>
                                    </li>
                                    <li className="inline">
                                        <Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600">
                                            <Youtube className="h-4 w-4"/>
                                        </Link>
                                    </li>
                                    <li className="inline">
                                        <Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600">
                                            <Gitlab className="h-4 w-4"/>
                                        </Link>
                                    </li>
                                </ul>
                                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center mt-8">Tagscloud</h5>
                                <ul className="list-none text-center mt-8">
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Business</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Finance</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Marketing</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Fashion</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Bride</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Lifestyle</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Travel</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Beauty</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Video</Link></li>
                                    <li className="inline-block m-2"><Link to="" className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out">Audio</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container md:mt-24 mt-16">
                    <div className="md:flex justify-center">
                        <div className="lg:w-2/3 text-center">
                            <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold mb-6">Subscribe our weekly subscription</h3>
                            <p className="text-slate-400 max-w-xl mx-auto">Add some text to explain benefits of subscripton on your services. We'll send you the best of our blog just once a weekly.</p>
                            <div className="mt-8">
                                <div className="text-center subcribe-form">
                                    <form className="relative mx-auto max-w-xl">
                                        <input type="email" id="subemail" name="name" className="pt-4 ltr:pr-40 rtl:pl-40 pb-4 ltr:pl-6 rtl:pr-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-700" placeholder="Enter your email id.." />
                                        <button type="submit" className="btn absolute top-[2px] ltr:right-[3px] rtl:left-[3px] h-[46px] bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-full">Subcribe Now</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
   )
}

export default BlogItemPage;