import { ContentData } from "@episerver/content-delivery";
import React, { useEffect, useState } from "react";
import { getContentLoader } from "../../DefaultContext";
import { ShoppingCart, User } from 'react-feather';
import NavigationMenuItem from "@models/NavigationMenuItem";
import LayoutSetting from "@models/LayoutSetting";
import { Link, useNavigate } from 'react-router-dom';
import Config from "../../config.json";
import AuthService from "../../AuthService";

const Navbar = () => {
    const [menuItems, setMenuItems] = React.useState<NavigationMenuItem[] | null>(null);
    const [layoutSettings, setLayoutSettings] = useState<LayoutSetting | undefined>(undefined);
    const [username, setUsername] = useState<string>("");

    const getLayoutSetting = async () => {
      const contentLoader = getContentLoader();
      const content = await contentLoader.getContent("de079474-5e46-429a-b3fc-2ef582254785", { branch: "en" }) as LayoutSetting;
      setLayoutSettings(content);
    }

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
    }

    const getUser = () => {
        AuthService.getUser().then((user: any) => {
            if (user && !user.expired) {
              setUsername(user.profile.name);
            }
        });
    }

    const toggleMenu = () => {
        document.getElementById('isToggle')?.classList.toggle('open');
        let isOpen = document.getElementById('navigation') as HTMLElement;
        if (isOpen.style.display === "block") {
            isOpen.style.display = "none";
        } else {
            isOpen.style.display = "block";
        }
    }

    const signout = () => {
        AuthService.signOut();
    }

    useEffect(() => {
      getLayoutSetting();
      getMenu();
      getUser();
    }, [])

    return (
        <nav id="topnav" className="defaultscroll nav-sticky is-sticky">
            <div className="container">
                <Link to="/" className="logo w-1/5">
                    {layoutSettings?.siteLogo && <img src={layoutSettings?.siteLogo.url} className="inline-block dark:hidden" alt="" />}
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
                    <li className="inline mb-0">
                        <Link to="/cart" className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white">
                            <ShoppingCart className="h-4 w-4"/>
                        </Link>
                    </li>
                    {username && <li className="inline ltr:pl-1 rtl:pr-1 mb-0 cursor-pointer dropdown">
                        <button className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white">
                            <User className="h-4 w-4"/>
                        </button>
                        <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                <div className="px-4 py-3">         
                                    <p className="text-sm leading-5">Signed in as</p>
                                    <p className="text-sm font-medium leading-5 text-gray-900 truncate font-bold">{username}</p>
                                </div>
                                <div className="py-1">
                                    <p className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" onClick={signout}>Sign out</p>
                                </div>
                            </div>
                        </div>
                    </li>}
                </ul>
                <div id="navigation">
                    <ul className="navigation-menu"> 
                        {menuItems?.map((item) => {
                            return (
                                <li key={item.text}>
                                    <Link to={item.link.replace(Config.BASE_URL, "")} className="text-black dark:text-white font-bold inline-block">{item.text}</Link>
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
