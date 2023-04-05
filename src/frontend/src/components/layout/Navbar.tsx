import { ContentData } from "@episerver/content-delivery";
import React, { useEffect, useState } from "react";
import { getContentLoader } from "../../DefaultContext";
import { ShoppingCart } from 'react-feather';
import NavigationMenuItem from "@models/NavigationMenuItem";
import LayoutSetting from "@models/LayoutSetting";
import { Link } from 'react-router-dom';
import Config from "../../config.json";

const Navbar = () => {
    const [menuItems, setMenuItems] = React.useState<NavigationMenuItem[] | null>(null);
    const [layoutSettings, setLayoutSettings] = useState<LayoutSetting | undefined>(undefined);
  
    const getLayoutSetting = async () => {
      const contentLoader = getContentLoader();
      const content = await contentLoader.getContent("3729d832-357e-409a-87e2-5242400fb47f", { branch: "en" }) as LayoutSetting;
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

    const toggleMenu = () => {
        document.getElementById('isToggle')?.classList.toggle('open');
        let isOpen = document.getElementById('navigation') as HTMLElement;
        if (isOpen.style.display === "block") {
            isOpen.style.display = "none";
        } else {
            isOpen.style.display = "block";
        }
    };

    useEffect(() => {
      getLayoutSetting();
      getMenu();
    }, [])

    return (
        <>
        <nav id="topnav" className="defaultscroll is-sticky fixed">
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
                    <li className="inline ltr:pl-1 rtl:pr-1 mb-0">
                        <Link to="/cart" className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white">
                            <ShoppingCart className="h-4 w-4"/>
                        </Link>
                    </li>
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
        </>
    );
};

export default Navbar;
