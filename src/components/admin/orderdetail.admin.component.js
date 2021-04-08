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
export default class OrderDetailAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      _orders: [],
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
    // get order
    const id = this.props.match.params.id;

    this.setState({
      id: id,
    });
    axios({
      url: `http://127.0.0.1:8000/api/order/${id}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          loading: true,
          _orders: res.data.data.order,
          status: res.data.data.orderStatus.status,
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
  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      status: this.state.status,
    };
    axios({
      url: `http://127.0.0.1:8000/api/order/${this.state.id}`,
      method: "PUT",
      data: data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    })
      .then((res) => {
        alert("update succes");
      })
      .catch((error) => {
        console.error();
      });
  };
  render() {
    const _orders = this.state._orders;
    const id = this.state.id;
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
                  <h1 class="h3 mb-2 text-gray-800">Orders</h1>

                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">
                        Orders no. {id}
                      </h6>
                    </div>
                    <div class="card-body">
                      <form onSubmit={this.handleSubmit}>
                        <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <div
                              id="dataTable_filter"
                              class="dataTables_filter"
                            >
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
                          <label>
                            Active
                            <select
                              class="form-control form-control-sm"
                              onChange={(e) =>
                                this.setState({ status: e.target.value })
                              }
                              value={this.state.status}
                            >
                              <option value="">Select active </option>
                              <option value="0">Not Confirm</option>
                              <option value="1">Comfirmed</option>
                              <option value="2">To deliver </option>
                              <option value="3">Delivered </option>
                            </select>
                          </label>
                          <button className="btn btn-primary">
                            Apply order status
                          </button>
                        </div>
                      </form>
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
                              <th>Image</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Subtotal</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Image</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Subtotal</th>
                              <th>Total</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {_orders.map((item, index) => (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                  {" "}
                                  <img
                                    style={{ width: "220px" }}
                                    src={item.images}
                                    alt={item.name}
                                  />
                                </td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>
                                  ${" "}
                                  {parseFloat(item.price) *
                                    parseInt(item.quantity)}
                                </td>
                                <td>
                                  $
                                  {parseFloat(item.price, 2) *
                                    parseInt(item.quantity) *
                                    1.1}
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
