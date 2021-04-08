/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import axios from "axios";

import Menu from "./menu.component";
import Header from "./header.admin.component";

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
export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  state = {};
  componentDidMount = () => {
    // set user
    if (localStorage.getItem("id_admin")) {
      axios({
        url:
          "http://127.0.0.1:8000/api/users/" + localStorage.getItem("id_admin"),
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_admin"),
        },
      })
        .then((res) => {
          this.setUserAdmin(res.data.data);
          this.setState({
            userAdmin: res.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  setUserAdmin = (user) => {
    this.setState({
      userAdmin: user,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: this.name,
    };
    axios({
      url: `http://127.0.0.1:8000/api/category`,
      method: "POST",
      data: data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
        Accept: "application/json",
        type: "formData",
      },
    }).then((res) => {
      console.log(res);
      alert("Create Category success");
    });
  };

  render() {
    if (this.state.userAdmin) {
      return (
        <React.Fragment>
          <div id="wrapper">
            <Menu />
            <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                <Header
                  userAdmin={this.state.userAdmin}
                  setUserAdmin={this.setUserAdmin}
                />
                <form
                  onSubmit={this.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">Add Products</h1>
                    <div className="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="dataTables_length">
                          <label>
                            Name Category
                            <input
                              name="dataTable_length"
                              aria-controls="dataTable"
                              class="form-control form-control-sm"
                              onChange={(e) => (this.name = e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6"></div>
                    </div>

                    <div className="row">
                      <button className="btn btn-primary"> ADD PRODUCT</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div id="wrapper">
          <Menu />
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Header
                userAdmin={this.state.userAdmin}
                setUserAdmin={this.setUserAdmin}
              />
              <div class="container-fluid">
                <h1 class="h3 mb-2 text-gray-800">You are not Login</h1>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
