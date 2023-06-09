import { useEffect, useRef } from "react";

const useMenu = (menuId: string) => {
    const menuAreaRef = useRef<any>(null);
    
    const handleClickOutSide = (event: any) => {
        const { target } = event;
        if (menuAreaRef.current && !menuAreaRef.current.contains(target)) {
            const el = document.getElementById(menuId);
            if(el && !el.className.includes("hidden")){
                el.classList.add("hidden");
            }
        }
    }

    const toggleMenu = () => {
        const el = document.getElementById(menuId);
        if(el){
            if(el.className.includes("hidden")){
                el.classList.remove("hidden");
            }else{
                el.classList.add("hidden");
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide)
        return () => document.removeEventListener('click', handleClickOutSide)
    }, [])

    return {
        menuId,
        menuAreaRef,
        handleClickOutSide,
        toggleMenu,
    };
};

export default useMenu;
