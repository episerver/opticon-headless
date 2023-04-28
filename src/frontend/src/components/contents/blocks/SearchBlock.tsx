import React from "react";

const SearchBlock: React.FC = () => {
    return (
        <section className="relative">
            <div className="container">
                <div className="grid grid-cols-1 justify-center">
                    <div className="relative -mt-28">
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800">
                            <div className="section-title">
                                <h4 className="text-2xl font-semibold mb-3">Search your trip</h4>
                                <p className="text-slate-400 mx-auto para-desc">
                                    We make it a priority to offer flexible services to accomodate your needs
                                </p>
                            </div>

                            <form className="mt-4" action="#">
                                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                    <div className="col-span-2">
                                        <input
                                            name="date"
                                            type="text"
                                            className="form-input start"
                                            placeholder="Type something to search"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            name="send"
                                            className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full"
                                        >
                                            Search Now
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchBlock;
