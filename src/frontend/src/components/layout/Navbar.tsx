import { ContentData } from "@episerver/content-delivery";
import React, { useEffect, useState } from "react";
import { getContentLoader } from "../../DefaultContext";
import { ShoppingCart } from "react-feather";
import NavigationMenuItem from "@models/block/NavigationMenuItem";
import LayoutSetting from "@models/block/LayoutSetting";
import { Link, useLocation } from "react-router-dom";
import Config from "../../config.json";
import UserMenu from "@components/layout/UserMenu";
import { NavStickyRoutes } from "../../constants/NavStickyRoutes";
import CartMenu from "./CartMenu";

const Navbar = () => {
    const location = useLocation();
    const [menuItems, setMenuItems] = React.useState<NavigationMenuItem[] | null>(null);
    const [layoutSettings, setLayoutSettings] = useState<LayoutSetting | undefined>(undefined);

    const getLayoutSetting = async () => {
        const contentLoader = getContentLoader();
        const content = (await contentLoader.getContent("de079474-5e46-429a-b3fc-2ef582254785", {
            branch: "en",
        })) as LayoutSetting;
        setLayoutSettings(content);
    };

    const getMenu = () => {
        const contentLoader = getContentLoader();
        contentLoader.getChildren("3", { branch: "en" }).then((result) => {
            if (result) {
                const menuFolder = (result as ContentData[]).find((obj) => {
                    return obj.name === "Menu";
                });
                if (menuFolder) {
                    contentLoader.getChildren(menuFolder.contentLink.guidValue, { branch: "en" }).then((items) => {
                        if (items) {
                            setMenuItems(items as NavigationMenuItem[]);
                        } else {
                            setMenuItems([
                                {
                                    link: "#",
                                    text: "Please add menu items in menu folder",
                                },
                            ]);
                        }
                    });
                } else {
                    setMenuItems([
                        {
                            link: "#",
                            text: "Please create Menu folder under shared blocks and add menu items",
                        },
                    ]);
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

    const updateNavBarClass = () => {
        const navbar = document.getElementById("topnav");
        if (navbar != null) {
            if (!NavStickyRoutes.includes(location.pathname)) {
                if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
                    navbar.classList.add("nav-sticky");
                } else {
                    navbar.classList.remove("nav-sticky");
                }
            } else {
                navbar.classList.add("nav-sticky");
            }
        }
    };

    const addScrollEvent = () => {
        window.addEventListener("scroll", (ev) => {
            ev.preventDefault();
            updateNavBarClass();
        });
    };

    useEffect(() => {
        getLayoutSetting();
        getMenu();
        addScrollEvent();
    }, []);

    useEffect(() => {
        updateNavBarClass();
    }, [location.key]);

    return (
        <nav id="topnav" className="defaultscroll is-sticky">
            <div className="container">
                <Link to="/" className="logo w-1/5">
                    {layoutSettings?.siteLogoDark && (
                        <img src={layoutSettings?.siteLogoDark.url} className="inline-block dark:hidden" alt="" />
                    )}
                    {layoutSettings?.siteLogoLight && (
                        <img src={layoutSettings?.siteLogoLight.url} className="hidden dark:inline-block" alt="" />
                    )}
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
                        <UserMenu />
                    </li>
                </ul>
                <div id="navigation">
                    <ul className="navigation-menu nav-light">
                        {menuItems?.map((item) => {
                            return (
                                <li key={item.text}>
                                    <Link
                                        to={item.link?.replace(Config.BASE_URL, "")}
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
