/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Káffie
          </Link>
          {/* User */}
          <div className="md:hidden items-center flex flex-wrap list-none inline-block relative">
          </div>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Káffie
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/dashboard"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/menu") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/menu"
                >
                  <i
                    className={
                      "fas fa-mug-saucer mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/menu") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Menu
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/transaksi") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/transaksi"
                >
                  <i
                    className={
                      "fas fa-money-bill-wave mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/transaksi") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Transaksi
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/detail") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/detail"
                >
                  <i
                    className={
                      "fas fa-receipt mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/detail") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Detail Transaksi
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/meja") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/meja"
                >
                  <i
                    className={
                      "fas fa-chair mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/meja") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Meja
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/user") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/user"
                >
                  <i
                    className={
                      "fas fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/user") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  User
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            <div className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <div className="items-center">
                <Logout/>
              </div>
              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
