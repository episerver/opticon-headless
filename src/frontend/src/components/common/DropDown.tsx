import TextValue from "@models/common/TextValue";
import React, { FC, useEffect, useRef } from "react";

interface DropDownProps{
    id: string;
    listItems: TextValue[];
    value?: string;
    onChange: (item: TextValue) => void;
}

const DropDown: FC<DropDownProps> = (props) => {
    const ref = useRef<any>(null);

    const toggleDropDown = () => {
        const el = document.getElementById(`dropdown-${props.id}`);
        if(el){
            if(el.className.includes("hidden")){
                el.classList.remove("hidden");
            }else{
                el.classList.add("hidden");
            }
        }
    }

    const getSelectedItem = () => {
        return props.listItems.find(item => item.value === props.value)?.text ?? "";
    }

    const selectItem = (item: TextValue) => {
        toggleDropDown();
        props.onChange(item);
    }

    const handleClickOutSide = (event: any) => {
        const { target } = event;
        if (ref.current && !ref.current.contains(target)) {
            const el = document.getElementById(`dropdown-${props.id}`);
            if(el && !el.className.includes("hidden")){
                el.classList.add("hidden");
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide)
        return () => document.removeEventListener('click', handleClickOutSide)
    }, [])

    return (
        <div ref={ref} className="relative inline-block text-left w-full">
            <div>
                <button 
                    type="button" 
                    className="inline w-full gap-x-1.5 rounded-md px-2 py-2.5 text-sm font-semibold border border-inherit dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200" 
                    onClick={toggleDropDown}
                >
                    <span className="float-left text-[16px] font-normal">{getSelectedItem()}</span>
                    <svg className="float-right -mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div id={`dropdown-${props.id}`} className="absolute hidden w-full right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-inherit dark:border-gray-800 bg-white dark:bg-slate-900 text-white dark:text-slate-200 z-10" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                <div className="py-1" role="none">
                {
                    props.listItems.map(item => <p key={item.value} 
                                className="block px-4 py-2 text-[16px] font-normal cursor-pointer text-black dark:text-white hover:text-white hover:bg-indigo-600"  
                                onClick={() => selectItem(item)}
                            >
                            {item.text}
                        </p>)
                }
                </div>
            </div>
        </div>
   )
}

export default DropDown;