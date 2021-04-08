import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";

import Nav from "./nav.component";
import Footer from "./footer.component";
//css
import "./style/fonts/icomoon/style.css";
import "./style/css/bootstrap.min.css";
import "./style/css/magnific-popup.css";
import "./style/css/jquery-ui.css";
import "./style/css/owl.carousel.min.css";
import "./style/css/owl.theme.default.min.css";
import "./style/css/aos.css";
import "./style/css/style.css";
//js
import "./style/js/jquery-3.3.1.min";
import "./style/js/jquery-ui";
import "./style/js/popper.min";
import "./style/js/slick.min";
import "./style/js/owl.carousel.min";
import "./style/js/jquery.magnific-popup.min";
import "./style/js/aos";
import "./style/js/main";

export default class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: [],
      order: [],
      offset: 0,
      limit: 3,
      activePage: 1,
      itemsCountPerPage: 0,
      totalItemsCount: 0,
      pageRangeDisplayed: 5,
    };
  }
  componentDidMount = () => {
    // set user
    if (localStorage.getItem("id")) {
      axios.get("users/" + localStorage.getItem("id")).then(
        (res) => {
          this.setUser(res.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    // get cart
    let limit = parseInt(this.state.limit);
    let offset = 0;
    axios({
      url: `http://127.0.0.1:8000/api/orderUser?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          order: res.data.data.items,
          totalItemsCount: res.data.data.pagination.total,
          itemsCountPerPage: parseInt(limit),
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    let limit = parseInt(this.state.limit);
    let offset =
      parseInt(this.state.limit) * pageNumber - parseInt(this.state.limit);
    axios({
      url: `http://127.0.0.1:8000/api/orderUser?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          order: res.data.data.items,
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
  showOrder = () => {
    let limit = this.state.limit;
    let offset = this.state.offset;
    axios({
      url: `http://127.0.0.1:8000/api/orderUser?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          order: res.data.data.items,
          totalItemsCount: res.data.data.pagination.total,
          itemsCountPerPage: parseInt(limit),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const order = this.state.order;
    const error = this.state.error;
    return (
      <React.Fragment>
        <Nav user={this.state.user} setUser={this.setUser} />
        <div className="site-section">
          <div className="container">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="input-group w-75">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.limit}
                    onChange={(e) => this.setState({ limit: e.target.value })}
                    id="c_code"
                    placeholder="Per Page"
                    aria-label="Coupon Code"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary btn-sm px-4"
                      type="button"
                      id="button-addon2"
                      onClick={this.showOrder}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-5">
                {error.map((item, index) => console.log(item))}
              </div>
            </div>

            <form>
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="site-blocks-table">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="product-name">id</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-total">Subtotal</th>
                          <th className="product-total">Total</th>
                          <th className="product-name">Status</th>
                          <th className="product-remove">Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.map((item, index) => (
                          <tr key={index}>
                            <td className="product-name">
                              <h2 className="h5 text-black">{item.id}</h2>
                            </td>
                            <td>{item.quantity}</td>
                            <td> ${item.sub_total} </td>
                            <td> ${item.total}</td>
                            <td>
                              {item.status === 0
                                ? "Đơn hàng chưa xác nhận"
                                : ""}
                              {item.status === 1 ? "Đơn hàng đã xác nhận" : ""}
                              {item.status === 2 ? "Đang giao hàng" : ""}

                              {item.status === 3 ? " Đã giao hàng" : ""}
                            </td>
                            <td>
                              <Link
                                to={`orderDetail/${item.id}`}
                                className="btn btn-primary height-auto btn-sm"
                              >
                                Detail
                              </Link>
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
            </form>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
