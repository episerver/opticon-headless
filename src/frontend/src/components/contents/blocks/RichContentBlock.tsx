import { ContentData } from "@episerver/content-delivery";
import React, { FC } from "react";

interface RichContentBlockProps extends ContentData {
    backgroundImage1?: any;
    backgroundImage2?: any;
    mainBody?: any;
}

const RichContentBlock: FC<RichContentBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    console.log("RICH", props);
    return (
        <div className="container mt-6 mb-6">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div className="lg:col-span-5 md:col-span-6">
                    <div className="relative">
                        <img
                            src={props.backgroundImage1?.value.url}
                            className="rounded-full lg:w-[400px] w-[280px]"
                            alt=""
                        />
                        <div className="absolute ltr:-right-5 rtl:-left-5 -bottom-16">
                            <img
                                src={props.backgroundImage2?.value.url}
                                className="rounded-full lg:w-[280px] w-[200px] border-8 border-white dark:border-slate-900"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7 md:col-span-6 mt-8 md:mt-0">
                    <div className="ltr:lg:ml-5 rtl:lg:mr-5">
                        <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
                            Get inspiration for future trips weekly
                        </h3>

                        <p className="text-slate-400 max-w-xl">
                            Start working with Tailwind CSS that can provide everything you need to generate awareness,
                            drive traffic, connect. Dummy text is text that is used in the publishing industry or by web
                            designers to occupy the space which will later be filled with 'real' content.
                        </p>

                        <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-1 flex">
                                <i className="uil uil-check-circle text-indigo-600 text-xl ltr:mr-2 rtl:ml-2"></i>{" "}
                                Digital Marketing Solutions for Tomorrow
                            </li>
                            <li className="mb-1 flex">
                                <i className="uil uil-check-circle text-indigo-600 text-xl ltr:mr-2 rtl:ml-2"></i> Our
                                Talented & Experienced Marketing Agency
                            </li>
                            <li className="mb-1 flex">
                                <i className="uil uil-check-circle text-indigo-600 text-xl ltr:mr-2 rtl:ml-2"></i>{" "}
                                Create your own skin to match your brand
                            </li>
                        </ul>
                        <div className="mt-6">
                            <a
                                href="contact-one.html"
                                className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md ltr:mr-2 rtl:ml-2 mt-2"
                            >
                                <i className="uil uil-envelope"></i> Contact us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RichContentBlock;
