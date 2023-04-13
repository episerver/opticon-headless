import React, { useEffect } from "react";
import * as Unicons from '@iconscout/react-unicons';

const Mode = () => {
    const changeMode = () => {
        const htmlTag = document.getElementsByTagName("html")[0];
        if (htmlTag.className.includes("dark")) {
            htmlTag.className = 'light';
        } else {
            htmlTag.className = 'dark';
        }
    }

    useEffect(() => {
        const switcher = document.getElementById("theme-mode");
        switcher?.addEventListener("click" , changeMode);
        const chk = document.getElementById('chk');
        chk?.addEventListener('change', changeMode);
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

export default Mode;