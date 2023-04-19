import React, { useEffect, useState } from "react";
import { getContentLoader } from "../../DefaultContext";
import LayoutSetting from "@models/block/LayoutSetting";

const Footer = () => {
    const [layoutSettings, setLayoutSettings] = useState<LayoutSetting | undefined>(undefined);
  
    const getLayoutSetting = async () => {
      const contentLoader = getContentLoader();
      const content = await contentLoader.getContent("de079474-5e46-429a-b3fc-2ef582254785", { branch: "en" }) as LayoutSetting;
      setLayoutSettings(content);
    }

    useEffect(() => {
        getLayoutSetting();
    }, [])

    return (
        <footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200">    
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="grid grid-cols-1 mt-12">
                            <div className="text-center">
                                <p className="max-w-3xl mx-auto mt-6">{layoutSettings?.introduction}</p>                              
                            </div>
                        </div>
                        <div className="py-[60px] px-0">
                            <div className="grid lg:grid-cols-3 md:grid-cols-6 justify-center gap-[30px]">
                                <div className="text-center">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold mb-4">{layoutSettings?.companyHeader}</h5>
                                    {layoutSettings?.companyPhone && <p className="mb-2"><a href={`tel:${layoutSettings.companyPhone}`} className="text-gray-200">Phone: {layoutSettings.companyPhone}</a></p>}
                                    {layoutSettings?.companyEmail && <p className="mb-2"><a href={`mailto:${layoutSettings.companyEmail}`} className="text-gray-200">Email: {layoutSettings?.companyEmail}</a></p>}
                                    {layoutSettings?.companyAddress && <p className="mb-0">{layoutSettings.companyAddress}</p>}
                                </div>
                                <div className="text-center">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold mb-4">{layoutSettings?.linksHeader}</h5>
                                    {layoutSettings?.links?.map(link => (<p key={link.title} className="mb-2"><a href={link.href} className="text-gray-200" target="_blank">{link.text}</a></p>))}
                                </div>
                                <div className="text-center">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold mb-4">{layoutSettings?.socialHeader}</h5>
                                    {layoutSettings?.socialLinks?.map(link => (<p key={link.title} className="mb-2"><a href={link.href} className="text-gray-200" target="_blank">{link.text}</a></p>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-[30px] px-0 border-t border-slate-800">
                <div className="container text-center">
                    <div className="grid md:grid-cols-1">
                        <p className="mb-0">© {new Date().getFullYear()} {layoutSettings?.copyright}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
