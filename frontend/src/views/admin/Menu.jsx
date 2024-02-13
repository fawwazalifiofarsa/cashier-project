import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import "../../App.css";

export default class Menu extends Component {
  constructor(props){
      super(props);
      this.state = {
        menu: [],
        id_menu: '',
        nama_menu: '',
        jenis: '',
        deskripsi: '',
        gambar: '',
        harga : '' ,
        isLoaded: false,
        openModal: false,
        redirectToReferrer:false,
        action: '',
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
      id_menu: "",
      nama_menu: "",
      jenis: "",
      deskripsi: "",
      gambar: "",
      harga : "" ,
      openModal : true,
      action: "insert"
    });
  }
 
  Edit = (id_menu, nama_menu, jenis, deskripsi, gambar, harga) => {
    this.setState({
      id_menu: id_menu,
      nama_menu: nama_menu,
      jenis: jenis,
      deskripsi: deskripsi,
      gambar: gambar,
      harga : harga,
      openModal : true,
      action: "update"
    });
  }

  Get = () => {
    let url = "http://localhost:3500/menu/";
    let menu = JSON.parse(sessionStorage.getItem('data'));
    const token = menu.data.token;
    const config = {
      headers: {'Authorization': 'Bearer '+ token}
    }
    axios.get(url, config)
    .then(response => {
      this.setState({menu: response.data});  
      console.log(this.state.menu);
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange = (event) => {
    const file = event.target.files[0];
    const fileName = file.name.replace("C:\\fakepath\\", "");
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let url = "http://localhost:3500/menu/";
    let menu = JSON.parse(sessionStorage.getItem('data'));
    const token = menu.data.token;
    const config = {
      headers: {'Authorization': 'Bearer '+ token}
    }
    let form = {
      id_menu: this.state.id_menu,
      nama_menu: this.state.nama_menu,
      jenis: this.state.jenis,
      deskripsi: this.state.deskripsi,
      // gambar: this.state.gambar,
      harga : this.state.harga,
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
      axios.put(url + this.state.id_menu, form, config)
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
 
  Drop = (id_menu) => {
    let url = "http://localhost:3500/menu/" + id_menu;
    let menu = JSON.parse(sessionStorage.getItem('data'));
    const token = menu.data.token;
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
          let menu = JSON.parse(sessionStorage.getItem('data'));
          console.log(menu);
          const token = menu.data.token;
          console.log(token);
          const instance = axios.create({
            baseURL: 'http://localhost:3500/',
            headers: {'Authorization': 'Bearer '+token}
          });
          instance.get('/menu')
          .then(response => {
              console.log(response.data);
              this.setState({
                  menu: response.data,
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
                      Menu List
                    </h3>
                  </div>
                  <button class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" onClick={this.Add}>Add Menu</button>
                </div>
                <Modal 
                open={this.state.openModal} 
                onClose={this.onCloseModal} 
                id_menu={this.state.id_menu}
                nama_menu={this.state.nama_menu}
                deskripsi={this.state.deskripsi}
                // gambar={this.state.gambar}
                harga={this.state.harga}
                >
                  <form ref="formdemo" onSubmit={this.handleSubmit}>
                      <label
                      className="block uppercase text-blueGray-600 text-lg font-bold mb-2 mt-1"
                      htmlFor="grid-password"
                      >
                      Add Menu
                      </label>
                    <div className="relative w-full mb-3 mt-6">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      Nama Menu
                      </label>
                      <input
                      type="text"
                      name="nama_menu"
                      defaultValue={this.state.nama_menu}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nama Menu"
                      onChange={this.bind}
                      required
                      />
                    </div>
                    <div className="relative w-full mb-3 mt-6">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      Jenis
                      </label>
                      <select
                      type="text"
                      name="jenis"
                      defaultValue={this.state.jenis}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Jenis"
                      onChange={this.bind}
                      required
                      >
                        <option disabled selected value> -- select an option -- </option>
                        <option value="makanan">Makanan</option>
                        <option value="minuman">Minuman</option>
                      </select>
                    </div>
                    <div className="relative w-full mb-3 mt-6">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      Deskripsi
                      </label>
                      <input
                      type="text"
                      name="deskripsi"
                      defaultValue={this.state.deskripsi}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Deskripsi"
                      onChange={this.bind}
                      required
                      />
                    </div>
                    {/* <div className="relative w-full mb-3 mt-6">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      Gambar
                      </label>
                      <input
                      type="file"
                      name="gambar"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Gambar"
                      onChange={this.handleChange}
                      required
                      />
                    </div> */}
                    <div className="relative w-full mb-3 mt-6">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      Harga
                      </label>
                      <input
                      type="text"
                      name="harga"
                      defaultValue={this.state.harga}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Harga"
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
                        ID Menu
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Nama Menu
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Jenis
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Deskripsi
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Gambar
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Harga
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.menu.map((item, i) => {
                      return(
                        <tr>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                            {item.id_menu}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.nama_menu}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.jenis}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.deskripsi}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <img src={require("../../assets/img/data/" + item.gambar)} height={100} width={100}/>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.harga}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <button
                            className="text-center text-white font-bold py-3 w-16 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                            onClick={() => this.Edit(item.id_menu, item.nama_menu, item.jenis, item.deskripsi, item.gambar, item.harga)}
                            >Edit</button>
                            <button
                            className="text-center text-white font-bold py-3 w-16 rounded outline-none focus:outline-none mr-1 mb-1 bg-red-500 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                            onClick={() => this.Drop(item.id_menu)}
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
