import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
export default class CategoryAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idDelete: 0,
      _categories: [],
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
    // get category

    axios({
      url: `http://127.0.0.1:8000/api/category`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          loading: true,
          _categories: res.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  setUserAdmin = (user) => {
    this.setState({
      userAdmin: user,
    });
  };

  deleteCategory = (id) => {
    axios({
      url: `http://127.0.0.1:8000/api/category/${id}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    })
      .then((res) => {
        this.setState({
          _categories: this.state._categories.filter(
            (category) => category.id != id
          ),
        });
        alert("Delete success");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(id);
  };

  render() {
    const _categories = this.state._categories;
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
                <div class="container-fluid">
                  <h1 class="h3 mb-2 text-gray-800">Categories</h1>

                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">
                        Categories
                      </h6>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-12 col-md-6">
                          <div id="dataTable_filter" class="dataTables_filter">
                            <label>
                              Search:
                              <input
                                type="search"
                                class="form-control form-control-sm"
                                placeholder=""
                                aria-controls="dataTable"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="table-responsive">
                        <table
                          class="table table-bordered"
                          id="dataTable"
                          width="100%"
                          cellspacing="0"
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Detail</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Detail</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {_categories.map((item, index) => (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>

                                <td>
                                  <Link
                                    to={`/admin/category/${item.slug}`}
                                    class="btn btn-info btn-circle btn-sm"
                                  >
                                    <i class="fas fa-info"></i>
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    to={`/admin/editcategory/${item.slug}`}
                                    class="btn btn-success btn-circle btn-sm"
                                  >
                                    <i class="fas fa-check"></i>
                                  </Link>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-circle btn-sm"
                                    data-toggle="modal"
                                    data-target="#myModal"
                                    onClick={() => {
                                      this.setState({
                                        idDelete: item.id,
                                      });
                                    }}
                                  >
                                    <i class="fas fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <p> are you deleting </p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-success btn-circle btn-sm"
                    data-dismiss="modal"
                    onClick={() => this.deleteCategory(this.state.idDelete)}
                  >
                    <i class="fas fa-check"></i>
                    YES
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-circle btn-sm"
                    data-dismiss="modal"
                  >
                    <i class="fas fa-trash"></i>
                    NO
                  </button>
                </div>
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
