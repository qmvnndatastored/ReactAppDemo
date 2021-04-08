/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      checkOut: false,
      cart: {},
      cartDetails: [],
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
    axios({
      url: `http://127.0.0.1:8000/api/cart`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          cart: res.data.data.cart,
          cartDetails: res.data.data.cartDetail,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  handleSubmit = (value, id) => {
    const data = {
      quantity: value,
    };
    axios({
      url: `http://127.0.0.1:8000/api/cart/${id}`,
      method: "PUT",
      data: data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          cart: res.data.data.cart,
          cartDetails: res.data.data.cartDetail,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleClick = (id) => {
    axios({
      url: `http://127.0.0.1:8000/api/cart/${id}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        alert("Delete complete");
        this.setState({
          cart: res.data.data.cart,
          cartDetails: res.data.data.cartDetail,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let table;
    let sub_total, total;
    const cart = this.state.cart;
    if (cart) {
      sub_total = cart.sub_total;
      total = cart.total;
    } else {
      sub_total = 0;
      total = 0;
    }
    const cartDetails = this.state.cartDetails;
    if (cartDetails) {
      table = cartDetails.map((item, index) => (
        <tr key={index}>
          <td className="product-thumbnail">
            <img
              src={item.img}
              style={{ width: "120px" }}
              alt="Image"
              className="img-fluid"
            />
          </td>
          <td className="product-name">
            <h2 className="h5 text-black">{item.name}</h2>
          </td>
          <td>{parseFloat(item.price, 2)}</td>
          <td> {item.quantity} </td>
          <td>
            <div className="text-center" style={{ width: "120px" }}>
              <input
                type="text"
                className="form-control text-center"
                placeholder=""
                aria-label="Example text with button addon"
                onChange={(e) => {
                  const valueNew = e.target.value;
                  const callBack = (value, id) => {
                    this.handleSubmit(value, id);
                  };
                  callBack(valueNew, item.id);
                }}
              />
            </div>
          </td>

          <td>${parseFloat(item.price, 2) * parseInt(item.quantity)}</td>

          <td>
            <button
              className="btn btn-primary height-auto btn-sm"
              onClick={() => {
                const callBack = (id) => {
                  this.handleClick(id);
                };
                callBack(item.id);
              }}
            >
              X
            </button>
          </td>
        </tr>
      ));
    }
    return (
      <React.Fragment>
        <Nav user={this.state.user} setUser={this.setUser} />
        <div className="site-section">
          <div className="container">
            <form>
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="site-blocks-table">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">Image</th>
                          <th className="product-name">Product</th>
                          <th className="product-price">Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-quantity">Quantity update</th>
                          <th className="product-total">Total</th>
                          <th className="product-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>{table}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-6">
                    <Link
                      to="/"
                      className="btn btn-outline-primary btn-md btn-block"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase">
                          Cart Totals
                        </h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span className="text-black"> Subtotal</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">${sub_total}</strong>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span className="text-black">Total</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">${total}</strong>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <Link
                          to="/checkout"
                          className="btn btn-primary btn-lg btn-block"
                        >
                          Proceed To Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}
