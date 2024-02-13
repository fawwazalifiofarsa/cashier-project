import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import "../../App.css";

export default class DetailTransaksi extends Component {
  constructor(props){
      super(props);
      this.state = {
        detail_transaksi: [],
        id_detail_transaksi: '',
        id_transaksi: '',
        id_menu: '',
        harga: '',
        openModal: false,
        isLoaded: false,
        redirectToReferrer:false,
        token:''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  bind = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  Add = () => {
    this.setState({
        id_detail_transaksi: '',
        id_transaksi: '',
        id_menu: '',
        harga: '',
        openModal : true,
        action: "insert"
    });
  }
 
  Edit = (id_detail_transaksi, id_transaksi, id_menu, harga)  => {
    this.setState({
        id_detail_transaksi: id_detail_transaksi,
        id_transaksi: id_transaksi,
        id_menu: id_menu,
        harga: harga,
        openModal : true,
        action: "update"
    });
  }

  Get = () => {
    let url = "http://localhost:3500/detail_transaksi/";
    let detail_transaksi = JSON.parse(sessionStorage.getItem('data'));
    const token = detail_transaksi.data.token;
    const config = {
      headers: {'Authorization': 'Bearer '+ token}
    }
    axios.get(url, config)
    .then(response => {
      this.setState({detail_transaksi: response.data});  
      console.log(this.state.detail_transaksi);
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  handleChange(event){
    this.setState({
        [event.target.name] : event.target.value
        
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let url = "http://localhost:3500/detail_transaksi/";
    let detail_transaksi = JSON.parse(sessionStorage.getItem('data'));
    const token = detail_transaksi.data.token;
    const config = {
      headers: {'Authorization': 'Bearer '+ token}
    }
    let form = {
        id_detail_transaksi: this.state.id_detail_transaksi,
        id_transaksi: this.state.id_transaksi,
        id_menu: this.state.id_menu,
        harga: this.state.harga
    }

    if (this.state.action === "insert") {
      axios.post(url, form, config)
      .then(() => {
        this.Get()
        this.setState({
          openModal: false
        })
      })
      .catch(error => {
        console.log(error);
      });
    } else if (this.state.action === "update")  {
      axios.put(url + this.state.id_detail_transaksi, form, config)
      .then(() => {
        this.Get()
        this.setState({
          openModal: false
        })
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
 
  Drop = (id_detail_transaksi) => {
    let url = "http://localhost:3500/detail_transaksi/" + id_detail_transaksi;
    let detail_transaksi = JSON.parse(sessionStorage.getItem('data'));
    const token = detail_transaksi.data.token;
    const config = {
      headers: {'Authorization': 'Bearer '+ token}
    }
    if (window.confirm('Confirm delete this data')) {
      axios.delete(url, config)
      .then(response => {
        this.Get();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  componentDidMount(){ 
      if(sessionStorage.getItem('data')){
          let detail_transaksi = JSON.parse(sessionStorage.getItem('data'));
          console.log(detail_transaksi);
          const token = detail_transaksi.data.token;
          console.log(token);
          const instance = axios.create({
            baseURL: 'http://localhost:3500/',
            headers: {'Authorization': 'Bearer '+token}
          });
          instance.get('/detail_transaksi')
          .then(response => {
              console.log(response.data);
              this.setState({
                  detail_transaksi: response.data,
                  isLoaded : true,
                  redirectToReferrer: false
              })
          })
      }
      else{
          this.setState({
              redirectToReferrer: true
          })
      }
  }
  
  render(){

    if (this.state.redirectToReferrer) {
        return (<Redirect to={'/auth/login'}/>)
    }

    var { isLoaded } = this.state;
    if(!isLoaded){
        return <div> Loading....</div>;
    }
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3
                      className={
                        "font-semibold text-lg text-blueGray-700"
                      }
                    >
                      Transaksi List
                    </h3>
                  </div>
                  <button class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" onClick={this.Add}>Add Transaki</button>
                </div>
                <Modal 
                open={this.state.openModal} 
                onClose={this.onCloseModal} 
                id_transaksi={this.state.id_transaksi}
                tgl_transaksi={this.state.tgl_transaksi}
                id_user={this.state.id_user}
                id_meja={this.state.id_meja}
                nama_pelanggan={this.state.nama_pelanggan}
                status={this.state.status}
                >
                  <form ref="formdemo" onSubmit={this.handleSubmit}>
                      <label
                      className="block uppercase text-blueGray-600 text-lg font-bold mb-2 mt-1"
                      htmlFor="grid-password"
                      >
                      Add Detail Transaksi
                      </label>
                    <div className="relative w-full mb-3 mt-6">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      ID Transaksi
                      </label>
                      <input
                      type="number"
                      name="id_transaksi"
                      defaultValue={this.state.id_transaksi}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Tanggal Transaksi"
                      onChange={this.bind}
                      required
                      />
                    </div>
                    <div className="relative w-full mb-3 mt-6">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      ID Menu
                      </label>
                      <input
                      type="number"
                      name="id_menu"
                      defaultValue={this.state.id_menu}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="ID User"
                      onChange={this.bind}
                      required
                      />
                    </div>
                    <div className="relative w-full mb-3 mt-6">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      Harga
                      </label>
                      <input
                      type="number"
                      name="harga"
                      defaultValue={this.state.harga}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="ID Meja"
                      onChange={this.bind}
                      required
                      />
                    </div>
                    <button
                    className="text-center mt-6 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                    >
                        Input
                    </button>
                  </form>
                </Modal>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        ID Detail Transaksi
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        ID transaksi
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        ID Menu
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Harga
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.detail_transaksi.map((item, i) => {
                      return(
                        <tr>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                            {item.id_detail_transaksi}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.id_transaksi}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.id_menu}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.harga}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <button
                            className="text-center text-white font-bold py-3 w-16 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                            onClick={() => this.Edit(item.id_detail_transaksi, item.id_transaksi, item.id_menu, item.harga)}
                            >Edit</button>
                            <button
                            className="text-center text-white font-bold py-3 w-16 rounded outline-none focus:outline-none mr-1 mb-1 bg-red-500 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                            onClick={() => this.Drop(item.id_detail_transaksi)}
                            >Delete</button>
                          </td>
                      </tr>
                    );
                  })}  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
