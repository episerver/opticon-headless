import React, { useContext, useEffect } from "react"
import { FC } from "react"

interface ModalProps {
   show: boolean;
   content: string;
   onOK: () => void;
   onCancel: () => void;
}

const Modal: FC<ModalProps> = (props) => {
    return(
        <>
            {props.show && <div className="fixed inset-0 flex justify-center items-center z-[999] h-screen overflow-x-hidden overflow-y-auto md:inset-0">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-xl dark:bg-gray-700">
                        <button 
                            type="button" 
                            className="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer"
                            onClick={props.onCancel}
                        >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mb-5 text-lg font-normal dark:text-gray-400">{props.content}</h3>
                            <button 
                                type="button" 
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm w-24 py-2.5 mr-2"
                                onClick={props.onOK}
                            >
                                OK
                            </button>
                            <button 
                                type="button" 
                                className="bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium w-24 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={props.onCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Modal;