import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component<any, any> {
    state = {
      hasError: false
    };
  
    static getDerivedStateFromError = () => {
      return { hasError: true };
    };

    componentDidUpdate(prevProps: any) {
      if(!this.props.hasError && prevProps.hasError) {
        this.setState({ hasError: false });
      }
    }
  
    componentDidCatch() {
      this.props.setHasError(true);
    }
  
    render() {
      return this.state.hasError ? 
        <section className="relative bg-indigo-600/5">
            <div className="container-fluid relative">
                <div className="grid grid-cols-1">
                    <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                        <div className="title-heading text-center my-auto">
                            <img src={require("./../../assets/images/error.png")} className="w-1/5 mx-auto" alt="" />
                            <h1 className="mt-3 mb-6 md:text-5xl text-3xl font-bold">Oops..!</h1>
                            <p className="text-slate-400">Something Went Wrong. Please try again later.</p>           
                            <div className="mt-4">
                                <Link to="/" className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md">Back to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> : this.props.children;
    }
  }

  export default ErrorBoundary;