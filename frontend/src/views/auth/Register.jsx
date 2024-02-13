import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            nama_user: '',
            username : '' ,
            password : '',
            role : '',
            isLoaded: false,
            redirectToReferrer:false,
            token:''
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
        const { history } = this.props;
        let user = {
            nama_user: this.state.nama_user,
            username : this.state.username,
            password : this.state.password,
            role: this.state.role
        };
        console.log(user);
        axios.post(`http://localhost:3500/user`, user)
        .then(history.push('/auth'))
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
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                <h2 className="text-blueGray-500 text-xl font-bold">
                                    WELCOME!
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
                                        Name
                                        </label>
                                        <input
                                        type="name"
                                        name="nama_user"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Name"
                                        onChange={this.handleChange}
                                        required
                                        />
                                    </div>
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
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Password
                                        </label>
                                        <select 
                                        name="role"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Role"
                                        onChange={this.handleChange}
                                        required
                                        >
                                            <option disabled selected value> -- select an option -- </option>
                                            <option value="admin">Admin</option>
                                            <option value="kasir">Kasir</option>
                                        <option value="manajer">Manajer</option>
                                        </select>
                                    </div>
                                    <button
                                    className="text-center mt-6 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                    >
                                        Sign Up
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <a
                                href="/auth/login"
                                className="text-blueGray-200"
                                >
                                    <small>Already have an account?</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
