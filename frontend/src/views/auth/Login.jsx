import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
           username : '' ,
           password : '',
           redirectToReferrer : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
            
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const user = {
            username : this.state.username,
            password : this.state.password
        };
            
        if(this.state.username && this.state.password){
            axios.post(`http://localhost:3500/user/login`, user)
            .then((response) =>
                { 
                    let userresponse = response;
                    console.log(userresponse.data);
                    if(userresponse){
                        sessionStorage.setItem('data',JSON.stringify(userresponse));
                        this.setState({redirectToReferrer: true});
                    }
                },this)
            .catch((error) => alert(error))
        }
    }

    render(){ 
        if (this.state.redirectToReferrer){
            return (<Redirect to={'/admin/'}/>)
        }
        if (sessionStorage.getItem('data')){
            return (<Redirect to={'/admin/'}/>)
        }
        return (
            <div className="container mx-auto px-4 py-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                <h2 className="text-blueGray-500 text-xl font-bold">
                                    WELCOME BACK!
                                </h2>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form ref="formdemo" onSubmit={this.handleSubmit}>
                                    <div className="relative w-full mb-3">
                                        <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                        >
                                        Username
                                        </label>
                                        <input
                                        type="username"
                                        name="username"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Username"
                                        onChange={this.handleChange}
                                        required
                                        />
                                    </div>
                                    <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                        required
                                    />
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                            Remember me
                                        </span>
                                        </label>
                                    </div>
                                    <button
                                    className="text-center mt-6 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                    >
                                        Sign In
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <a
                                href="#pablo"
                                className="text-blueGray-200"
                                >
                                    <small>Forgot password?</small>
                                </a>
                            </div>
                            <div className="w-1/2 text-right">
                                <a
                                href="/auth/register"
                                className="text-blueGray-200"
                                >
                                    <small>Create new account</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
