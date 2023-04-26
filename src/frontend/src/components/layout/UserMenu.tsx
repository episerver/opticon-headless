import React, { FC, useEffect, useRef, useState } from "react";
import { User } from "react-feather";
import { Link } from "react-router-dom";
import * as Unicons from '@iconscout/react-unicons';
import AuthService from "../../AuthService";

const UserMenu = () => {
    const ref = useRef<any>(null);
    const [username, setUsername] = useState<string>("");
    
    const handleClickOutSide = (event: any) => {
        const { target } = event;
        if (ref.current && !ref.current.contains(target)) {
            const el = document.getElementById("user-menu");
            if(el && !el.className.includes("hidden")){
                el.classList.add("hidden");
            }
        }
    }

    const toggleMenu = () => {
        const el = document.getElementById("user-menu");
        if(el){
            if(el.className.includes("hidden")){
                el.classList.remove("hidden");
            }else{
                el.classList.add("hidden");
            }
        }
    }

    const getUser = () => {
        AuthService.getUser().then((user: any) => {
            if (user && !user.expired) {
              setUsername(user.profile.name);
            }
        });
    }

    const signout = () => {
        AuthService.signOut();
    }

    useEffect(() => {
        getUser();
        document.addEventListener('click', handleClickOutSide)
        return () => document.removeEventListener('click', handleClickOutSide)
    }, [])

    return (
        <div ref={ref}>
            {username && <>
                <button 
                    className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white"
                    onClick={toggleMenu}
                >
                    <User className="h-4 w-4"/>
                </button>
                <div id="user-menu" className="opacity-0 hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                    <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                        <div className="px-4 py-3" onClick={toggleMenu}>         
                            <p className="text-sm leading-5 text-gray-700">Signed in as</p>
                            <p className="text-sm font-medium leading-5 text-gray-950 truncate font-bold">{username}</p>
                        </div>
                        <div className="py-1" onClick={toggleMenu}>
                            <Link to="/setting" className="flex items-center pl-2">
                                <Unicons.UilSetting className="h-5 w-5 text-gray-800"/>
                                <p className="text-gray-700 flex justify-between w-full px-2 py-2 text-sm leading-5 text-left" role="menuitem">Setting</p>
                            </Link>
                        </div>
                        <div className="py-1" onClick={toggleMenu}>
                            <div className="flex items-center pl-2" onClick={signout}>
                                <Unicons.UilPower className="h-5 w-5 text-gray-800"/>
                                <p className="text-gray-700 flex justify-between w-full px-2 py-2 text-sm leading-5 text-left" role="menuitem">Sign out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </div>
   )
}

export default UserMenu;