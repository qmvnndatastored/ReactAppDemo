import React, { Component } from "react";
import { Link } from "react-router-dom";

//css
import "./style/css/sb-admin-2.min.css";
import "./style/vendor/fontawesome-free/css/all.min.css";
// js
import "./style/vendor/jquery/jquery.min";
import "./style/vendor/jquery/jquery.slim.min";
import "./style/vendor/bootstrap/js/bootstrap.bundle.min";
import "./style/vendor/jquery-easing/jquery.easing.min";
import "./style/js/sb-admin-2.min.js";
import "./style/js/sb-admin-2.js";
export default class Menu extends Component {
  render() {
    return (
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">
            Admin <sup>2</sup>
          </div>
        </a>

        <div>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link className="nav-link" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </Link>
          </li>
        </div>

        <div>
          <hr classname="sidebar-divider" />
          <div classname="sidebar-heading">Interface</div>
        </div>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Products</span>
          </a>
          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Products:</h6>
              <Link class="collapse-item" to="/admin/product">
                ALL
              </Link>
              <Link class="collapse-item" to="/admin/addProduct">
                ADD
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Orders</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Products:</h6>
              <Link class="collapse-item" to="/admin/order">
                ALL
              </Link>
              {/* <Link class="collapse-item" to="/admin/addProduct">
                ADD
              </Link> */}
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Categories</span>
          </a>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Categories:</h6>
              <Link class="collapse-item" to="/admin/category">
                ALL
              </Link>
              <Link class="collapse-item" to="/admin/addCategory">
                ADD
              </Link>
            </div>
          </div>
        </li>
        <div>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">Addons</div>
        </div>

        <div>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i className="fas fa-fw fa-folder" />
              <span>Pages</span>
            </a>
            <div
              id="collapsePages"
              className="collapse"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Login Screens:</h6>
                <a className="collapse-item" href="login.html">
                  Login
                </a>
                <a className="collapse-item" href="register.html">
                  Register
                </a>
                <a className="collapse-item" href="forgot-password.html">
                  Forgot Password
                </a>
                <div className="collapse-divider" />
                <h6 className="collapse-header">Other Pages:</h6>
                <a className="collapse-item" href="404.html">
                  404 Page
                </a>
                <a className="collapse-item" href="blank.html">
                  Blank Page
                </a>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="charts.html">
              <i className="fas fa-fw fa-chart-area" />
              <span>Charts</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="tables.html">
              <i className="fas fa-fw fa-table" />
              <span>Tables</span>
            </a>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" />
          </div>
        </div>
      </ul>
    );
  }
}
