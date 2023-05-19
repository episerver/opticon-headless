import React, { useEffect, useState } from "react";
import backgroundImage from "@assets/images/blog/bg.jpg";
import * as Unicons from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { ContentData } from "@episerver/content-delivery";
import { getContentLoader } from "../../../DefaultContext";
import Config from "../../../config.json";
import Pagination from "@models/common/Pagination";
import BlogItem from "@models/page/BlogItem";

const BlogListPage: React.FC<ContentData> = (props) => {
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: 1,
        pageSize: 20,
    });
    const [totalPage, setTotalPage] = useState<number>(10);

    const getBlogs = async () => {
        const contentLoader = getContentLoader();

        let children = (await contentLoader.getChildren(props.contentLink.guidValue, {
            branch: "en",
        })) as BlogItem[];

        setBlogs(children);
    };

    useEffect(() => {
        getBlogs();
    }, [pagination.pageIndex]);
    return (
        <>
            <section
                className="relative table w-full py-32 lg:py-36 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
                            Blogs & News
                        </h3>
                    </div>
                </div>
            </section>
            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                        {blogs.map((blog) => (
                            <div
                                className="blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden"
                                key={blog.contentLink.guidValue}
                            >
                                {blog.pageImage && <img src={blog.pageImage.url} alt="" />}
                                <div className="content p-6">
                                    <Link
                                        to={blog.url.replace(Config.BASE_URL, "")}
                                        className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out"
                                    >
                                        {blog.name}
                                    </Link>
                                    <p className="text-slate-400 mt-3">{blog.metaDescription}</p>
                                    <div className="mt-4">
                                        <Link
                                            to={blog.url.replace(Config.BASE_URL, "")}
                                            className="btn btn-link font-normal hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out"
                                        >
                                            Read More <Unicons.UilArrowRight className="float-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                        <div className="md:col-span-12 text-center">
                            <nav aria-label="Page navigation example">
                                <ul className="inline-flex items-center -space-x-px">
                                    <li>
                                        <p
                                            className="cursor-pointer w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 ltr:rounded-l-lg rtl:rounded-r-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                            onClick={() => {
                                                if (pagination.pageIndex > 1) {
                                                    setPagination({
                                                        ...pagination,
                                                        pageIndex: pagination.pageIndex - 1,
                                                    });
                                                }
                                            }}
                                        >
                                            <Unicons.UilAngleLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1" />
                                        </p>
                                    </li>
                                    {[...Array(totalPage).keys()].map((page) => {
                                        if (pagination.pageIndex === page + 1) {
                                            return (
                                                <li key={page}>
                                                    <p
                                                        aria-current="page"
                                                        className="cursor-pointer z-10 w-[40px] h-[40px] inline-flex justify-center items-center text-white bg-indigo-600 border border-indigo-600"
                                                        onClick={() => {
                                                            setPagination({ ...pagination, pageIndex: page + 1 });
                                                        }}
                                                    >
                                                        {page + 1}
                                                    </p>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={page}>
                                                    <p
                                                        className="cursor-pointer w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                                        onClick={() => {
                                                            setPagination({ ...pagination, pageIndex: page + 1 });
                                                        }}
                                                    >
                                                        {page + 1}
                                                    </p>
                                                </li>
                                            );
                                        }
                                    })}
                                    <li>
                                        <p
                                            className="cursor-pointer w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 ltr:rounded-r-lg rtl:rounded-l-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                                            onClick={() => {
                                                if (pagination.pageIndex < totalPage) {
                                                    setPagination({
                                                        ...pagination,
                                                        pageIndex: pagination.pageIndex + 1,
                                                    });
                                                }
                                            }}
                                        >
                                            <Unicons.UilAngleRight className="text-[20px] rtl:rotate-180 rtl:-mt-1" />
                                        </p>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="container md:mt-24 mt-16">
                    <div className="md:flex justify-center">
                        <div className="lg:w-2/3 text-center">
                            <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold mb-6">
                                Subscribe our weekly subscription
                            </h3>
                            <p className="text-slate-400 max-w-xl mx-auto">
                                Add some text to explain benefits of subscripton on your services. We'll send you the
                                best of our blog just once a weekly.
                            </p>
                            <div className="mt-8">
                                <div className="text-center subcribe-form">
                                    <form className="relative mx-auto max-w-xl">
                                        <input
                                            type="email"
                                            id="subemail"
                                            name="name"
                                            className="pt-4 ltr:pr-40 rtl:pl-40 pb-4 ltr:pl-6 rtl:pr-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-700"
                                            placeholder="Enter your email id.."
                                        />
                                        <button
                                            type="submit"
                                            className="btn absolute top-[2px] ltr:right-[3px] rtl:left-[3px] h-[46px] bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-full"
                                        >
                                            Subcribe Now
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogListPage;
