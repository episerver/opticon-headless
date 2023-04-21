import React, { useEffect, useState } from "react";
import * as Unicons from '@iconscout/react-unicons';
import { ModeType } from "@models/common/Enum";

const DisplayMode = () => {
    const loadMode = () => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.className = localStorage.getItem("display_mode") ?? ModeType.Light;
    }

    const toggleMode = () => {
        const htmlTag = document.getElementsByTagName("html")[0];
        if (htmlTag.className.includes("dark")) {
            htmlTag.className = 'light';
            localStorage.setItem("display_mode", ModeType.Light);
        } else {
            htmlTag.className = 'dark';
            localStorage.setItem("display_mode", ModeType.Dark);
        }
    }

    const addEvent = () => {
        const switcher = document.getElementById("theme-mode");
        switcher?.addEventListener("click" , toggleMode);
        const chk = document.getElementById('chk');
        chk?.addEventListener('change', toggleMode);
    }

    useEffect(() => {
        addEvent();
        loadMode();
    }, [])

    return (
        <div className="fixed top-[30%] -right-2 z-50">
          <span className="relative inline-block rotate-90">
              <input type="checkbox" className="checkbox opacity-0 absolute" id="chk" />
              <label className="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8" htmlFor="chk">
                  <Unicons.UilMoon className="text-[20px] text-yellow-500" />
                  <Unicons.UilSun className="text-[20px] text-yellow-500" />
                  <span className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"></span>
              </label>
          </span>
      </div>
   )
}

export default DisplayMode;