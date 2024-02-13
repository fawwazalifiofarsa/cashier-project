import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";

export default class Logout extends Component{
    constructor(props){
        super(props);
        this.state={
            items:[],
            isLoaded: false,
            redirectToReferrer: false,
            token:''
        }
        this.logout = this.logout.bind(this);
    }
    
    logout(){
        sessionStorage.setItem("data",'');
        sessionStorage.clear();
        this.setState({redirectToReferrer: true});
    }
    
    render(){

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/auth/login'}/>)
          }
        return(
            <button 
            onClick={this.logout}
            className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                <i className="fas fa-right-from-bracket text-blueGray-400 mr-2 text-sm"></i>{" "}
                Logout
            </button>
        )
    }   
}