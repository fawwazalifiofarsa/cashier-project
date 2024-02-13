import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

// components

import CardLineChart from "../../components/Cards/CardLineChart.js";
import CardBarChart from "../../components/Cards/CardBarChart.js";
import CardPageVisits from "../../components/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";

export default class Dashboard extends Component {
  constructor(props){
      super(props);
      this.state = {
        meja: [],
        id_meja: '',
        nomor_meja: '',
        isLoaded: false,
        redirectToReferrer:false,
        openModal: false,
        action: '',
        token:''
      };
  }

  componentDidMount(){ 
    if(sessionStorage.getItem('data')){
      this.setState({
          redirectToReferrer: false
      })
    }else{
      this.setState({
          redirectToReferrer: true
      })
    }
  }

  render(){

    if (this.state.redirectToReferrer) {
        return (<Redirect to={'/auth/login'}/>)
    }
    
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardLineChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart />
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div>
        </div>
      </>
    );
  }
}
