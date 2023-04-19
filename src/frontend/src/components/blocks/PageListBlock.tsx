import { ContentData } from '@episerver/content-delivery';
import PropertyType from '@models/common/PropertyType';
import React, { FC, Fragment, useEffect, useState } from 'react';
import BlogItem from '@models/page/BlogItem';
import { getContentLoader } from '../../DefaultContext';
import { Link } from 'react-router-dom';
import Config from "../../config.json";
import * as Unicons from '@iconscout/react-unicons';

interface Root {
    expandedValue: BlogItem[];
    propertyDataType: string;
}

interface PageListBlockProps extends ContentData {
    heading?: PropertyType;
    description?: PropertyType;
    numberOfResults?: PropertyType;
    roots?: Root;
}

const PageListBlock: FC<PageListBlockProps> = (props): JSX.Element => {
    const [contents, setContents] = useState<BlogItem[]>([])

    const getContents = async () => {
        const contentLoader = getContentLoader();
        let promises = [] as any;

        props.roots?.expandedValue.forEach((content) => {
            promises.push(contentLoader.getChildren(content.contentLink.guidValue, { branch: "en" }))
        })

        const res = (await Promise.all(promises)) as Array<ContentData[]>;
        const contents = res.reduce((prev, current) => ([...prev, ...current]), []) as BlogItem[];
        setContents(contents.slice(0, 5));
    }

    useEffect(() => {
        getContents();
    }, [])

    return (
        <section className="relative md:py-24 py-16 overflow-hidden">
            <div className="container md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">{props.heading?.value}</h3>
                    <p className="text-slate-400 max-w-xl mx-auto">{props.description?.value}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
                    {contents.map(content => (<div key={content.contentLink.guidValue} className="blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden">
                        {content.pageImage && <img src={content.pageImage.url} alt=""/>}
                        <div className="content p-6">
                            <a href="blog-detail.html" className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out">{content.name}</a>
                            <p className="text-slate-400 mt-3">{content.metaDescription}</p>
                            <div className="mt-4">
                            <Link to={content.url.replace(Config.BASE_URL, "")} className="btn btn-link font-normal hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">
                                Read More <Unicons.UilArrowRight className="float-right"/>
                            </Link>
                            </div>
                        </div>
                    </div>))} 
                </div>
            </div>
        </section>
    )
};

export default PageListBlock;
