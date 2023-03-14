import { ContentData } from "@episerver/content-delivery";
import React, { useEffect, useState } from "react";
import { getContentLoader } from "../DefaultContext";
const Navbar = () => {
    const [menuItems, setMenuItems] = React.useState<ContentData[] | null>(null);

    useEffect(() => {
        const contentLoader = getContentLoader();
        contentLoader.getChildren("3", { branch: "en" }).then((result) => {
            if (result) {
                const menuFolder = (result as ContentData[]).find((obj) => {
                    return obj.name === "Menu";
                });
                if (menuFolder) {
                    contentLoader.getChildren(menuFolder.contentLink.guidValue, { branch: "en" }).then((items) => {
                        if (items) {
                            setMenuItems(items as ContentData[]);
                        }
                        else {
                            setMenuItems([{
                                link:'#',
                                text: "Please add menu items in menu folder"
                            }])
                        }
                    });
                }
                else {
                    setMenuItems([{
                        link:'#',
                        text: "Please create Menu folder under shared blocks and add menu items"
                    }])
                }
            }
        });
    }, []);

    return (
        <nav className="flex justify-between items-center h-20 px-4 w-full text-black bg-gray-200">
            <h1>Opticon Headless.</h1>
            <ul className="hidden md:flex">
                {menuItems?.map((item, index) => {
                    return (
                        <li key={index}>
                            <a href={item.link}>{item.text}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
