import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
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
export default class OrderAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idDelete: 0,
      offset: 0,
      limit: 18,
      _orders: [],
      activePage: 1,
      itemsCountPerPage: 0,
      totalItemsCount: 0,
      pageRangeDisplayed: 5,
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
    let limit = 18;
    let offset = 0;
    axios({
      url: `http://127.0.0.1:8000/api/order?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          loading: true,
          _orders: res.data.data.items,
          totalItemsCount: res.data.data.pagination.total,
          itemsCountPerPage: parseInt(limit),
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
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    let limit = parseInt(this.state.limit);
    let offset =
      parseInt(this.state.limit) * pageNumber - parseInt(this.state.limit);
    axios({
      url: `http://127.0.0.1:8000/api/order?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    })
      .then((res) => {
        this.setState({
          loading: true,
          _orders: res.data.data.items,
          offset: 0,
          totalItemsCount: res.data.data.pagination.total,
          itemsCountPerPage: parseInt(limit),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ activePage: pageNumber });
  }
  showProduct = () => {
    let limit = this.state.limit;
    let offset = this.state.offset;
    axios({
      url: `http://127.0.0.1:8000/api/order?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    })
      .then((res) => {
        this.setState({
          loading: true,
          _orders: res.data.data.items,
          totalItemsCount: res.data.data.pagination.total,
          itemsCountPerPage: parseInt(limit),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  deleteProduct = (id) => {
    axios({
      url: `http://127.0.0.1:8000/api/order/${id}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    }).then((res) => {
      this.setState({
        _orders: this.state._orders.filter((product) => product.id != id),
      });
      alert("Delete success");
    });
    console.log(id);
  };

  render() {
    const _orders = this.state._orders;
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
                  <h1 class="h3 mb-2 text-gray-800">Products</h1>

                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">Orders</h6>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-12 col-md-6">
                          <div class="dataTables_length">
                            <label>
                              Show
                              <input
                                name="dataTable_length"
                                aria-controls="dataTable"
                                class="custom-select custom-select-sm form-control form-control-sm"
                                value={this.state.limit}
                                onChange={(e) => {
                                  this.setState({ limit: e.target.value });
                                }}
                              />
                              <button
                                className="btn btn-primary btn-sm px-4"
                                type="button"
                                id="button-addon2"
                                onClick={this.showProduct}
                              >
                                Apply
                              </button>
                            </label>
                          </div>
                        </div>
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
                              <th>User_id</th>
                              <th>Quantity</th>
                              <th>Subtotal</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th>Type</th>
                              <th>Address</th>
                              <th>Detail</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>ID</th>
                              <th>User_id</th>
                              <th>Quantity</th>
                              <th>Subtotal</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th>Type</th>
                              <th>Address</th>
                              <th>Detail</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {_orders.map((item, index) => (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.user_id}</td>

                                <td>{item.quantity}</td>
                                <td>${item.sub_total}</td>
                                <td>${item.total}</td>
                                <td>
                                  {item.status === 0
                                    ? "Đơn hàng chưa xác nhận"
                                    : ""}
                                  {item.status === 1
                                    ? "Đơn hàng đã xác nhận"
                                    : ""}
                                  {item.status === 2 ? "Đang giao hàng" : ""}

                                  {item.status === 3 ? " Đã giao hàng" : ""}
                                </td>
                                <th>{item.type}</th>
                                <th>{item.address}</th>
                                <td>
                                  <Link
                                    to={`/admin/orderdetail/${item.id}`}
                                    class="btn btn-info btn-circle btn-sm"
                                  >
                                    <i class="fas fa-info-circle"></i>
                                  </Link>
                                </td>

                                <td>
                                  <Link
                                    to={{
                                      pathname: `/admin/editorder/${item.id}`,

                                      state: { status: item.status },
                                    }}
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
                        <div className="mt-3">
                          <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.totalItemsCount}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            onChange={this.handlePageChange.bind(this)}
                            prevPageText="prev"
                            nextPageText="next"
                            firstPageText="first"
                            lastPageText="last"
                            itemClass="page-item"
                            linkClass="page-link"
                          />
                        </div>
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
                    onClick={() => this.deleteProduct(this.state.idDelete)}
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
