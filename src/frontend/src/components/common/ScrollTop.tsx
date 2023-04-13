import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "react-feather";

const ScrollTop = () => {
    const scroll = () => {
        var mybutton = document.getElementById("back-to-top");
        if(mybutton!=null){
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.classList.add("block");
                mybutton.classList.remove("hidden");
            } else {
                mybutton.classList.add("hidden");
                mybutton.classList.remove("block");
            }
        }
    }

    const goTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        window.onscroll = function () {
            scroll();
        };
    }, [])

    return (
        <Link to={""}
            id="back-to-top" 
            className="btn btn-icon fixed hidden rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white z-10 bottom-5 right-5"
            onClick={goTop} 
        >
            <ArrowUp className="h-4 w-4"/>
        </Link>
   )
}

export default ScrollTop;