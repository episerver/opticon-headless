import { ContentData } from "@episerver/content-delivery";
import React, { useEffect, useState } from "react";
import { getContentLoader } from "../../../DefaultContext";
import NavigationMenuItem from "@models/block/NavigationMenuItem";
import LayoutSetting from "@models/block/LayoutSetting";
import { Link, useNavigate } from "react-router-dom";
import Config from "../../../config.json";
import UserMenu from "@components/layout/UserMenu";
import CartMenu from "./../CartMenu";
import "./Navbar.scss";
import AuthService from "../../../AuthService";
import MarketMenu from "../MarketMenu";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = React.useState<NavigationMenuItem[]>([]);
    const [layoutSettings, setLayoutSettings] = useState<LayoutSetting | undefined>(undefined);
    const [username, setUsername] = useState<string>("");

    const getLayoutSetting = async () => {
        const contentLoader = getContentLoader();
        const content = (await contentLoader.getContent("de079474-5e46-429a-b3fc-2ef582254785", {
            branch: "en",
        })) as LayoutSetting;
        setLayoutSettings(content);
    };

    const getMenu = async () => {
        const contentLoader = getContentLoader();
        const menuFolderName = (
            await contentLoader.getContent("3127a001-a816-4bd8-8deb-8e5d3f5d89d1", { branch: "en" })
        ).name;
        contentLoader.getChildren("3", { branch: "en" }).then((result) => {
            if (result) {
                const menuFolder = (result as ContentData[]).find((obj) => {
                    return obj.name === menuFolderName;
                });
                if (menuFolder) {
                    contentLoader.getChildren(menuFolder.contentLink.guidValue, { branch: "en" }).then((items) => {
                        if (items) {
                            const menuItems = (items as NavigationMenuItem[]).filter(
                                (item) => item.contentType.at(0) === "Block"
                            );
                            setMenuItems(menuItems);
                        }
                    });
                }
            }
        });
    };

    const toggleMenu = () => {
        document.getElementById("isToggle")?.classList.toggle("open");
        let isOpen = document.getElementById("navigation") as HTMLElement;
        if (isOpen.style.display === "block") {
            isOpen.style.display = "none";
        } else {
            isOpen.style.display = "block";
        }
    };

    const getUser = () => {
        AuthService.getUser().then((user: any) => {
            if (user && !user.expired) {
                setUsername(user.profile.name);
            }
        });
    };

    useEffect(() => {
        getLayoutSetting();
        getMenu();
        getUser();
    }, []);

    return (
        <nav id="topnav" className="defaultscroll is-sticky">
            <div className="container">
                <Link to="/" className="logo">
                    <span className="inline-block dark:hidden">
                        <img src={layoutSettings?.siteLogoDark?.url} className="l-dark" height="24" alt="" />
                        <img src={layoutSettings?.siteLogoLight?.url} className="l-light" height="24" alt="" />
                    </span>
                    <img
                        src={layoutSettings?.siteLogoLight?.url}
                        height="24"
                        className="hidden dark:inline-block"
                        alt=""
                    />
                </Link>
                <div className="menu-extras">
                    <div className="menu-item">
                        <a className="navbar-toggle" id="isToggle" onClick={() => toggleMenu()}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </a>
                    </div>
                </div>
                <ul className="buy-button list-none mb-0">
                    <li className="inline-block ltr:pl-1 rtl:pr-1 mb-0 cursor-pointer dropdown">
                        <CartMenu />
                    </li>
                    <li className="inline-block ltr:pl-1 rtl:pr-1 mb-0 cursor-pointer dropdown">
                        <MarketMenu />
                    </li>
                    <li className="inline-block ltr:pl-1 rtl:pr-1 mb-0 cursor-pointer dropdown">
                        {username && <UserMenu username={username} />}
                        {!username && (
                            <>
                                <button
                                    className="h-8 rounded-md border border-indigo-800 dark:border-hidden bg-white text-indigo-800 dark:text-indigo-800 px-3 font-medium hover:bg-slate-300 ml-4"
                                    onClick={() => AuthService.signIn()}
                                >
                                    Log in
                                </button>
                                <button
                                    className="h-8 rounded-md border border-indigo-800 dark:border-hidden bg-white text-indigo-800 dark:text-indigo-800 px-3 font-medium hover:bg-slate-300 ml-1"
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </li>
                </ul>
                <div id="navigation">
                    <ul className="navigation-menu nav-light">
                        {menuItems?.map((item) => {
                            return (
                                <li key={item.text}>
                                    <Link
                                        to={item.link.replace(Config.BASE_URL, "")}
                                        className="text-black dark:text-white font-bold inline-block"
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
